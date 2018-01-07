import StateMachine from 'javascript-state-machine';
import { isEqual, isEmpty } from 'lodash';
import { execFile } from 'child_process';
import { join as pathJoin } from 'path';
import { error as debug } from 'console';

export default class GXCCMinerInstance {
  constructor({ onStatusChange }) {
    this.stateMachine = new StateMachine({
      init: 'NEW',
      transitions: [
        { name: 'start', from: 'NEW', to: 'PENDING' },
        { name: 'ready', from: 'PENDING', to: 'ACTIVE' },
        { name: 'fail', from: 'PENDING', to: 'ERROR' },
        { name: 'fail', from: 'ACTIVE', to: 'ERROR' },
        { name: 'stall', from: 'ERROR', to: 'STALLED' },
        { name: 'reset', from: 'ACTIVE', to: 'NEW' },
        { name: 'reset', from: 'STALLED', to: 'NEW' },
      ],
      data: {
        errorCount: 0,
        childProcess: null,
        currentMiningParams: {},
        expectedMiningParams: {},
      },
      methods: {
        killAndWait(process) {
          onStatusChange('TERMINATING');
          debug(`Killing process ${process.pid}`);
          return new Promise((resolve) => {
            process.on('exit', (code) => {
              debug('Exitting with code ', code);
              resolve();
            });
            process.kill();
          });
        },
        async setMiningParams(miningParams) {
          debug(`Setting mining params to ${JSON.stringify(this.expectedMiningParams)} from ${JSON.stringify(this.currentMiningParams)}`);
          // `this` in this context refers to the state machine
          this.expectedMiningParams = miningParams;
          if (!isEqual(this.expectedMiningParams, this.currentMiningParams)) {
            debug('Mining params require adjustments.');
            if (this.can('reset')) {
              debug('Finishing previous mining cycle');
              if (this.childProcess) {
                debug('Killing previous process');
                await this.killAndWait(this.childProcess);
                this.reset();
              }
            } else {
              debug(`Cannot reset because current state is ${this.state}`);
            }

            // Only start a new cycle if we need to
            if (this.state === 'NEW' && !isEmpty(this.expectedMiningParams)) {
              debug('Starting a new mining cycle');
              // Initiate the mining process
              this.start(); // Set state to PENDING
              // Spawn the process here,
              const minerPath = pathJoin(process.cwd(), 'miners/ccminer/ccminer-x64.exe');
              debug(`Miner path is ${minerPath}`);
              const {
                url, username, password, algorithm,
              } = miningParams;
              this.childProcess = execFile(minerPath, [
                '-o', url, '-u', username, '-p', password, '-a', algorithm,
              ]);
              this.childProcess.on('data', debug);
              if (this.childProcess.pid) {
                debug(`Spawned child process with PID ${this.childProcess.pid}`);
                this.ready();
              } else {
                debug('Child process could not be spawned.');
                this.recordError();
              }
            }
          } else {
            debug('Mining parameters were unchanged. Doing nothing.');
          }
        },
        recordError() {
          debug('Recording an error');
          this.errorCount = this.errorCount + 1;
          this.fail();
          if (this.errorCount > 5) {
            this.stall();
          }
        },
        onStall() {
          onStatusChange('STALLED');
          debug('Miner is stalled');
        },
        onReady() {
          onStatusChange('READY/RUNNING');
          debug('Miner is ready/running');
          this.currentMiningParams = this.expectedMiningParams;
        },
        onFail() {
          onStatusChange('FAILED');
          debug('Miner failed to start');
          this.currentMiningParams = {};
        },
        onReset() {
          onStatusChange('RESETTING');
          debug('Resetting');
          this.errorCount = 0;
          this.currentMiningParams = {};
          this.childProcess = null;
        },
      },
    });
  }

  setMiningParams(miningParams) {
    this.stateMachine.setMiningParams(miningParams);
  }

  getStatus() {
    return this.stateMachine.state;
  }
}

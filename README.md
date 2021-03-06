# META

![Build Status](https://api.travis-ci.org/gpuexchange/meta-agent.svg?branch=develop)
[![Coverage Status](https://coveralls.io/repos/github/gpuexchange/meta-agent/badge.svg)](https://coveralls.io/github/gpuexchange/meta-agent)

**The code in `develop` branch is currently extremely unstable. Please refrain from any non-development use.**

META (META Enhanced Trading Agent) is GPU Exchange's mining control agent. It plays the following roles:

* It manages crypto currency miners and switch to the most profitable one, according to data retrieved from the GPU Exchange (GX) API.
* It keep the trading key locally and execute trading instruction from GX. Most common use case is automated selling of mined coin, or cashing out from pool.

**This software is currently in pre-alpha stage and should be considered experimental. Use at your own risk.**

## Requirements

* NodeJS 8+

## How to run

```
npm install
npm start
```

## Miner Binaries*

This software is a meta-miner, which controls actual mining software(s). The mining binaries need to be placed under the `miners` directory.

For example, the built-in `ccminer-driver` module will look for a binary at the location:

`<current directory>/miners/ccminer/ccminer-x64.exe`

on Windows x64.


## Developer's Guide

See [Design Principles](doc/Design.md).

The whole application is structured into modules, with an extensible plugin system. At the time of writing, the general structure is still unstable.

### Directory structure

```
|-doc                       # Documentation
|-lib                       # Compiled files
|-miners                    # Folder containing miner executable, for testing only
|-plugins                   # Placeholder folder for 3rd-party plugins
|-src                       # Source files
  |-common                  # Shared classes *
  |-core                    # Core modules *
  |-plugins                 # System plugins, can be disabled in the future
  |-config.js               # Plugin loader *
  |-electron-bootstrap.js   # For development only
  |-index.js                # Main entry point
|-.*                        # Project config files
```

Folders marked with `*` are a good starting point for new developers.

## Roadmap

- [x] General project structure
- [x] Module & Plugin system
- [x] Storage API
- [x] Retrieve coin data via 3rd party APIs
- [x] Basic debugging UI (CLI)
- [x] GUI with basic navigation
- [x] Coin list
- [x] Local mining strategy
- [x] Meta-miner architect
- [x] CC Miner driver
- [x] Status API (internal)
- [ ] Reporting frontend
- [ ] Unit tests
- [ ] Beta/Production Build Pipeline

## License

We are currently working on a new license for META. For now, the code is released under All Rights Reserved.

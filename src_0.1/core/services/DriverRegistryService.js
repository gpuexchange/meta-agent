import BaseRegistryService from './BaseRegistryService';

export default class DriverRegistryService extends BaseRegistryService {
  registerDependency(subModule) {
    super.registerDependency(subModule);

    const minerName = subModule.constructor.name; // ClassName of the miner
    if (typeof subModule.constructor.getSupportedAlgorithms === 'function') {
      const supportedAlgorithms = subModule.constructor.getSupportedAlgorithms();
      // Add algorithms into the supported list
      this.getStore().append(
        'session.supportedAlgorithms',
        supportedAlgorithms,
      );

      this.getStore().set(
        `session.drivers.${minerName}.supportedAlgorithms`,
        supportedAlgorithms,
      );
    } else {
      this.printDebug(`The module ${minerName
      } did not report any supported algorithms`);
    }
  }
}

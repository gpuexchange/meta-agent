export function moduleWrapper(ExtendedModuleClass) {
  return (options, imports, register) => new ExtendedModuleClass(options, imports, register);
}

export function x() {
  return true;
}

module.exports = function setup (options, imports, register) {
  let store = imports.store

  store.subscribe(console.log)

  register(null)
}
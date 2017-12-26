module.exports = function setup (options, imports, register) {
  let store = imports.store

  store.subscribe((val) => {
    console.log('Store Update: ', val)
  })

  register(null)
}
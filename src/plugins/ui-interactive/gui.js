const ipcRenderer = require('electron').ipcRenderer

console.log('This is the GUI')

ipcRenderer.send('store-ping')

ipcRenderer.on('store-content', (event, args) => {
  console.log('Store content is ', args)
})
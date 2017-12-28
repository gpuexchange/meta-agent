import electron, { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import url from 'url'
import { debug } from 'util'

import { MetaModule, moduleWrapper } from '../../common/MetaModule'

class InteractiveFrontendModule extends MetaModule {

  async setup (options, imports): Promise<Object> {
    let registry = imports['frontend-registry']
    this.store = registry.getStore()

    registry.registerDependency(this)

    return {
      'frontend-interactive': this,
    }
  }

  createWindow () {
    // Create the browser window.
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 600,
      minHeight: 400,
      frame: false,
      icon: path.join(__dirname,
        process.platform !== 'darwin'
          ? 'assets/icons/mineral/256x256.png'
          : 'assets/icons/mineral/mineral.icns',
      ),
      webPreferences: {
        //devTools: false,
      },
    })

    // and load the index.html of the app.
    this.window.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }))

    // Open the DevTools.
    //this.window.webContents.openDevTools()

    // Emitted when the this.windowdow is closed.
    this.window.on('closed', () => {
      // Dereference the this.windowdow object, usually you would store this.windowdows
      // in an array if your app supports multi this.windowdows, this is the time
      // when you should delete the corresponding element.
      debug('Remove window')
      this.window = null
    })

    let store = this.store, renderer

    ipcMain.on('store-ping', (event) => {
      renderer = event.sender // Keep track of the receiving end
      event.sender.send('store-state', store.get())
    })

    ipcMain.on('store-dispatch', (event, action) => {
      // Forward the UI store action
      renderer = event.sender
      store.dispatch(action)
    })

    ipcMain.on('window', (event, action) => {
      let window = this.window

      if (!window) {
        return
      }

      debug('Received window action ' + action)
      switch (action) {
        case 'close':
          store.set('session.interactive.isMaximized', false)
          this.window = null
          window.close() // Walkaround to avoid the leak when destroying window
          break
        case 'maximize':
          store.set('session.interactive.isMaximized', true)
          window.maximize()
          break
        case 'restore':
          store.set('session.interactive.isMaximized', false)
          window.unmaximize()
          break
        case 'minimize':
          window.minimize()
          break
      }
    })

    store.subscribe((state) => {
      if (this.window) {
        this.window.webContents.send('store-state', state)
      }
    })

    return this.window
  }

  async launch () {

    try {

      this.printDebug('Rendering interactive UI')

      app.on('ready', () => this.createWindow())
      app.on('window-all-closed', () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
          app.quit()
        }

        // HOWEVER, We're dealing with a strange leak. So let's kill the app
        // when all windows have been closed
        app.quit()
      })

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (this.window === null) {
          this.createWindow()
        }
      })

    } catch (err) {
      this.printDebug(err)
    }

  }
}

module.exports = moduleWrapper(InteractiveFrontendModule)
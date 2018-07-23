/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  nativeImage,
  Tray
} from 'electron'
import MenuBuilder from './menu'
import settings from './settings'
import { WORK_TIME_TEXT } from './constants'

let mainWindow = null
let tray = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')()
  const path = require('path')
  const p = path.join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)))
}

function registerShortcuts() {
  // globalShortcut.register('CommandOrControl+S', () => {
  //   if (mainWindow) { mainWindow.webContents.send('toggle-timer') }
  // })

  // globalShortcut.register('CommandOrControl+R', () => {
  //   if (mainWindow) { mainWindow.webContents.send('reset-timer') }
  // })
}

function unregisterShortcuts() {
  globalShortcut.unregister('CommandOrControl+S')
  globalShortcut.unregister('CommandOrControl+R')
}

function createWindow() {
  mainWindow = new BrowserWindow({
    ...settings,
    icon: nativeImage.createFromPath('app/assets/appicon.png')
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('focus', () => {
    registerShortcuts()
  })

  mainWindow.on('blur', () => {
    unregisterShortcuts()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const menuItems = [
  {
    label: 'Start',
    accelerator: 'Cmd+S',
    selector: 'start:',
    click: () => {
      if (mainWindow) { mainWindow.webContents.send('toggle-timer') }
    }
  },
  {
    label: 'Reset',
    accelerator: 'Cmd+R',
    selector: 'reset:',
    click: () => {
      if (mainWindow) { mainWindow.webContents.send('reset-timer') }
    }
  },
  {
    label: 'Skip break',
    click: () => {
      if (mainWindow) { mainWindow.webContents.send('skip-break') }
    }
  },
  { label: 'Exit', role: 'quit' }
]

function createTray() {
  tray = new Tray(nativeImage
    .createFromPath('app/assets/trayicon.png')
    .resize({ width: 16, height: 16 }))

  const contextMenu = Menu.buildFromTemplate(menuItems)

  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  tray.setTitle(WORK_TIME_TEXT)
}

/**
 * Add event listeners...
 */

ipcMain.on('update-tray-title', (event, title) => {
  if (tray) { tray.setTitle(title) }
})

ipcMain.on('update-workt-status', (event, label, time) => {
  menuItems[0].label = label

  const contextMenu = Menu.buildFromTemplate(menuItems)
  if (tray) {
    tray.setContextMenu(contextMenu)
    tray.setTitle(time)
  }
})

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions()
  }

  createTray()
  createWindow()

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  globalShortcut.register('CommandOrControl+/', () => {
    if (mainWindow) { mainWindow.focus() }
  })
})

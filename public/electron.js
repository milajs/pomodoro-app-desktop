const electron = require('electron')
const settings = require('./settings')
const path = require('path')
const isDev = require('electron-is-dev')

const { app, BrowserWindow, ipcMain, globalShortcut, Menu, nativeImage, Tray } = electron

let mainWindow
let tray

function registerShortcuts() {
  globalShortcut.register('CommandOrControl+S', () => {
    if (mainWindow) { mainWindow.webContents.send('toggle-timer') }
  })

  globalShortcut.register('CommandOrControl+R', () => {
    if (mainWindow) { mainWindow.webContents.send('reset-timer') }
  })

  globalShortcut.register('CommandOrControl+B', () => {
    if (mainWindow) { mainWindow.webContents.send('skip-break') }
  })
}

function unregisterShortcuts() {
  globalShortcut.unregister('CommandOrControl+S')
  globalShortcut.unregister('CommandOrControl+R')
  globalShortcut.unregister('CommandOrControl+B')
}

function createWindow() {
  mainWindow = new BrowserWindow({
    ...settings,
    icon: nativeImage.createFromPath(path.join(__dirname, '/appicon.png'))
  })

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()

    globalShortcut.register('CommandOrControl+T', () => {
      if (mainWindow) { mainWindow.focus() }
    })
  })

  mainWindow.on('focus', () => {
    registerShortcuts()
  })

  mainWindow.on('blur', () => {
    unregisterShortcuts()
  })

  mainWindow.on('close', (event) => {
    if (mainWindow.isVisible() && !app.isQuiting) {
      event.preventDefault()
      mainWindow.hide()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function trayAction(action) {
  if (mainWindow) { 
    if (!mainWindow.isVisible()) {
      mainWindow.show()
    }
    mainWindow.webContents.send(action) 
  }
}

const menuItems = [
  {
    label: 'Start',
    accelerator: 'Cmd+S',
    selector: 'start',
    click: () => trayAction('toggle-timer')
  },
  {
    label: 'Reset',
    accelerator: 'Cmd+R',
    selector: 'reset',
    click: () => trayAction('reset-timer')
  },
  {
    label: 'Skip break',
    accelerator: 'Cmd+B',
    selector: 'skip',
    enabled: false,
    click: () => trayAction('skip-break')
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    accelerator: 'Cmd+Q',
    click: () => {
      if (mainWindow) {
        app.isQuiting = true
        app.quit()
      }
    }
  }
]

function createTray() {
  tray = new Tray(nativeImage
    .createFromPath(path.join(__dirname, '/trayicon.png'))
    .resize({ width: 16, height: 16 }))

  const contextMenu = Menu.buildFromTemplate(menuItems)

  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  tray.setTitle('25:00')
}

ipcMain.on('update-tray-title', (event, title) => {
  if (tray) {
    tray.setTitle(title)
  }
})

function updateTray(contextMenu, time) {
  if (tray) {
    tray.setContextMenu(contextMenu)
    tray.setTitle(time)
  }
}

ipcMain.on('update-workt-status', (event, label, time) => {
  const toggleButtonIndex = menuItems.findIndex(item => item.selector === 'start')

  menuItems[toggleButtonIndex].label = label

  const contextMenu = Menu.buildFromTemplate(menuItems)

  updateTray(contextMenu, time)
})

ipcMain.on('update-stage', (event, stage, time) => {
  const skipButtonIndex = menuItems.findIndex(item => item.selector === 'skip')

  menuItems[skipButtonIndex].enabled = stage === 'relax'

  const contextMenu = Menu.buildFromTemplate(menuItems)

  updateTray(contextMenu, time)
})

app.on('ready', () => {
  createTray()
  createWindow()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

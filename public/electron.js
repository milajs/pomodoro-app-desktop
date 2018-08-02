const electron = require('electron')
const settings = require('./settings')

const { app, BrowserWindow, ipcMain, Menu, nativeImage, Tray } = electron

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow
let tray

function createWindow() {
  mainWindow = new BrowserWindow(settings)

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => mainWindow = null)
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
    .createFromPath('src/assets/trayicon.png')
    .resize({ width: 16, height: 16 }))

  const contextMenu = Menu.buildFromTemplate(menuItems)

  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  tray.setTitle('25:00')
}

ipcMain.on('update-tray-title', (event, title) => {
  if (tray) { tray.setTitle(title) }
})

app.on('ready', () => {
  createTray()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const { app, BrowserWindow, Menu, nativeImage, Tray } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow
let tray = null

function createWindow() {
  mainWindow = new BrowserWindow({ width: 350, height: 720 })
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  mainWindow.on('closed', () => mainWindow = null)
}

function createTray() {
  tray = new Tray(nativeImage.createFromPath('public/assets/trayicon.png').resize({ width: 16, height: 16 }))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

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

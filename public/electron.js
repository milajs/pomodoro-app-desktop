const electron = require('electron')
const settings = require('./settings')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow(settings)

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)

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

const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
require('@electron/remote/main').initialize()
const Store = require('electron-store');
const { ipcMain } = require('electron/main');
const {download} = require('electron-dl');
const { Client, Authenticator } = require('minecraft-launcher-core');
const { exit } = require('process');
const { fips } = require('crypto');
require('minecraft-folder-path');
var minecraftdir = minecraft-folder-path;



function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'KNGClient Launcher',
    autoHideMenuBar:true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}


ipcMain.on("app/test", () => {
  console.log(require("minecraft-folder-path"));
})

ipcMain.on("app/launch", () => {
  const launcher = new Client();

  let opts = {
    clientPackage: "https://github.com/knightryry/KNGClient-Libs/raw/main/clientPackage.zip",
    authorization: Authenticator.getAuth("NameHere"),
    root: "./minecraft",
    version: {
        number: "1.8.9",
        type: "release",
        custom: "KNGClient"
    },
    memory: {
        max: "4G",
        min: "4G"
    }
  }

  

  
  
  launcher.launch(opts);

  launcher.on('debug', (e) => console.log(e));

});

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

const { app, Menu, Tray } = require('electron')
const chokidar = require('chokidar');
const path = require('path')

let trayApp = null
let syncDir = app.getPath('home') + path.sep + 'October'

function createApp () {
  trayApp = new Tray('icon.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', type: 'normal', click() { app.quit() }}
  ])
  trayApp.setToolTip('OctoberCMS Sync is running')
  trayApp.setContextMenu(contextMenu)

  chokidar.watch(syncDir).on('all', (event, path) => {
    console.log(event, path);
  });
}

app.on('ready', createApp)
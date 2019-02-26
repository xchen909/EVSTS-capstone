const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path')  
const { ipcMain } = require('electron');

let win;
let secondwin;  

function createWindow() { 
   win = new BrowserWindow({width: 800, height: 600})
   secondwin = new BrowserWindow({width: 200, height: 600}) 
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index3.html'), 
      protocol: 'file:', 
      slashes: true 
   }))
   secondwin.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index4.html'), 
      protocol: 'file:', 
      slashes: true 
   }))
   // Attach event listener to event that requests to update something in the second window
   // from the first window
   ipcMain.on('request-update-in-main-window', (event, arg) => {
      // Request to update the label in the renderer process of the second window
      console.log('hi', arg.filepath);
      win.webContents.send('action-update', arg);
  });
}

/*
var fs = require('fs');
var textByLine = fs.readFileSync('polyterrasse011.ezd').toString().split("\n");
var points = [];
for (i = 0; i < textByLine.length; i++){
    line = textByLine[i].split(' ');
    if (line.length == 4){
        points.push([parseFloat(line[0]),parseFloat(line[1]),parseFloat(line[2])]);
    }
}

for (p=0; p <points.length;p++){
    console.log(points[p][0],points[p][1],points[p][2]);
}
*/
app.on('ready', createWindow)
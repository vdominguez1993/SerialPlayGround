const {
    app,
    BrowserWindow
} = require('electron')

var ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Serial Playground'
});

parser.addArgument(
    ['-d', '--debug'], {
        action: 'storeTrue',
        help: 'Enable debug on startup'
    }
);

var args = parser.parseArgs();

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        webPreferences: {
            show: false,
            nodeIntegration: true
        }
    })

    win.maximize();
    win.show();

    // and load the index.html of the app.
    win.loadFile('index.html')

    if (args["debug"]) {
        // Open the DevTools.
        win.webContents.openDevTools();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
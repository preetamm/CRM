const { autoUpdater } = require('electron-updater')
const { dialog, BrowserWindow, ipcMain } = require('electron')
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'
autoUpdater.autoDownload = false


exports.check = () => {
    autoUpdater.checkForUpdates()
    autoUpdater.on('update-available', () => {
        let downloadProgress = 0
        dialog.showMessageBox({
            type: 'info',
            title: 'Update available',
            message: 'A new version is available.DO you want to install now?',
            button: ['Update', 'No']
        }, (buttonIndex) => {
            if (buttonIndex !== 0) return
            autoUpdater.downloadUpdate()
            let progressWin = new BrowserWindow({
                width: 350,
                height: 35,
                useContentSize: true,
                autoHideMenuBar: true,
                maximizable: false,
                resizable: false,
                fullscreen: false,
                fullscreenable: false,
                webPreferences: {
                    nodeIntegration: true
                }
            })

            progressWin.loadFile('progress.html')
            progressWin.on('closed', () => progressWin = null)
            ipcMain.on("download-progress-request", (e)=> {
                e.returnValue = downloadProgress
            })
            autoUpdater.on('download-progress', (d) => {
                downloadProgress = d.percent
                autoUpdater.logger.info(downloadProgress)
            })

            autoUpdater.on('update-download', ()=> {
                if(progressWin) progressWin.close()

                
                dialog.showMessageBox({
                    type: 'info',
                    title: 'Update ready',
                    message : 'a new version is ready quit and install now ',
                    button: ['yes', 'later']
                }, (buttonIndex) => {
                    if(buttonIndex === 0) autoUpdater.quitAndInstall()
                })
            })
        })
    })
}
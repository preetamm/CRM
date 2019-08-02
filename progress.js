const {ipcRenderer} = require('electron')
$ = require('jquery')
setInterval(()=> {
    let progress = ipcRenderer.sendSync('download-progress-request')
    $('progress').val(progress)
}, 1000)
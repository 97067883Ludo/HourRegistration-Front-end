import {app, BrowserWindow, Tray, Menu} from 'electron'
import {Notification} from 'electron'
import {nativeImage} from 'electron/common'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 700,
    });

    win.loadFile('index.html')
}

const red = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACTSURBVHgBpZKBCYAgEEV/TeAIjuIIbdQIuUGt0CS1gW1iZ2jIVaTnhw+Cvs8/OYDJA4Y8kR3ZR2/kmazxJbpUEfQ/Dm/UG7wVwHkjlQdMFfDdJMFaACebnjJGyDWgcnZu1/lrCrl6NCoEHJBrDwEr5NrT6ko/UV8xdLAC2N49mlc5CylpYh8wCwqrvbBGLoKGvz8Bfq0QPWEUo/EAAAAASUVORK5CYII=')

app.whenReady().then(() => {
    createWindow()

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            new Notification({
                title: "Electron",
                body: "Electron is still active"
            }).show()
            let tray = new Tray(red)
            tray.setToolTip('This is my application.')
            tray.on('click', () => {
                createWindow()
                tray.destroy()

            })
            const contextMenu = Menu.buildFromTemplate([
                { role: 'quit' }
            ])
            tray.setContextMenu(contextMenu)
        }
    })
})


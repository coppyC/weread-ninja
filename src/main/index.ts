import { app, shell, BrowserWindow, BrowserView, ipcMain, globalShortcut, Menu, MenuItem } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import Store from 'electron-store'
import icon from '../../resources/icon.png?asset'

interface IConf {
  PinTop: boolean
  RemberSize: boolean
}
interface IStore extends IConf {
  Bounds: Electron.Rectangle
}
const store = new Store<IStore>();

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: store.get("RemberSize") && store.get("Bounds.width") || 800,
    height: store.get("RemberSize") && store.get("Bounds.height") || 600,
    show: false,
    autoHideMenuBar: true,
    transparent: true,
    frame: false,
    minWidth: 375,
    minHeight: 100,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/weread.js')
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    // 在默认浏览器打开新页面，不在electron 打开
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.loadURL("https://weread.qq.com/")


  const helperView = new BrowserView({
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  optimizer.watchWindowShortcuts(helperView as any)
  helperView.setAutoResize({ horizontal: true, vertical: true })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    helperView.webContents.loadURL(process.env['ELECTRON_RENDERER_URL']) // HMR support!!
  } else {
    helperView.webContents.loadFile(join(__dirname, '../renderer/index.html')) // HMR not support
  }

  const menu = new Menu()
  menu.append(new MenuItem({
    label: '秘笈',
    accelerator: "F1",
    click() {
      if (!mainWindow.getBrowserView()) {
        mainWindow.setBrowserView(helperView)
        helperView.setBounds({ ...mainWindow.getBounds(), x: 0, y: 0})
      } else {
        mainWindow.setBrowserView(null)
      }
    }
  }))

  Menu.setApplicationMenu(menu)

  globalShortcut.register('Alt+Z', () => {
    if (!mainWindow.isVisible()) {
      mainWindow.show()
    } else {
      mainWindow.hide()
    }
  })

  mainWindow.on("resized", () => {
    store.set("Bounds", mainWindow.getBounds())
  })

  function updatePinTop() {
    mainWindow.setAlwaysOnTop(getConf().PinTop)
  }

  function getConf(): IConf {
    return {
      PinTop: store.get("PinTop", false),
      RemberSize: store.get("RemberSize", false),
    }
  }
  function sendConf() {
    const conf = getConf()
    helperView.webContents.send("Conf:update", conf)
  }
  function init() {
    updatePinTop()
  }

  ipcMain.on("Conf:PinTop", (_, v) => {
    store.set("PinTop", v)
    updatePinTop()
    sendConf()
  })
  ipcMain.on("Conf:RemberSize", (_, v) => {
    store.set("RemberSize", v)
    sendConf()
  })
  ipcMain.on("Conf:get", () => {
    sendConf()
  })

  init()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.weread-ninja')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

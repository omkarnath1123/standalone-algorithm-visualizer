const electron = require("electron");
const path = require("path");
const url = require("url");
const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
     minWidth: 1200,
     minHeight: 800,
    titleBarStyle: 'hidden',
    // fullscreen: true,
    icon: path.join(__dirname, "images/icon.icns")
  });
  // mainWindow.setFullScreen(true);
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "UI/pages/home/home.html"),
      protocol: "file",
      slashes: true
    })
  );
  mainWindow.on("close", () => {
    mainWindow = null;
    app.quit();
  });
});

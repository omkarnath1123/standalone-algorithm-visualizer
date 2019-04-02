const electron = require("electron");
const path = require("path");
const url = require("url");

const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreen: true
  });
  mainWindow.setFullScreen(true);
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "UI/root.html"),
      protocol: "file",
      slashes: true
    })
  );
  mainWindow.on("close", () => {
    app.quit();
  });
});
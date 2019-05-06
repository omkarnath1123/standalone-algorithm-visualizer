const electron = require("electron");
const path = require("path");
const url = require("url");
const { app, BrowserWindow } = electron;

let mainWindow;
let BASE_PAGE = "UI/pages/home/home.html";

app.on("ready", async () => {
  await new Promise(function (resolve, reject) {
    require("dns")
      .resolve("www.google.com", function (err) {
        if (err) {
          BASE_PAGE = "UI/pages/offline/offline.html";
        } else {
          BASE_PAGE = "UI/pages/home/home.html";
        }
        resolve();
      });
    setTimeout(() => {
      BASE_PAGE = "UI/pages/offline/offline.html";
      resolve();
    }, 5000);
  });

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    // titleBarStyle: 'hidden',
    // fullscreen: true,
    icon: path.join(__dirname, "images/icon.icns")
  });
  // mainWindow.setFullScreen(true);
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, BASE_PAGE),
      protocol: "file",
      slashes: true
    })
  );
  mainWindow.on("close", () => {
    mainWindow = null;
    app.quit();
  });
});

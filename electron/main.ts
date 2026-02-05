import * as electron from "electron";
const { app, BrowserWindow } = electron;

app.setName("todo-app");

import path from "path";
import { initAllTablesAndIPC } from "./db/ipc";

// frame: false, <- add this when you will create a custom top bar
function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenu(null);

  if (!app.isPackaged) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  console.log("USER DATA PATH =", app.getPath("userData"));

  initAllTablesAndIPC();
  createWindow();
});

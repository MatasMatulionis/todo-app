import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  get: (table: string, ...args: any[]) =>
    ipcRenderer.invoke(`${table}:get`, ...args),
  add: (table: string, ...args: any[]) =>
    ipcRenderer.invoke(`${table}:add`, ...args),
});

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getLists: () => ipcRenderer.invoke("lists:get"),
  addList: (title: string, color: string) =>
    ipcRenderer.invoke("lists:add", title, color),
  deleteList: (id: number) => ipcRenderer.invoke("lists:remove", id),
  getItems: (listId: number) => ipcRenderer.invoke("items:get", listId),
  addItem: (
    title: string,
    description: string,
    priority: string,
    status: string,
    listId: number,
  ) =>
    ipcRenderer.invoke(
      "items:add",
      title,
      description,
      priority,
      status,
      listId,
    ),
});

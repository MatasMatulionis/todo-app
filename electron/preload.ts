import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getLists: () => ipcRenderer.invoke("lists:get"),
  addList: (title: string, color: string) =>
    ipcRenderer.invoke("lists:add", title, color),
  deleteList: (id: number) => ipcRenderer.invoke("lists:remove", id),
  getTasks: (filters?: any) => ipcRenderer.invoke("tasks:get", filters),
  addTask: (
    mainMode: boolean,
    title: string,
    description: string | null,
    priority: number | null,
    status: number | null,
    progress: number | null,
    listId: number | null,
    startedAt: number | null,
    deadlineAt: number | null,
  ) =>
    ipcRenderer.invoke(
      "tasks:add",
      mainMode,
      title,
      description,
      priority,
      status,
      progress,
      listId,
      startedAt,
      deadlineAt,
    ),
});

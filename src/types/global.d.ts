export {}; // REQUIRED

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

interface ElectronAPI {
  //List
  getLists(): Promise<any[]>;
  addList(title: string, color: string): Promise<void>;
  deleteList(id: number): Promise<void>;
  //Task
  getTasks(filters?: any): Promise<any[]>;
  addTask(
    mainMode: boolean,
    title: string,
    description: string | null,
    priority: number | null,
    status: number | null,
    progress: number | null,
    listId: number | null,
    startedAt: number | null,
    deadlineAt: number | null,
  ): Promise<void>;
}

interface Window {
  electronAPI: ElectronAPI;
}

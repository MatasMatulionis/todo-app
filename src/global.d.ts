interface ElectronAPI {
  getLists(): Promise<any[]>;
  addList(title: string, color: string): Promise<void>;
  deleteList(id: number): Promise<void>;
  getItems(listId: number): Promise<any[]>;
  addItem(
    title: string,
    description: string,
    priority: string,
    status: string,
    listId: number,
  ): Promise<void>;
}

interface Window {
  electronAPI: ElectronAPI;
}

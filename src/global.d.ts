interface ElectronAPI {
  getLists(): Promise<any[]>;
  addList(title: string, color: string): Promise<void>;
  deleteList(id: number): Promise<void>;
  getItems(listId: number): Promise<any[]>;
  addItem(
    title: string,
    description: string,
    priority: numbe | null,
    status: numbe | null,
    listId: number | null,
  ): Promise<void>;
}

interface Window {
  electronAPI: ElectronAPI;
}

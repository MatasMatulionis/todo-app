import { ipcMain } from "electron";
import * as Tasks from "./tasks";
import * as Lists from "./lists";

type TableModule = {
  tableName: string;
  initTable(): void;
  getAll: (...args: any[]) => any[];
  add(...args: any[]): void;
  remove(...args: any[]): void;
};

const tables: TableModule[] = [Tasks, Lists];

export function initAllTablesAndIPC() {
  tables.forEach((table) => {
    table.initTable();

    ipcMain.handle(`${table.tableName}:get`, (_, ...args: any[]) =>
      table.getAll(...args),
    );

    ipcMain.handle(`${table.tableName}:add`, (_, ...args: any[]) =>
      table.add(...args),
    );

    ipcMain.handle(`${table.tableName}:remove`, (_, ...args: any[]) =>
      table.remove(...args),
    );
  });
}

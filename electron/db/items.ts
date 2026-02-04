import { db } from "./index";

export const tableName = "items";

export function initTable() {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT,
    status TEXT,
    created_at INTEGER NOT NULL,
    list_id INTEGER NOT NULL,

    FOREIGN KEY (list_id) REFERENCES lists(id)
    );
  `,
  ).run();
}

export function getAll() {
  return db.prepare("SELECT * FROM items ORDER BY title ASC").all();
}

export function add(
  title: string,
  description: string,
  priority: string,
  status: string,
  listId: number,
) {
  db.prepare(
    `
    INSERT INTO tasks (title, description, list_id, priority, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  ).run(title, description, listId, priority, status, Date.now());
}

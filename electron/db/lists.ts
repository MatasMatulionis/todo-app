import { db } from "./index";

export const tableName = "lists";

export function initTable() {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    color TEXT NOT NULL
    );
  `,
  ).run();
}

export function getAll() {
  return db.prepare("SELECT * FROM lists ORDER BY title ASC").all();
}

export function add(title: string, color?: string) {
  db.prepare("INSERT INTO lists (title, color) VALUES (?, ?)").run(
    title,
    color ?? "#ffffff",
  );
}

export function edit(id: number, title: string, color?: string) {
  db.prepare(
    `
  UPDATE lists
  SET title = ?, color = ?
  WHERE id = ?
`,
  ).run(title, color ?? "#ffffff", id);
}

export function remove(id: number) {
  db.prepare(`DELETE from lists WHERE id = ?`).run(id);
}

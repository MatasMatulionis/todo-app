import { db } from "./index";

export const tableName = "tasks";

export function initTable() {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority INTEGER,
    status INTEGER,
    created_at INTEGER NOT NULL,
    list_id INTEGER,

    FOREIGN KEY (list_id) REFERENCES lists(id)
    );
  `,
  ).run();
}

export function getAll() {
  return db.prepare("SELECT * FROM tasks ORDER BY title ASC").all();
}

export function add(
  title: string,
  description: string,
  priority: number | null,
  status: number | null,
  percentageDone: number | null,
  listId: number | null,
  startedAt: number | null,
  deadlineAt: number | null,
  streak: number | null,
  longestStreak: number | null, //default
  lastDayStreak: number | null, //default
  streakPeriod: number | null,
  streakPeriodTimes: number | null,
  streakGoal: number | null,
) {
  db.prepare(
    `
    INSERT INTO tasks (title, description, list_id, priority, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  ).run(title, description, listId, priority, status, Date.now());
}

export function remove(id: number) {
  db.prepare(
    `
    DELETE from tasks WHERE id = ?
  `,
  ).run(id);
}

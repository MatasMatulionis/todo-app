import { db } from "./index";

export const tableName = "tasks";

export function initTable() {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,
    description TEXT,

    main_mode BOOLEAN NOT NULL DEFAULT 0,

    priority INTEGER,
    status INTEGER,

    progress INTEGER,

    list_id INTEGER,

    created_at INTEGER NOT NULL,

    started_at INTEGER,
    deadline_at INTEGER,

    streak INTEGER,
    longest_streak INTEGER,
    last_day_streak INTEGER,

    streak_period INTEGER,
    streak_period_times INTEGER,
    streak_goal INTEGER,

    FOREIGN KEY (list_id) REFERENCES lists(id)
);
  `,
  ).run();
}

export function getAll() {
  return db.prepare("SELECT * FROM tasks ORDER BY title ASC").all();
}

export function add(
  mainMode: boolean,
  title: string,
  description: string,
  priority: number | null,
  status: number | null,
  progress: number | null,
  listId: number | null,
  startedAt: number | null,
  deadlineAt: number | null,
  streak: number | null,
  longestStreak: number | null,
  lastDayStreak: number | null,
  currentPeriodTimesDone: number | null,
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

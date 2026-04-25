import { db } from "./index";

export type TaskFilters = {
  type?: boolean;
  listId?: number | null;
  status?: number;
  priority?: number;
  search?: string;
  dueBefore?: number;
};

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

    FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE SET NULL
);
  `,
  ).run();
}

export function getAll(filter?: TaskFilters) {
  let query = "SELECT * FROM tasks";
  const conditions: string[] = [];
  const params: any[] = [];

  if (filter?.listId === null) {
    conditions.push("list_id IS NULL");
  } else if (filter?.listId !== undefined) {
    conditions.push("list_id = ?");
    params.push(filter.listId);
  }

  if (filter?.type !== undefined) {
    conditions.push("main_mode = ?");
    params.push(filter.type ? 1 : 0);
  }

  if (filter?.status !== undefined) {
    conditions.push("status = ?");
    params.push(filter.status);
  }

  if (filter?.priority !== undefined) {
    conditions.push("priority = ?");
    params.push(filter.priority);
  }

  if (filter?.dueBefore !== undefined) {
    conditions.push("deadline_at <= ?");
    params.push(filter.dueBefore);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  // query += " ORDER BY title ASC";

  return db.prepare(query).all(...params);
}

export function add(
  mainMode: boolean,
  title: string,
  description: string | null,
  priority: number | null,
  status: number | null,
  progress: number | null,
  listId: number | null,
  startedAt: number | null,
  deadlineAt: number | null,
  streakId: number | null,
  streakPeriod: number | null,
  streakTimesPerPeriod: number | null,
  streakGoal: number | null,
) {
  db.prepare(
    `
    INSERT INTO tasks (main_mode, title, description, list_id, priority, progress, status, started_at, deadline_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  ).run(
    mainMode ? 1 : 0,
    title,
    description,
    listId,
    priority,
    progress,
    status,
    startedAt,
    deadlineAt,
    Date.now(),
  );
}

export function edit(id: number) {
  console.log("FUNCTION NOT MADE");
}

export function remove(id: number) {
  db.prepare(
    `
    DELETE from tasks WHERE id = ?
  `,
  ).run(id);
}

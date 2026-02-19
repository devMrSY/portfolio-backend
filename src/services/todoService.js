import connectDB from "../connectDB.js";
import {
  archiveTodoById,
  createTodo,
  findActiveTodos,
  findArchivedTodos,
  updateTodoById,
} from "../repositories/todoRepository.js";

const allowedUpdateFields = ["title", "description", "status"];

function pickUpdates(payload) {
  const updates = {};
  for (const key of allowedUpdateFields) {
    if (payload[key] !== undefined) updates[key] = payload[key];
  }
  return updates;
}

export async function listTodos() {
  await connectDB();
  return findActiveTodos();
}

export async function listArchivedTodos() {
  await connectDB();
  return findArchivedTodos();
}

export async function createTodoItem(payload) {
  if (!payload?.title || typeof payload.title !== "string") {
    const err = new Error("title is required");
    err.status = 400;
    throw err;
  }

  await connectDB();
  return createTodo({
    title: payload.title,
    description: payload.description ?? "",
    status: payload.status,
  });
}

export async function updateTodoItem(id, payload) {
  const updates = pickUpdates(payload || {});
  if (Object.keys(updates).length === 0) {
    const err = new Error("no valid fields to update");
    err.status = 400;
    throw err;
  }

  await connectDB();
  return updateTodoById(id, updates);
}

export async function archiveTodoItem(id) {
  await connectDB();
  return archiveTodoById(id);
}
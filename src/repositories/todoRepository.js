import Todo from "../models/todo.js";

export async function createTodo(data) {
  return Todo.create(data);
}

export async function updateTodoById(id, updates) {
  return Todo.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).lean();
}

export async function findActiveTodos() {
  return Todo.find({ isArchived: false }).lean().exec();
}

export async function findArchivedTodos() {
  return Todo.find({ isArchived: true }).lean().exec();
}

export async function archiveTodoById(id) {
  return Todo.findByIdAndUpdate(
    id,
    { isArchived: true, archivedAt: new Date() },
    { new: true, runValidators: true }
  ).lean();
}

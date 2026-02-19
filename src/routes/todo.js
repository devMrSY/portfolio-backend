import { Router } from "express";
import {
  archiveTodoItem,
  createTodoItem,
  listArchivedTodos,
  listTodos,
  updateTodoItem,
} from "../services/todoService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const todos = await listTodos();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

router.get("/archived", async (req, res) => {
  try {
    const todos = await listArchivedTodos();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = await createTodoItem(req.body);
    res.status(201).json(todo);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ status: "error", message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await updateTodoItem(req.params.id, req.body);
    if (!todo) return res.status(404).json({ status: "error", message: "not found" });
    res.status(200).json(todo);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ status: "error", message: err.message });
  }
});

router.patch("/:id/archive", async (req, res) => {
  try {
    const todo = await archiveTodoItem(req.params.id);
    if (!todo) return res.status(404).json({ status: "error", message: "not found" });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

export default router;
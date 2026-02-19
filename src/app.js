import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://portfolio-backend-ashy-nine-81.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

app.use("/todos", todoRouter);

export default app;

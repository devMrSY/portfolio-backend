import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.js";

const app = express();

const allowedOrigins = [
  "https://devmrsy.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
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

import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, DB_NAME ? { dbName: DB_NAME } : undefined).then((m) => {
      // Log once when a new connection is established
      // eslint-disable-next-line no-console
      console.log("MongoDB connected");
      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

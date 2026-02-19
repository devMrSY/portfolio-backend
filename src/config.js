import "dotenv/config";

const PORT = Number.parseInt(process.env.PORT, 10) || 3000;

export { PORT };
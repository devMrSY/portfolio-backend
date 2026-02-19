import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${PORT}`);
});
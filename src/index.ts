import express from "express";
import { config } from "./middleware/config";
import { registerComponents } from "./components";

const app = express();

(async () => {
  await config(app);
  registerComponents(app);
})();

const server = app.listen(process.env.PORT || 8081, function () {
  // const port = server.address().port
  console.log("App started at port:", process.env.PORT || 8081);
});

export default app;

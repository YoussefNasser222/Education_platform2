import express from "express";
import { config } from "dotenv";
config();
import { bootstrap } from "./app.controller.js";
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log("server is running on port ",port);
});

bootstrap(app , express);
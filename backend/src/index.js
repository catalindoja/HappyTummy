import app from './app.js'
import {PORT} from './config.js'
import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";

import express from "express";

// CREO QUE NO ES NECESARIO
// const app = express();
// app.use(express.json());

// RAMA MAIN
app.listen(PORT, () => {
  console.log("index.js: Server started on port " + PORT + "!");
});
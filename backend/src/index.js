import app from './app.js'
import {PORT} from './config.js'

import express from "express";
import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";

// const app = express();

app.listen(PORT, () => {
  console.log("Server started on port " + PORT + "...");
});

app.use("HappyTummy/backend/controllers/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
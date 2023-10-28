import app from './app.js'
import { PORT } from './config.js'
import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";

// Initializes the server based on the information in app.js and config.js
app.listen(PORT, () => {
  console.log("index.js: Server started on port " + PORT + "!");
});
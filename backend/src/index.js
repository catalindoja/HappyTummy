import app from './app.js'
import {PORT} from './config.js'
import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";

import cookieParser from "cookie-parser";
import multer from "multer";

import express from "express";

// CREO QUE NO ES NECESARIO
// const app = express();
// app.use(express.json());

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // RUTA PARA GUARDAR FILES
    cb(null, "../frontend/webpage/public/upload");    // CAMBIA ESTOOOOOOOOOOOOOOOOOOO
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
app.post("/upload", upload.single("file"), function (req, res) {    // CAMBIA ESTOOOOOOOOOOOOOOOOOOO
  const file = req.file;
  res.status(200).json(file.filename);
});

// RAMA MAIN
app.listen(PORT, () => {
  console.log("index.js: Server started on port " + PORT + "!");
});
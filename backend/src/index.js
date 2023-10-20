import app from './app.js'
import {PORT} from './config.js'
import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";

import express from "express";

// NECESARIO?? CREO QUE NO
// const app = express();
// app.use(express.json());

// ESTO ES LO ÚNICO QUE TIENE LA RAMA MAIN
app.listen(PORT, () => {
  console.log("index.js: Server started on port " + PORT + "!");
});

// app.get("/testeo", (req, res)=>{
//   const q = "SELECT * FROM user"
//   db.query(q,(err,data)=>{
//     if (err) return res.json(err)
//     return res.json(data)
//   })
// })

//app.use("/backend/auth", authRoutes);
//app.use("/api/users", userRoutes);
//app.use("/api/posts", postRoutes);
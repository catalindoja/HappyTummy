import express from 'express'
import {pool} from './db.js'
import usersRoutes from './routes/users.routes.js'


const app = express();



app.get('/ping', async (req, res) => {
  const result = await pool.query('SELECT "Pong" AS result')
  res.json(result[0])
});

app.use(usersRoutes)

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
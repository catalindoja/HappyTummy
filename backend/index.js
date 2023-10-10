import express from 'express'
import {pool} from './db.js'


const app = express();

app.get('/employees', (req, res) => res.send("obtained employees"))
app.post('/employee', (req, res) => res.send("created employee"))
app.put('/employees', (req, res) => res.send("updating employee")) 
app.delete('/employees', (req, res) => res.send("deleting employee"))

app.get('/ping', async (req, res) => {
  const result = await pool.query('SELECT 1 + 1 AS result')
  res.json(result)
});

app.listen("3000", () => {

  console.log("Server started on port 3000");
  console.log("nodemon test")

});
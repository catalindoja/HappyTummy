import express from 'express'
import usersRoutes from './routes/users.routes.js'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())

//routes
app.use(usersRoutes)


//middleware for when routes were not found
app.use((req, res, next) => {
  res.status(404).json({
    message: 'API endpoint not found'
  })
})

app.listen(5000, () => {
  console.log('app.js: Server is running on port 5000?!?');
});

export default app;
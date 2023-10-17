import express from 'express'
import usersRoutes from './routes/users.routes.js'

const app = express();
app.use(express.json())

//routes
app.use(usersRoutes)


//middleware for when routes were not found
app.use((req, res, next) => {
  res.status(404).json({
    message: 'API endpoint not found'
  })
})

export default app;
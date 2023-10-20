import express from 'express'
import usersRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())

//routes
app.use(usersRoutes)
app.use(authRoutes)

//middleware for when routes were not found
app.use((req, res, next) => {
  res.status(404).json({
    message: 'API endpoint not found'
  })
})

export default app;
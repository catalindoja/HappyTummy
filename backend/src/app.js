import express from 'express'
import usersRoutes from './routes/users.routes.js'
import paymentHistoryRoutes from './routes/paymenthistory.routes.js'
import supermarketRoutes from './routes/supermarket.routes.js'
import discountRoutes from './routes/discount.routes.js'
import categoryRoutes from './routes/category.routes.js'
import allergiesRoutes from './routes/allergies.routes.js'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())

//routes
app.use(usersRoutes)
app.use(paymentHistoryRoutes)
app.use(supermarketRoutes)
app.use(discountRoutes)
app.use(categoryRoutes)
app.use(allergiesRoutes)



//middleware for when routes were not found
app.use((req, res, next) => {
  res.status(404).json({
    message: 'API endpoint not found'
  })
})

export default app;
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import multer from "multer";
import usersRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'
import paymentHistoryRoutes from './routes/paymenthistory.routes.js'
import supermarketRoutes from './routes/supermarket.routes.js'
import discountRoutes from './routes/discount.routes.js'
import categoryRoutes from './routes/category.routes.js'
import allergiesRoutes from './routes/allergies.routes.js'
import productRoutes from './routes/product.routes.js'
import stockRoutes from './routes/stock.routes.js'
import recipesRoutes from './routes/recipe.routes.js'
import ingredientsRoutes from './routes/ingredients.routes.js'
import productAllergiesRoutes from './routes/productallergies.routes.js'
import commentRoutes from './routes/comment.routes.js'
import brandRoutes from './routes/brand.routes.js'
import commentRecipeRoutes from './routes/commentrecipe.routes.js'
import commentReportRoutes from './routes/commentreport.routes.js'
import errorReportRoutes from './routes/errorreport.routes.js'
import productListRoutes from './routes/productlist.routes.js'
import shoppingListRoutes from './routes/shoppinglist.routes.js'

const app = express();
app.use(cors())
app.use(express.json()) 
app.use(express.json()) 

//routes
app.use(usersRoutes) 
app.use(paymentHistoryRoutes)
app.use(supermarketRoutes)
app.use(discountRoutes)
app.use(categoryRoutes)
app.use(allergiesRoutes)
app.use(productRoutes)
app.use(stockRoutes)
app.use(recipesRoutes)
app.use(ingredientsRoutes)
app.use(productAllergiesRoutes)
app.use(commentRoutes)
app.use(authRoutes)
app.use(brandRoutes)
app.use(usersRoutes) 
app.use(paymentHistoryRoutes)
app.use(supermarketRoutes)
app.use(discountRoutes)
app.use(categoryRoutes)
app.use(allergiesRoutes)
app.use(productRoutes)
app.use(stockRoutes)
app.use(recipesRoutes)
app.use(ingredientsRoutes)
app.use(productAllergiesRoutes)
app.use(commentRoutes)
app.use(authRoutes)
app.use(brandRoutes)
app.use(commentRecipeRoutes)
app.use(commentReportRoutes)
app.use(errorReportRoutes)
app.use(productListRoutes)
app.use(shoppingListRoutes)

/**
 *Middleware for when routes were not found, returns a 404 state
 */
app.use((req, res, next) => {
  res.status(404).json({
    message: 'API endpoint not found'
  })
})

/**
 * This allows us to upload images inputed by the user to the server
 */
app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/webpage/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

/**
 * Uploads the image and returns a 200 state
 */
app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

export default app;
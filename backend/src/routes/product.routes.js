import {Router} from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'


const router = Router()


router.get('/products', getProducts)

router.get('/products/:id', getProduct)

//router.get('/products/:iduser', getProductByUserId)

router.post('/products', createProduct)

router.patch('/products/:id', updateProduct)

router.delete('/products/:id', deleteProduct)


export default router
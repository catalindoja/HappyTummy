import {Router} from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductByUserId, getProductByBrandId, getProductByCategoryId, getProductBySupermarketId } from '../controllers/product.controller.js'


const router = Router()


/**
 * When one of the product endpoints is reached, these functions trigger the corresponding function
 */
router.get('/products', getProducts)

router.get('/products/:id', getProduct)

router.get('/products/fromuser/:iduser', getProductByUserId)

router.get('/products/frombrand/:idbrand', getProductByBrandId)

router.get('/products/fromcategory/:idcategory', getProductByCategoryId)

router.get('/products/fromsupermarket/:idsupermarket', getProductBySupermarketId)

router.post('/products', createProduct)

router.patch('/products/:id', updateProduct)

router.delete('/products/:id', deleteProduct)


export default router
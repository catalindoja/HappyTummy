import {Router} from 'express'
import { getProductLists, getProductList, createProductList, updateProductList, deleteProductList } from '../controllers/productlist.controller.js'


const router = Router()

/**
 * When one of the allergies endpoints is reached, these functions trigger the corresponding function
 */
router.get('/productlists', getProductLists)

router.get('/productlists/:id', getProductList)

router.post('/productlists', createProductList)

router.patch('/productlists/:id', updateProductList)

router.delete('/productlists/:id', deleteProductList)


export default router
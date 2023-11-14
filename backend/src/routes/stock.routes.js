import {Router} from 'express'
import { getStocks, getStock, createStock, updateStock, deleteStock } from '../controllers/stock.controller.js'


const router = Router()


/**
 * When one of the stock endpoints is reached, these functions trigger the corresponding function
 */
router.get('/stock', getStocks)

router.get('/stock/:id', getStock)

router.post('/stock', createStock)

router.patch('/stock/:id', updateStock)

router.delete('/stock/:id', deleteStock)


export default router
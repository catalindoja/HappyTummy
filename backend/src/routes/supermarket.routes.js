import {Router} from 'express'
import { getMarkets, getMarket, createMarket, updateMarket, deleteMarket } from '../controllers/supermarket.controller.js'


const router = Router()


/**
 * When one of the supermarket endpoints is reached, these functions trigger the corresponding function
 */
router.get('/markets', getMarkets)

router.get('/markets/:id', getMarket)

router.post('/markets', createMarket)

router.patch('/markets/:id', updateMarket)

router.delete('/markets/:id', deleteMarket)


export default router
import {Router} from 'express'
import { getFavMarkets, getFavMarket, createFavMarket, deleteFavMarket } from '../controllers/favmarket.controller.js'


const router = Router()


/**
 * When one of the categories endpoints is reached, these functions trigger the corresponding function
 */
router.get('/favmarkets', getFavMarkets)

router.get('/favmarkets/:iduser/:idmarket', getFavMarket)

router.post('/favmarkets', createFavMarket)

router.delete('/favmarkets/:iduser/:idmarket', deleteFavMarket)


export default router
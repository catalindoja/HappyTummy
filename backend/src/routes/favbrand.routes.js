import {Router} from 'express'
import { getFavBrands, getFavBrand, createFavBrand, deleteFavBrand } from '../controllers/favbrand.controller.js'


const router = Router()


/**
 * When one of the categories endpoints is reached, these functions trigger the corresponding function
 */
router.get('/favbrands', getFavBrands)

router.get('/favbrands/:iduser/:idbrand', getFavBrand)

router.post('/favbrands', createFavBrand)

router.delete('/favbrands/:iduser/:idbrand', deleteFavBrand)


export default router
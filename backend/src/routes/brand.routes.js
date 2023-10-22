import {Router} from 'express'
import { getBrands, getBrand, createBrand, updateBrand, deleteBrand } from '../controllers/brand.controller.js'


const router = Router()


router.get('/brands', getBrands)

router.get('/brands/:id', getBrand)

router.post('/brands', createBrand)

router.patch('/brands/:id', updateBrand)

router.delete('/brands/:id', deleteBrand)


export default router
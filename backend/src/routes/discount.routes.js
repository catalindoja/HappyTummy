import {Router} from 'express'
import { getDiscounts, getDiscount, createDiscount, updateDiscount, deleteDiscount} from '../controllers/discount.controller.js'


const router = Router()


router.get('/discounts', getDiscounts)

router.get('/discounts/:id', getDiscount)

router.post('/discounts', createDiscount)

router.patch('/discounts/:id', updateDiscount)

router.delete('/discounts/:id', deleteDiscount)


export default router
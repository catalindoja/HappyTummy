import {Router} from 'express'
import { getDiscounts, getDiscount, createDiscount, updateDiscount, deleteDiscount} from '../controllers/discount.controller.js'


const router = Router()

/**
 * When one of the discounts endpoints is reached, these functions trigger the corresponding function
 */
router.get('/discounts', getDiscounts)

router.get('/discounts/:id', getDiscount)

router.post('/discounts', createDiscount)

router.patch('/discounts/:id', updateDiscount)

router.delete('/discounts/:id', deleteDiscount)


export default router
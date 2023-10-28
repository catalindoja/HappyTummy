import {Router} from 'express'
import { getPayments, getPayment, createPayment, updatePayment, deletePayment } from '../controllers/paymenthistory.controller.js'


const router = Router()

/**
 * When one of the payment endpoints is reached, these functions trigger the corresponding function
 */
router.get('/payments', getPayments)

router.get('/payments/:id', getPayment)

router.post('/payments', createPayment)

router.patch('/payments/:id', updatePayment)

router.delete('/payments/:id', deletePayment)


export default router
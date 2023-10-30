import {Router} from 'express'
import { getProductAllergies, getProductAllergy, createProductAllergy, updateProductAllergy, deleteProductAllergy } from '../controllers/productallergies.controller.js'


const router = Router()


/**
 * When one of the product/allergy relations endpoints is reached, these functions trigger the corresponding function
 */
router.get('/productallergies', getProductAllergies)

router.get('/productallergies/:id', getProductAllergy)

router.post('/productallergies', createProductAllergy)

router.patch('/productallergies/:id', updateProductAllergy)

router.delete('/productallergies/:id', deleteProductAllergy)


export default router
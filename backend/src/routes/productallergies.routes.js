import {Router} from 'express'
import { getProductAllergies, getProductAllergy, createProductAllergy, updateProductAllergy, deleteProductAllergy } from '../controllers/productallergies.controller.js'


const router = Router()


router.get('/productallergies', getProductAllergies)

router.get('/productallergies/:id', getProductAllergy)

router.post('/productallergies', createProductAllergy)

router.patch('/productallergies/:id', updateProductAllergy)

router.delete('/productallergies/:id', deleteProductAllergy)


export default router
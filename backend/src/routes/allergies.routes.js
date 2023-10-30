import {Router} from 'express'
import { getAllergies, getAllergy, createAllergy, updateAllergy, deleteAllergy } from '../controllers/allergies.controller.js'


const router = Router()

/**
 * When one of the allergies endpoints is reached, these functions trigger the corresponding function
 */
router.get('/allergies', getAllergies)

router.get('/allergies/:id', getAllergy)

router.post('/allergies', createAllergy)

router.patch('/allergies/:id', updateAllergy)

router.delete('/allergies/:id', deleteAllergy)


export default router
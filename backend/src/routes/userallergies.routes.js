import {Router} from 'express'
import { getUserAllergies, getUserAllergy, createUserAllergy, deleteUserAllergy } from '../controllers/userallergies.controller.js'


const router = Router()


/**
 * When one of the categories endpoints is reached, these functions trigger the corresponding function
 */
router.get('/userallergies', getUserAllergies)

router.get('/userallergies/:iduser/:idallergy', getUserAllergy)

router.post('/userallergies', createUserAllergy)

router.delete('/userallergies/:iduser/:idallergy', deleteUserAllergy)


export default router
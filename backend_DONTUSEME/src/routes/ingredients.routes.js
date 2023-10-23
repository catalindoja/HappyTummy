import {Router} from 'express'
import { getIngredients, getIngredient, createIngredient, updateIngredient, deleteIngredient } from '../controllers/ingredients.controller.js'


const router = Router()


router.get('/ingredients', getIngredients)

router.get('/ingredients/:id', getIngredient)

router.post('/ingredients', createIngredient)

router.patch('/ingredients/:id', updateIngredient)

router.delete('/ingredients/:id', deleteIngredient)


export default router
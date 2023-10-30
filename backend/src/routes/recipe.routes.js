import {Router} from 'express'
import {  getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipe.controller.js'


const router = Router()


/**
 * When one of the recipes endpoints is reached, these functions trigger the corresponding function
 */
router.get('/recipes', getRecipes)

router.get('/recipes/:id', getRecipe)

router.post('/recipes', createRecipe)

router.patch('/recipes/:id', updateRecipe)

router.delete('/recipes/:id', deleteRecipe)


export default router
import {Router} from 'express'
import { getCommentRecipes, getCommentRecipe, createCommentRecipe, updateCommentRecipe, deleteCommentRecipe } from '../controllers/commentrecipe.controller.js'


const router = Router()

/**
 * When one of the allergies endpoints is reached, these functions trigger the corresponding function
 */
router.get('/commentrecipes', getCommentRecipes)

router.get('/commentrecipes/:id', getCommentRecipe)

router.post('/commentrecipes', createCommentRecipe)

router.patch('/commentrecipes/:id', updateCommentRecipe)

router.delete('/commentrecipes/:id', deleteCommentRecipe)


export default router
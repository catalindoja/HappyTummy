import {Router} from 'express'
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js'


const router = Router()


/**
 * When one of the categories endpoints is reached, these functions trigger the corresponding function
 */
router.get('/categories', getCategories)

router.get('/categories/:id', getCategory)

router.post('/categories', createCategory)

router.patch('/categories/:id', updateCategory)

router.delete('/categories/:id', deleteCategory)


export default router
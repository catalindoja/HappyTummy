import {Router} from 'express'
import { getShoppingLists, getShoppingList, createShoppingList, updateShoppingList, deleteShoppingList } from '../controllers/shoppinglist.controller.js'


const router = Router()

/**
 * When one of the allergies endpoints is reached, these functions trigger the corresponding function
 */
router.get('/shoppinglists', getShoppingLists)

router.get('/shoppinglists/:id', getShoppingList)

router.post('/shoppinglists', createShoppingList)

router.patch('/shoppinglists/:id', updateShoppingList)

router.delete('/shoppinglists/:id', deleteShoppingList)


export default router
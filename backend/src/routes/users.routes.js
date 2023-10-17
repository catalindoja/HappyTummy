import {Router} from 'express'
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controller.js'


const router = Router()


router.get('/users', getUsers)

router.get('/users/:id', getUser)

router.post('/users', createUser)

router.patch('/users/:id', updateUser)

router.delete('/users/:id', deleteUser)


export default router
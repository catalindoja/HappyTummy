import {Router} from 'express'
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controller.js'


const router = Router()


router.get('/users', getUsers)

router.get('/users/:id', getUser)

router.post('/user', createUser)

router.put('/user', updateUser)

router.delete('/user', deleteUser)


export default router
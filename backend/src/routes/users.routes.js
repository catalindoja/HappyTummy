import {Router} from 'express'
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/users.controller.js'


const router = Router()


router.get('/users', getUsers)

router.post('/user', createUser)

router.put('/user', updateUser)

router.delete('/user', deleteUser)


export default router
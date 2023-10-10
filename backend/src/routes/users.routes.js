import {Router} from 'express'
import { getUsers } from '../controllers/users.controller.js'
import { createUser } from '../controllers/users.controller.js'
import { updateUser } from '../controllers/users.controller.js'
import { deleteUser } from '../controllers/users.controller.js'

const router = Router()


router.get('/users', getUsers)

router.post('/user', createUser)

router.put('/user', updateUser)

router.delete('/user', deleteUser)


export default router
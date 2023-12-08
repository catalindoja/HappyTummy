import {Router} from 'express'
import { getFollowers, getFollower, createFollower, updateFollower, deleteFollower } from '../controllers/follower.controller.js'


const router = Router()

/**
 * When one of the ingredients endpoints is reached, these functions trigger the corresponding function
 */
router.get('/followers', getFollowers)

router.get('/followers/:id', getFollower)

router.post('/followers', createFollower)

router.patch('/followers/:id', updateFollower)

router.delete('/followers/:id', deleteFollower)


export default router
import {Router} from 'express'
import { getNotifications, getNotification, createNotification, updateNotification, deleteNotification } from '../controllers/notification.controller.js'


const router = Router()

/**
 * When one of the ingredients endpoints is reached, these functions trigger the corresponding function
 */
router.get('/notifications', getNotifications)

router.get('/notifications/:id', getNotification)

router.post('/notifications', createNotification)

router.patch('/notifications/:id', updateNotification)

router.delete('/notifications/:id', deleteNotification)


export default router
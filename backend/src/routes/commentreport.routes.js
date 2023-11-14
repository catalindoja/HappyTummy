import {Router} from 'express'
import { getCommentReports, getCommentReport, createCommentReport, updateCommentReport, deleteCommentReport } from '../controllers/commentreport.controller.js'


const router = Router()

/**
 * When one of the allergies endpoints is reached, these functions trigger the corresponding function
 */
router.get('/commentreports', getCommentReports)

router.get('/commentreports/:id', getCommentReport)

router.post('/commentreports', createCommentReport)

router.patch('/commentreports/:id', updateCommentReport)

router.delete('/commentreports/:id', deleteCommentReport)


export default router
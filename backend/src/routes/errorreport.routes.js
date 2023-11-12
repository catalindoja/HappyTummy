import {Router} from 'express'
import { getErrorReports, getErrorReport, createErrorReport, updateErrorReport, deleteErrorReport } from '../controllers/errorreport.controller.js'


const router = Router()

/**
 * When one of the allergies endpoints is reached, these functions trigger the corresponding function
 */
router.get('/errorreports', getErrorReports)

router.get('/errorreports/:id', getErrorReport)

router.post('/errorreports', createErrorReport)

router.patch('/errorreports/:id', updateErrorReport)

router.delete('/errorreports/:id', deleteErrorReport)


export default router
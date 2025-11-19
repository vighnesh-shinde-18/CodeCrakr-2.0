import express from 'express'
import { uploadProblem, fetchUserProblem } from '../controllers/Problem.Controller.js'
import verifyJwt from '../middlewares/Auth.Middleware.js'

const router = express.Router()

router.post('/upload',verifyJwt,uploadProblem)
router.post('/user-uploads',verifyJwt,fetchUserProblem)
export default router;
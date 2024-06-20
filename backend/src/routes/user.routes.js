import express from 'express'
import { UserController } from '../controllers/user.controller.js'

export const userRouter = express.Router()

userRouter.post('/user', UserController.addUser)
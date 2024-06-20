import express from 'express'
import { EventController } from '../controllers/event.controller.js'

export const eventRouter = express.Router()

eventRouter.get('/events', EventController.getEvents)
eventRouter.get('/events/:userId', EventController.getEventsOfUser)
eventRouter.get('/event/:id', EventController.getEvent)
eventRouter.post('/event', EventController.postEvent)
eventRouter.put('/event/:id', EventController.putEvent)
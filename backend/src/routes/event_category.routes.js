import express from 'express'
import { EventCategoryController } from '../controllers/event_category.controller.js'

export const eventCategoryRouter = express.Router()

eventCategoryRouter.get('/categories', EventCategoryController.getCategories)
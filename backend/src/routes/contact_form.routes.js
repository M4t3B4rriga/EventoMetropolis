import express from 'express'
import { ContactFormController } from '../controllers/contact_form.controller.js'

export const contactFormRouter = express.Router()

contactFormRouter.post('/contact_form', ContactFormController.postContactForm)
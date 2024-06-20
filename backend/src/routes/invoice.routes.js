import express from 'express'
import { InvoiceController } from '../controllers/invoice.controller.js'


export const invoiceRouter = express.Router()

invoiceRouter.post('/invoice', InvoiceController.postInvoice)
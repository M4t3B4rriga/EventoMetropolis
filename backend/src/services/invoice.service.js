import pug from 'pug'
import path from 'path'
import { NodemailerService } from './nodemailer.service.js';
import { InvoiceFormModel } from '../models/invoice_form.model.js';
import { InvoiceDTO } from '../dto/invoice.dto.js';
import { SupabaseService } from './supabase.service.js';
import { InvoiceModel } from '../models/invoice.model.js';

export class InvoiceService {
    static #templates = path.join(import.meta.dirname, '../templates/')
    static #assets = path.join(import.meta.dirname, '../assets/')
    static #img = path.join(this.#assets, 'img/')
    static #dbTable = 'invoices'
    static #columnsTable = {
        'event_id': '',
        'client_id': '',
        'invoice_ticket_price': '',
        'invoice_tickets': ''
    }

    /**
     * 
     * @param {InvoiceDTO} invoice 
     */
    static async add(invoice) {
        const row = this.#columnsTable
        row.event_id = invoice.eventId
        row.client_id = invoice.clientId
        row.invoice_ticket_price = invoice.ticketPrice
        row.invoice_tickets = invoice.tickets

        const [data] = await SupabaseService.upload(this.#dbTable, [row])

        const invoiceModel = new InvoiceModel(data.invoice_id, data.event_id, data.client_id, data.event_date, data.invoice_ticket_price, data.invoice_tickets)

        return invoiceModel
    }

    /**
     * 
     * @param {InvoiceFormModel} invoice 
     */
    static sendEmail(invoice) {
        const renderPugData = pug.compileFile(path.join(this.#templates, 'invoice.pug'))
        const html = renderPugData(invoice)

        const logo = 'logo.png'
        NodemailerService.sendMail({
            from: `EventMetropolis <${process.env.EMAIL_USER}>`,
            to: invoice.clientEmail,
            subject: `Factura de compra ${invoice.id}`,
            html,
            attachments: [
                {
                    filename: logo,
                    path: path.join(this.#img, logo),
                    cid: 'logo'
                }
            ]
        });
    }
}
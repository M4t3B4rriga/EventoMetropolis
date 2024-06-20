import path from 'path'
import pug from 'pug'
import { NodemailerService } from "./nodemailer.service.js"
import { ContactFormModel } from '../models/contact_form.model.js'

export class ContactFormService {
    static #templates = path.join(import.meta.dirname, '../templates/')
    static #assets = path.join(import.meta.dirname, '../assets/')
    static #img = path.join(this.#assets, 'img/')

    /**
     * @param {ContactFormModel} contactForm 
     */
    static sendContactFormEmail(contactForm) {
        const renderPugData = pug.compileFile(path.join(this.#templates, 'contact_form.pug'))
        const html = renderPugData(contactForm)

        const logo = 'logo.png'
        NodemailerService.sendMail({
            from: `EventMetropolis <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'Formulario de contacto',
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
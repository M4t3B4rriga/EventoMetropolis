import { useState } from "react"
import { ContactFormModel } from "../../../backend/src/models/contact_form.model"
import { ResponseModel } from "../../../backend/src/models/response.model"
import { FormMessage } from "./FormMessage"
import { FormMessageStatus } from "../enums/FormMessageStatus"

export function ContactForm() {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(FormMessageStatus.successful)
    const [isBeingMessageSend, setIsBeingMessageSend] = useState(false)

    const resetForm = () => {
        if (status === FormMessageStatus.successful)
            document.getElementById('contactForm').reset()
        
        setMessage('')
        setIsBeingMessageSend(false)
        setStatus(FormMessageStatus.successful)
    }

    /**
     * 
     * @param {Event} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault()

        const { contactName, contactPhoneNumber, contactEmail, contactMessage } = Object.fromEntries(new FormData(event.target))
        const contactForm = new ContactFormModel(contactName, contactPhoneNumber, contactEmail, contactMessage)

        /**
         * @type {ResponseModel}
         */
        const responseModel = await fetch('http://localhost:3000/contact_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactForm)
        }).then(response => response.json())

        if (!responseModel.response) {
            setStatus(FormMessageStatus.error)
            setMessage('Campos incompletos o servicio inhabilitado')
        } else {
            setMessage('Mensaje enviado exitosamente')
        }

        setIsBeingMessageSend(true)
    }

    return (
        <form id="contactForm" className="form section" onSubmit={handleSubmit}>
            <h2 className="form__title">Dí Hola!</h2>
            <div className="form__group">
                <label htmlFor="contactName" className="label">Nombre completo</label>
                <input type="text" name="contactName" id="contactName" placeholder="John Doe" className="input input--block" />
            </div>
            <div className="form__group">
                <label htmlFor="contactPhoneNumber" className="label">Número celular</label>
                <input type="text" name="contactPhoneNumber" id="contactPhoneNumber" placeholder="0982583012" className="input input--block" />
            </div>
            <div className="form__group">
                <label htmlFor="contactEmail" className="label">Correo electrónico</label>
                <input type="email" name="contactEmail" id="contactEmail" placeholder="johndoe@email.com" className="input input--block" />
            </div>
            <div className="form__group">
                <label htmlFor="contactMessage" className="label">Mensaje</label>
                <textarea name="contactMessage" id="contactMessage" cols="30" rows="10" className="textarea" placeholder="Saludos,..."></textarea>
            </div>
            <button id="contactFormSubmit" className="button button--solid button--bordered button--wide" disabled={isBeingMessageSend}>Enviar</button>
            <FormMessage message={message} status={status} reset={resetForm} durationMillis={3000} />
        </form>
    )
}
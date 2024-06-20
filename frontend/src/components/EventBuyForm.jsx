import { useEffect, useState } from "react";
import { EventModel } from "../../../backend/src/models/event.model";
import { ResponseModel } from "../../../backend/src/models/response.model";
import { FormMessage } from "./FormMessage";
import { FormMessageStatus } from "../enums/FormMessageStatus";
import { useNavigate } from "react-router-dom";
import { PaypalCheckoutButton } from "./PaypalCheckoutButton";
import { InvoiceDTO } from "../../../backend/src/dto/invoice.dto";
import { ClientModel } from "../../../backend/src/models/client.model";
import TermsAndconditions from '../assets/docs/Terms&Conditions.pdf'

/**
 * 
 * @param {{
 *  eventModel: EventModel
 * }} param0 
 * @returns 
 */
export function EventBuyForm({ eventModel }) {
    const navigate = useNavigate()
    const [eventId, setEventId] = useState(eventModel.id)
    const [clientId, setClientId] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [ticketPrice, setTicketPrice] = useState(eventModel.ticketPrice)
    const [ticketsQuantity, setTicketsQuantity] = useState(0)
    const [totalPurchase, setTotalPurchase] = useState(0)
    const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(FormMessageStatus.successful)
    const [enableSubmit, setEnableSubmit] = useState(true)

    const resetForm = () => {
        if (status === FormMessageStatus.successful) {
            document.getElementById('eventBuyForm').reset()
            navigate('/home')
        }

        setMessage('')
        setEnableSubmit(true)
        setStatus(FormMessageStatus.successful)
    }

    useEffect(() => {
        const newTotalPurchase = ticketsQuantity * ticketPrice
        setTotalPurchase(newTotalPurchase)
    }, [ticketsQuantity])

    useEffect(() => {
        setEnableSubmit(canSubmit())
    }, [eventId, clientId, name, phoneNumber, email, ticketsQuantity, acceptTermsAndConditions])

    /**
     * 
     * @param {Event} event 
     * @param {() => void} setChange 
     */
    const handleInputChange = (event, setChange) => {
        setChange(event.target.value)
    }

    const handleCheckBoxChange = (state, setChange) => {
        setChange(!state)
    }

    const canSubmit = () => {
        return clientId.length > 0 && name.length > 0 && phoneNumber.length > 0 && email.length > 0 && ticketsQuantity > 0 && acceptTermsAndConditions
    }

    const sendInvoice = async () => {
        const client = new ClientModel(clientId, name, phoneNumber, email)
        const invoice = new InvoiceDTO(eventId, clientId, ticketPrice, Number(ticketsQuantity))
        console.log(client, invoice)

        /* *
         * @type {ResponseModel}
         */
        const responseModel = await fetch('http://localhost:3000/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([client, invoice])
        }).then(response => response.json())

        if (!responseModel.response) {
            setStatus(FormMessageStatus.error)
            setMessage('No se pudo realizar su pago, asegurese de llenar todos los campos del formulario')
        } else {
            setMessage('La factura de su compra se ha enviado a su correo')
        }

        setEnableSubmit(false)
    }

    return (
        <form className="section form" id="eventBuyForm">
            <h2 className="form__title">Comprar boleto(s)</h2>
            <div className="form__group">
                <label htmlFor="clientId" className="label">Cédula</label>
                <input type="text" name="clientId" id="clientId" value={clientId} onChange={(event) => handleInputChange(event, setClientId)} placeholder="1752937712" className="input input--block" required />
            </div>
            <div className="form__group">
                <label htmlFor="clientName" className="label">Nombre completo</label>
                <input type="text" name="clientName" id="clientName" value={name} onChange={(event) => handleInputChange(event, setName)} placeholder="John Doe" className="input input--block" required />
            </div>
            <div className="form__group">
                <label htmlFor="clientPhoneNumber" className="label">Número celular</label>
                <input type="text" name="clientPhoneNumber" id="clientPhoneNumber" value={phoneNumber} onChange={(event) => handleInputChange(event, setPhoneNumber)} placeholder="0986237105" className="input input--block" required />
            </div>
            <div className="form__group">
                <label htmlFor="clientEmail" className="label">Correo electrónico <span className="info">(Enviaremos la factura a este correo)</span></label>
                <input type="text" name="clientEmail" id="clientEmail" value={email} onChange={(event) => handleInputChange(event, setEmail)} placeholder="johndoe@email.com" className="input input--block" required />
            </div>

            <div className="form__group">
                <label htmlFor="eventTicketPrice" className="label label--inline-block">Precio</label>
                <input type="text" name="eventTicketPrice" id="eventTicketPrice" value={`$${ticketPrice}`} step={0.01} className="input input--disabled" disabled />
            </div>

            <div className="form__group">
                <label className="label label--inline-block">Cantidad</label>
                <input type="number" value={ticketsQuantity} onChange={(event) => handleInputChange(event, setTicketsQuantity)} min={1} max={eventModel.tickets} step={1} className="input" required />
            </div>

            <div className="form__group">
                <label className="label label--inline-block">Total</label>
                <input type="text" value={`$${totalPurchase}`} step={0.01} className="input input--disabled" disabled />
            </div>

            <div className="form__group">
                <input type="checkbox" name="acceptTermsAndConditions" id="acceptTermsAndConditions" checked={acceptTermsAndConditions}
                    onClick={() => handleCheckBoxChange(acceptTermsAndConditions, setAcceptTermsAndConditions)} onChange={() => { }} className="checkbox" required />
                <label htmlFor="acceptTermsAndConditions" className="label label--inline">Acepto los <a href={TermsAndconditions} target='_blank' className='link'>Términos y Condiciones</a></label>
            </div>

            <div className="form__group">
                {enableSubmit && <PaypalCheckoutButton description={eventModel.title} price={totalPurchase} onApprove={sendInvoice} />}
            </div>

            <FormMessage message={message} status={status} reset={resetForm} durationMillis={2000} />
        </form>
    )
}
import { useContext, useEffect, useState } from 'react'
import { FormMessageStatus } from '../enums/FormMessageStatus'
import { FormMessage } from './FormMessage'
import { EventDTO, EventPostDTO, EventPutDTO } from '../../../backend/src/dto/event.dto'
import { FormMode } from '../enums/FormMode'
import { SelectCategories } from './SelectCategories'
import { SupabaseService } from '../services/supabase.service'
import { UserModel } from '../../../backend/src/models/user.model'
import { EventCategoryModel } from '../../../backend/src/models/event_category.model'
import { ResponseModel } from '../../../backend/src/models/response.model'
import { EventModel } from '../../../backend/src/models/event.model'
import DefaultPoster from '../assets/img/default_poster.png'
import Close from '../assets/svg/close_icon.svg'
import { PageContext } from '../context/PageProvider'

/**
 * 
 * @param {{
 *  show: boolean,
 *  updateShow: (showForm: boolean) => void,
 *  mode: FormMode,
 *  updateEvents: (newEvent: EventDTO) => void,
 *  eventId: number
 * }} param0 
 * @returns 
 */
export function EventFormModal({ show, updateShow, mode, updateEvents, eventId }) {
    /**
     * @type [event: EventModel, React.Dispatch<React.SetStateAction<EventModel>>]
     */
    const [event, setEvent] = useState(undefined)
    const [className, setClassName] = useState(`form event-form ${show ? 'event-form--show' : ''}`)
    const [posterForm, setPosterForm] = useState(DefaultPoster)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(FormMessageStatus.successful)
    const [blockSubmit, setBlockSubmit] = useState(false)
    const [title, setTitle] = useState('Crear')
    const [textButton, setTextButton] = useState('Crear')
    const { user } = useContext(PageContext)

    const getEvent = async () => {

        /**
         * @type {ResponseModel}
         */
        const responseModel = await fetch(`http://localhost:3000/event/${eventId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())

        if (!responseModel.response)
            return

        const eventData = responseModel.data.event
        const userData = responseModel.data.user

        const event = EventModel.parseFromJson(eventData)
        const user = UserModel.parseFromJson(userData)

        return { event, user }
    }

    useEffect(() => {
        setClassName(`form event-form ${show ? 'event-form--show' : ''}`)
        setTitle(mode === FormMode.add ? 'Crear' : mode === FormMode.update ? 'Actualizar' : 'Detalles del')
        setTextButton(mode === FormMode.add ? 'Crear' : mode === FormMode.update ? 'Actualizar' : ' ')

        if (show && eventId && (mode === FormMode.view || mode === FormMode.update)) {
            getEvent().then(({ event }) => {
                setEvent(event)
                setPosterForm(event.hasPoster ? SupabaseService.getImage(event.userId, event.id) : DefaultPoster)
            })
        }

    }, [show])

    const handleCloseClick = () => {
        document.getElementById('eventFormModal').reset()
        updateShow(false)
        setClassName('form event-form')
        setMessage('')
        setBlockSubmit(false)
        setStatus(FormMessageStatus.successful)
        setPosterForm(DefaultPoster)
    }

    const resetForm = () => {
        if (status === FormMessageStatus.error) {
            setBlockSubmit(false)
            setStatus(FormMessageStatus.successful)
            setMessage('')
            return
        }

        handleCloseClick()
    }

    /**
     * 
     * @param {Event} event 
     */
    const handlePosterChange = (event) => {
        if (!event.target.files.length)
            return

        setPosterForm(URL.createObjectURL(event.target.files[0]))
    }

    const addEvent = async ({ categories, eventAddress, eventDate, eventDescription, eventPoster, eventTicketPrice, eventTickets, eventTitle }) => {
        const eventToSend = new EventPostDTO(user.id, new EventCategoryModel(categories), eventTitle, eventDescription, new Date(eventDate), posterForm !== DefaultPoster, eventAddress, eventTicketPrice, eventTickets)

        /**
         * @type {ResponseModel}
         */
        const responseModel = await fetch('http://localhost:3000/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventToSend)
        }).then(response => response.json())

        if (!responseModel.response)
            return undefined

        const eventJson = responseModel.data
        const newEvent = EventDTO.parseFromJson(eventJson)

        if (newEvent.hasPoster)
            SupabaseService.uploadImage(user.id, newEvent.id, eventPoster)

        return newEvent
    }

    const updateEvent = async ({ categories, eventAddress, eventDescription, eventPoster, eventTicketPrice, eventTickets, eventTitle }) => {
        const eventToUpdate = new EventPutDTO(new EventCategoryModel(categories), eventTitle, eventDescription, eventPoster !== DefaultPoster, eventAddress, eventTicketPrice, eventTickets)

        /**
         * @type {ResponseModel}
         */
        const responseModel = await fetch(`http://localhost:3000/event/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventToUpdate)
        }).then(response => response.json())

        if (!responseModel.response)
            return undefined

        const eventJson = responseModel.data
        const newEvent = EventDTO.parseFromJson(eventJson)

        if (newEvent.hasPoster && eventPoster.name.length)
            SupabaseService.uploadImage(user.id, newEvent.id, eventPoster)

        return newEvent
    }

    const convertToDateTimeLocalString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
      
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      }

    /**
     * 
     * @param {Event} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = Object.fromEntries(new FormData(event.target))

        let newEvent = undefined

        if (mode === FormMode.add)
            newEvent = await addEvent(data)

        if (mode === FormMode.update)
            newEvent = await updateEvent(data)

        if (!newEvent) {
            setStatus(FormMessageStatus.error)
            setMessage('Error: campos incompletos u ocurrio un error inesperado')
        } else {
            setMessage('Acción completada exitosamente')
            updateEvents(newEvent)
            setBlockSubmit(true)
        }

    }

    return (
        <form id='eventFormModal' className={className} onSubmit={handleSubmit}>
            <button type='button' className='button-icon event-form__close-button' onClick={handleCloseClick}>
                <img src={Close} alt="close button" className="icon-larger" />
            </button>
            <h2 className="form__title">{title} evento</h2>
            <div className="form__group">
                <label htmlFor="eventTitle" className="label">Título</label>
                <input type="text" id="eventTite" name="eventTitle" className="input input--block" defaultValue={event && event.title} readOnly={mode === FormMode.view} required />
            </div>
            <div className="form__group">
                <label htmlFor="eventDescription" className="label">Descripción</label>
                <textarea type="text" id="eventDescription" name="eventDescription" cols="30" rows="10" className="textarea" defaultValue={event && event.description} readOnly={mode === FormMode.view} required />
            </div>
            <div className="form__group">
                <label htmlFor="eventAddress" className="label">Dirección</label>
                <input type="text" id="eventAddress" name="eventAddress" className="input input--block" defaultValue={event && event.address} readOnly={mode === FormMode.view} required />
            </div>
            <div className="form__group row">
                <input type="datetime-local" name="eventDate" id="eventDate" className="input column" defaultValue={event && convertToDateTimeLocalString(event.date)} readOnly={mode === FormMode.view || mode === FormMode.update} required />
                <SelectCategories className='column' defaultValue={event && event.category} disabled={mode === FormMode.view} />
            </div>

            <div className="form__group row">
                <div className="column">
                    <label htmlFor="eventTickets" className="label">Boletos</label>
                    <input type="number" name="eventTickets" id="eventTickets" className="input input--block" min={1} max={1000} step={1} defaultValue={event && event.tickets} readOnly={mode === FormMode.view} required />
                </div>
                <div className="column">
                    <label htmlFor='eventTicketPrice' className="label">Precio</label>
                    <input type="number" name="eventTicketPrice" id="eventTicketPrice" min={0} max={100} step={0.01} className="input input--block" defaultValue={event && event.ticketPrice} readOnly={mode === FormMode.view} required />
                </div>
            </div>

            <div className="form__group">
                <label htmlFor="eventPoster" className='label'>Poster</label>
                <img src={posterForm} alt="event default poster" className='img event-form__poster' />
                <input type="file" id='eventPoster' name='eventPoster' onChange={handlePosterChange} className='input--block' accept='image/jpeg, image/png' disabled={mode === FormMode.view} />
            </div>

            {
                mode !== FormMode.view && <div className="form__group">
                    <button className='button button--solid button--bordered button--wide' disabled={blockSubmit || mode === FormMode.view}>{textButton} evento</button>
                </div>
            }

            <FormMessage message={message} status={status} reset={resetForm} durationMillis={1000} />
        </form>
    )
}
import { useEffect, useState } from "react"
import { Error } from "./Error"
import { EventFormModal } from "./EventFormModal"
import { EventDTO } from "../../../backend/src/dto/event.dto"
import { SupabaseService } from "../services/supabase.service"
import PlusCircle from '../assets/svg/plus_circle.svg'
import HappyFace from '../assets/svg/happy_face.svg'
import DefaultPoster from '../assets/img/default_poster.png'
import { FormMode } from "../enums/FormMode"

/**
 * 
 * @param {{
 *  events: [EventDTO],
 *  updateEvents: (newEvent: EventDTO) => void
 * }} param0 
 * @returns 
 */
export function EventsList({ events, updateEvents }) {
    const [hasEvents, setHasEvents] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modeForm, setModeForm] = useState(FormMode.view)
    const [eventIdToLoad, setEventIdToLoad] = useState(undefined)

    useEffect(() => {
        setHasEvents(events && events.length > 0)
    }, [events])

    if (!hasEvents)
        return (
            <div className="error-section">
                <Error iconImg={HappyFace}>
                    Crear tu primer evento haciendo click en <img src={PlusCircle} alt="plus circle button" className="icon-small" />
                </Error>
            </div>
        )
    
    /**
     * 
     * @param {EventDTO} event 
     * @returns 
     */
    const getImage = (event) => {
        return event.hasPoster ? SupabaseService.getImage(event.userId, event.id) : DefaultPoster
    }

    const showViewForm = (eventId) => {
        setEventIdToLoad(eventId)
        setModeForm(FormMode.view)
        setShowModal(true)
    }

    const showUpdateForm = (eventId) => {
        setEventIdToLoad(eventId)
        setModeForm(FormMode.update)
        setShowModal(true)
    }

    return (
        <>
            <div className="events-list">
                {
                    events.map(event => (
                        <article key={event.id} className="event-item">
                            <img src={getImage(event)} alt={event.title} className="img" />
                            <header>
                                <h3 className="event-item__title">{event.title[0].toLocaleUpperCase() + event.title.slice(1)}</h3>
                                <address className='event-card__address'>{event.address}</address>
                                <time dateTime={event.date} className='event-card__date'>{event.date.toLocaleTimeString('es-ES')}</time>
                                <time dateTime={event.date} className='event-card__date'>{event.date.toLocaleDateString('es-ES')}</time>
                            </header>
                            <footer className="event-item__footer">
                                <button className="button button--solid button--bordered" onClick={() => showViewForm(event.id)}>Ver detalles</button>
                                <button className="button button--solid button--bordered" onClick={() => showUpdateForm(event.id)}>Editar</button>
                            </footer>
                        </article>
                    ))
                }
            </div>
            <EventFormModal show={showModal} updateShow={setShowModal} updateEvents={updateEvents} mode={modeForm} eventId={eventIdToLoad} />
        </>
    )
}
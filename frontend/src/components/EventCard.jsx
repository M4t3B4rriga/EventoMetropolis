import { Link } from 'react-router-dom'
import DefaultPoster from '../assets/img/default_poster.png'
import { EventDTO } from '../../../backend/src/dto/event.dto'
import { useEffect, useState } from 'react'
import { SupabaseService } from '../services/supabase.service'

/**
 * 
 * @param {{
 *  event: EventDTO
 * }} param0 
 * @returns 
 */
export function EventCard({ event }) {
    const [poster, setPoster] = useState(undefined)

    useEffect(() => {
        setPoster(event.hasPoster ? SupabaseService.getImage(event.userId, event.id) : DefaultPoster)
    }, [])

    return (
        <article className='event-card'>
            <img src={poster} alt={event.title} className='img event-card__poster' />

            <div className='event-card__body'>
                <h4 className='event-card__title'>{event.title[0].toLocaleUpperCase() + event.title.slice(1)}</h4>
                <address className='event-card__address'>{event.address}</address>
                <time dateTime={event.date} className='event-card__date'>{event.date.toLocaleTimeString('es-ES')}</time>
                <time dateTime={event.date} className='event-card__date'>{event.date.toLocaleDateString('es-ES')}</time>
                <footer className='event-card__footer'>
                    <Link to={`/event/${event.id}`} className='link event-card__link'>Leer más</Link>
                </footer>
            </div>
        </article>
    )
}
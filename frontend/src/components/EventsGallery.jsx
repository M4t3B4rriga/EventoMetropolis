import { Error } from './Error'
import { EventCard } from './EventCard'
import SadFace from '../assets/svg/sad_face.svg'
import { EventDTO } from '../../../backend/src/dto/event.dto'

/**
 * 
 * @param {{
 * events: [EventDTO]
 * }} props 
 * @returns 
 */
export function EventsGallery({ events }) {
    
    if (!events || !events.length)
        return (
            <div className='error-section'>
                <Error iconImg={SadFace}>Oops, no se han encontrado eventos, lo siento.</Error>
            </div>
        )

    return (
        <div className='events-gallery'>
            {
                events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))
            }
        </div>
    )
}
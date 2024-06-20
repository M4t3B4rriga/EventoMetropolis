import { useEffect, useState } from 'react'
import { EventsGallery } from './EventsGallery'
import { EventsDisplayer } from './EventsDisplay'
import { EventsFilter } from './EventsFilter'
import { EventDTO } from '../../../backend/src/dto/event.dto'
import { ResponseModel } from '../../../backend/src/models/response.model'

export function Events() {
    const nextEventsToShow = 8
    /**
     * @type [[EventDTO], React.Dispatch<React.SetStateAction<[EventDTO]>>]
     */
    const [events, setEvents] = useState([])
    const [hasMoreEvents, setHasMoreEvents] = useState(false)
    const [eventsForShow, setEventsForShow] = useState([])

    const getEvents = async () => {

        /**
         * @type {ResponseModel}
         */
        const responseModel = await fetch('http://localhost:3000/events', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())

        const events = responseModel.data.map(json => EventDTO.parseFromJson(json))

        return events
    }

    useEffect(() => {
        getEvents().then(events => {
            setEvents(events)
            setHasMoreEvents(events?.length > nextEventsToShow)
            setEventsForShow(events.slice(0, nextEventsToShow))
        })

    }, [])

    const showMoreEvents = () => {
        const newEventsForShow = events.slice(0, eventsForShow.length + nextEventsToShow)
        setEventsForShow(newEventsForShow)
    }

    const resetEventsForShow = () => {
        setEventsForShow(events.slice(0, nextEventsToShow))
        setHasMoreEvents(true)
    }

    useEffect(() => {
        if (!eventsForShow.length || eventsForShow.length >= events.length)
            setHasMoreEvents(false)
    }, [eventsForShow])

    return (
        <section className='section events'>
            <EventsFilter originalEvents={events} updateEvents={setEventsForShow} resetEvents={resetEventsForShow} />
            <EventsGallery events={eventsForShow} />
            <EventsDisplayer show={hasMoreEvents} clickHandler={showMoreEvents} />
        </section>
    )
}
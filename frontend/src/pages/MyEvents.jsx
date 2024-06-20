import { useContext, useEffect, useState } from "react";
import { EventsList } from "../components/EventsList";
import { PageContext } from "../context/PageProvider";
import { EventFormModal } from "../components/EventFormModal";
import { ResponseModel } from "../../../backend/src/models/response.model";
import { UserModel } from "../../../backend/src/models/user.model";
import { EventDTO } from "../../../backend/src/dto/event.dto";
import PlusCircle from '../assets/svg/plus_circle.svg';
import { FormMode } from "../enums/FormMode";

export function MyEvents() {
    /**
     * @type {{
     *  setPath: (path: string) => void
     *  user: UserModel
     * }}
     */
    const { setPath, user } = useContext(PageContext)
    const [showModal, setShowModal] = useState(false)
    /**
     * @type [[EventDTO], React.Dispatch<React.SetStateAction<[EventDTO]>>]
     */
    const [events, setEvents] = useState([])

    const getEventsOfUser = async () => {

        /**
         * @type {ResponseModel}
         */
        const responseModel = await fetch(`http://localhost:3000/events/${user.id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())

        const events = responseModel.data.map(json => EventDTO.parseFromJson(json))

        return events
    }

    useEffect(() => {
        setPath('my_events')
        getEventsOfUser().then(events => {
            setEvents(events)
        })
    }, [])

    const handleClick = () => {
        setShowModal(true)
    }

    /**
     * 
     * @param {EventDTO} newEvent 
     */
    const addEvent = (newEvent) => {
        let newEvents = [...events, newEvent]
        setEvents(newEvents)
    }

    /**
     * 
     * @param {EventDTO} updatedEvent 
     */
    const updateEvents = (updatedEvent) => {
        const newEvents = events.map(event => {
            if (event.id !== updatedEvent.id)
                return event

            return updatedEvent
        })
        setEvents(newEvents)
    }

    return (
        <section className="section my_events">
            <header>
                <h2>Mis Eventos</h2>
            </header>

            <EventsList events={events} updateEvents={updateEvents} />
            <EventFormModal show={showModal} updateShow={setShowModal} mode={FormMode.add} updateEvents={addEvent} />

            <footer className="my_events__footer">
                <button onClick={handleClick} className="button-icon my_events__create"><img src={PlusCircle} alt="plus circle button" className="icon-larger" /></button>
            </footer>

        </section>
    )
}
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EventModel } from "../../../backend/src/models/event.model"
import { EventDetails } from "../components/EventDetails"
import { EventBuyForm } from "../components/EventBuyForm"
import { ResponseModel } from "../../../backend/src/models/response.model"
import { UserModel } from "../../../backend/src/models/user.model"

export function EventDetail() {
    const { id } = useParams()
    const [event, setEvent] = useState(undefined)
    const [user, setUser] = useState(undefined)

    const getEvent = async () => {

        /**
         * @type {ResponseModel}
         */
        const responseModel = await fetch(`http://localhost:3000/event/${id}`, {
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
        getEvent().then(({ event, user }) => {
            setEvent(event)
            setUser(user)
        })
    }, [])

    if (!event)
        return

    return (
        <>
            <EventDetails event={event} user={user} />
            <EventBuyForm eventModel={event} user={user} />
        </>
    )
}
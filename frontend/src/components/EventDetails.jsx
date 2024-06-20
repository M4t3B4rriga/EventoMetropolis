import { EventModel } from "../../../backend/src/models/event.model";
import { EventDetailCard } from "./EventDetailCard";
import { useEffect, useState } from "react";
import { SupabaseService } from "../services/supabase.service";
import DefaultPoster from '../assets/img/default_poster.png'

/**
 * 
 * @param {{
 *  event: EventModel
 * }} param0 
 * @returns 
 */
export function EventDetails({ event, user }) {
    const [poster, setPoster] = useState(undefined)

    useEffect(() => {
        setPoster(event.hasPoster ? SupabaseService.getImage(event.userId, event.id) : DefaultPoster)
    }, [])

    return (
        <section className="section">
            <div className="row">

                <img src={poster} alt={event.title} className="img column" />

                <div className="column column--align-right">
                    <EventDetailCard event={event} user={user} />
                </div>
            </div>

            <footer>
                <h3>Descripción</h3>
                {event.description}
            </footer>
        </section>
    )
}
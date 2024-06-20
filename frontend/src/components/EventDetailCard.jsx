import { EventModel } from "../../../backend/src/models/event.model";
import { UserModel } from "../../../backend/src/models/user.model";

/**
 * 
 * @param {{
 *  event: EventModel
 *  user: UserModel
 * }} param0 
 * @returns 
 */
export function EventDetailCard({ event, user }) {

    return (
        <section className="event-detail-card">
            <h3>{event.title[0].toLocaleUpperCase() + event.title.slice(1)}</h3>

            <h4>Publicador</h4>
            <p>{user.email}</p>
            
            <h4>Lugar</h4>
            <p>{event.address}</p>

            <h4>Fecha</h4>
            <p>{event.date.toLocaleDateString('es-ES')}</p>

            <h4>Hora</h4>
            <p>{event.date.toLocaleTimeString('es-ES')}</p>

            <h4>Boleto</h4>
            <p>${event.ticketPrice}</p>

            <a href="#eventBuyForm" className="button button--solid button--bordered button--wide">Comprar</a>
        </section>
    )
}
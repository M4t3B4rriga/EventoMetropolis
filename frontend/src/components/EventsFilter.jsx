import { EventDTO } from "../../../backend/src/dto/event.dto"
import { SelectCategories } from "./SelectCategories"

/**
 * 
 * @param {{
 *  originalEvents: [EventDTO],
 *  updateEvents: (newEvents: [EventDTO]) => void,
 *  resetEvents: () => void
 * }} param0 
 * @returns 
 */
export function EventsFilter({ originalEvents, updateEvents, resetEvents }) {
    if (!originalEvents?.length)
        return

    /**
     * 
     * @param {Event} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault()

        /**
         * @type {{
         *  titleFilter: string,
         *  dateFilter: string,
         *  categories: string
         * }}
         */
        const { titleFilter, dateFilter, categories } = Object.fromEntries(new FormData(event.target))

        const [year, month, day] = dateFilter.split('-').map(value => Number(value))
        const inputDateFormatted = new Date(year, month - 1, day).toLocaleDateString()

        const eventsFilter = originalEvents.filter(event => {
            const eventDateFormatted = new Date(event.date).toLocaleDateString()

            return (event.title.toLocaleLowerCase().includes(titleFilter.toLocaleLowerCase()) &&
                event.category.name === categories) ||
                eventDateFormatted === inputDateFormatted
        })

        updateEvents(eventsFilter)
    }

    const handleReset = () => {
        resetEvents()
    }

    return (
        <form id="filterForm" className="filter" onSubmit={handleSubmit} onReset={handleReset}>
            <input type="text" placeholder="Concierto de rock, metalfest, festival..." name="titleFilter" id="titleFilter" className="input" />
            <input type="date" name="dateFilter" id="dateFilter" className="input" />
            <SelectCategories />
            <button type="submit" className="button button--solid button--bordered">Buscar</button>
            <button type="reset" className="button button--solid button--bordered">Reiniciar</button>
        </form>
    )
}
export class InvoiceModel {
    /**
     * 
     * @param {number} id 
     * @param {number} eventId 
     * @param {string} clientId 
     * @param {Date} date 
     * @param {number} ticketPrice 
     * @param {number} tickets 
     */
    constructor(id, eventId, clientId, date, ticketPrice, tickets) {
        this.id = id
        this.eventId = eventId
        this.clientId = clientId
        this.date = date
        this.ticketPrice = ticketPrice
        this.tickets = tickets
    }
}
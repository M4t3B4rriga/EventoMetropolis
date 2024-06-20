export class InvoiceDTO {
    /**
     *  
     * @param {number} eventId 
     * @param {string} clientId 
     * @param {Date} date 
     * @param {number} ticketPrice 
     * @param {number} tickets 
     */
    constructor(eventId, clientId, ticketPrice, tickets) {
        this.eventId = eventId
        this.clientId = clientId
        this.ticketPrice = ticketPrice
        this.tickets = tickets
    }
}
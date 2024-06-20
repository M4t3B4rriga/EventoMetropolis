export class InvoiceFormModel {
    
    /**
     * 
     * @param {number} id 
     * @param {string} clientId 
     * @param {string} clientName 
     * @param {string} clientEmail 
     * @param {string} clientPhoneNumber 
     * @param {string} userEmail 
     * @param {string} eventTitle 
     * @param {string} eventAddress 
     * @param {Date} eventDate 
     * @param {number} ticketPrice 
     * @param {number} ticketsBought 
     */
    constructor(id, clientId, clientName, clientEmail, clientPhoneNumber, userEmail, eventTitle, eventAddress, eventDate, ticketPrice, ticketsBought) {
        this.id = id
        this.clientId = clientId
        this.clientName = clientName
        this.clientEmail = clientEmail
        this.clientPhoneNumber = clientPhoneNumber
        this.userEmail = userEmail
        this.eventTitle = eventTitle
        this.eventAddress = eventAddress
        this.eventDate = eventDate
        this.ticketPrice = ticketPrice
        this.ticketsBought = ticketsBought
        this.total = ticketPrice * ticketsBought
    }
}
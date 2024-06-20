import { EventCategoryModel } from "./event_category.model.js"

export class EventModel {

    /**
     * 
     * @param {number} id 
     * @param {string} userId 
     * @param {EventCategoryModel} category 
     * @param {string} title 
     * @param {string} description 
     * @param {Date} date 
     * @param {boolean} hasPoster 
     * @param {string} address 
     * @param {boolean} isActive 
     * @param {number} ticketPrice 
     * @param {number} tickets 
     */
    constructor(id, userId, category, title, description, date, hasPoster, address, isActive, ticketPrice, tickets) {
        this.id = id
        this.userId = userId
        this.category = category
        this.title = title
        this.description = description
        this.date = date
        this.hasPoster = hasPoster
        this.address = address
        this.isActive = isActive
        this.ticketPrice = ticketPrice
        this.tickets = tickets
    }

    static parseFromJson({
        id,
        userId,
        category: {
            name
        },
        title,
        description,
        date,
        hasPoster,
        address,
        isActive,
        ticketPrice,
        tickets
    }) {
        return new EventModel(id, userId, new EventCategoryModel(name), title, description, new Date(date), hasPoster, address, isActive, ticketPrice, tickets)
    }
}
import { EventCategoryModel } from "../models/event_category.model.js"

export class EventDTO {

    /**
     * 
     * @param {number} id 
     * @param {string} userId 
     * @param {EventCategoryModel} category 
     * @param {string} title 
     * @param {Date} date 
     * @param {boolean} hasPoster 
     * @param {string} address 
     */
    constructor(id, userId, category, title, date, hasPoster, address) {
        this.id = id
        this.userId = userId
        this.category = category
        this.title = title
        this.date = date
        this.hasPoster = hasPoster
        this.address = address
    }

    static parseFromJson({
        id,
        userId,
        category: {
            name
        },
        title,
        date,
        hasPoster,
        address
    }) {
        return new EventDTO(id, userId, new EventCategoryModel(name), title, new Date(date), hasPoster, address)
    }
}

export class EventPostDTO {

    /**
     * 
     * @param {string} userId 
     * @param {EventCategoryModel} category 
     * @param {string} title 
     * @param {string} description 
     * @param {Date} date 
     * @param {boolean} hasPoster 
     * @param {string} address  
     * @param {number} ticketPrice 
     * @param {number} tickets 
     */
    constructor(userId, category, title, description, date, hasPoster, address, ticketPrice, tickets) {
        this.userId = userId
        this.category = category
        this.title = title
        this.description = description
        this.date = date
        this.hasPoster = hasPoster
        this.address = address
        this.ticketPrice = ticketPrice
        this.tickets = tickets
    }
}

export class EventPutDTO {

    /**
     * 
     * @param {EventCategoryModel} category 
     * @param {string} title 
     * @param {string} description 
     * @param {boolean} hasPoster 
     * @param {string} address 
     * @param {number} ticketPrice 
     * @param {number} tickets 
     */
    constructor(category, title, description, hasPoster, address, ticketPrice, tickets) {
        this.category = category
        this.title = title
        this.description = description
        this.hasPoster = hasPoster
        this.address = address
        this.ticketPrice = ticketPrice
        this.tickets = tickets
    }

    static parseFromJson({
        category: {
            name
        },
        title,
        description,
        hasPoster,
        address,
        ticketPrice,
        tickets
    }) {
        return new EventPutDTO(new EventCategoryModel(name), title, description, hasPoster, address, ticketPrice, tickets)
    }
}
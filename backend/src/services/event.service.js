import { EventDTO, EventPostDTO, EventPutDTO } from "../dto/event.dto.js";
import { EventModel } from "../models/event.model.js";
import { EventCategoryModel } from "../models/event_category.model.js";
import { UserModel } from "../models/user.model.js";
import { SupabaseService } from "./supabase.service.js";

export class EventService {
    static #dbTable = 'events'
    static #columnsTable = {
        'event_id': '',
        'user_id': '',
        'event_category': '',
        'event_title': '',
        'event_description': '',
        'event_date': '',
        'event_has_poster': '',
        'event_address': '',
        'event_ticket_price': '',
        'event_tickets': '',
        'event_is_active': '',
    }

    static async getEvents() {
        const { data, error } = await SupabaseService.supabase
            .from(this.#dbTable)
            .select("event_id, user_id, event_category, event_title, event_date, event_has_poster, event_address")
            .eq('event_is_active', 'TRUE')
            .gt('event_tickets', 0)

        if (error)
            throw new Error(error.message)

        const events = data.map(row => new EventDTO(row.event_id, row.user_id, new EventCategoryModel(row.event_category), row.event_title, new Date(row.event_date), row.event_has_poster, row.event_address))

        return events
    }

    /**
     * 
     * @param {string} userId 
     * @returns 
     */
    static async getEventsOfUser(userId) {
        const { data, error } = await SupabaseService.supabase
            .from(this.#dbTable)
            .select("event_id, user_id, event_category, event_title, event_date, event_has_poster, event_address")
            .eq('user_id', userId)

        if (error)
            throw new Error(error.message)

        const events = data.map(row => new EventDTO(row.event_id, row.user_id, new EventCategoryModel(row.event_category), row.event_title, new Date(row.event_date), row.event_has_poster, row.event_address))

        return events
    }

    /**
     * 
     * @param {number} id 
     */
    static async getEvent(id) {
        const { data, error } = await SupabaseService.supabase
            .from(this.#dbTable)
            .select("*, users (user_id, user_email)")
            .eq('event_id', id)
            .eq('event_is_active', 'TRUE')
            .gt('event_tickets', 0)

        if (error)
            throw new Error(error.message)

        if (!data.length)
            throw new Error("Event doesn't exist or is inactive")

        const row = data[0]
        const event = new EventModel(
            row.event_id,
            row.user_id,
            new EventCategoryModel(row.event_category),
            row.event_title,
            row.event_description,
            new Date(row.event_date),
            row.event_has_poster,
            row.event_address,
            row.event_is_active,
            row.event_ticket_price,
            row.event_tickets
        )

        const user = new UserModel(row.user_id, row.users.user_email)

        return { event, user }
    }

    /**
     * 
     * @param {EventPostDTO} eventPostDTO 
     */
    static async addEvent(eventPostDTO) {
        const row = {
            'user_id': eventPostDTO.userId,
            'event_category': eventPostDTO.category.name,
            'event_title': eventPostDTO.title,
            'event_description': eventPostDTO.description,
            'event_date': eventPostDTO.date,
            'event_has_poster': eventPostDTO.hasPoster,
            'event_address': eventPostDTO.address,
            'event_ticket_price': eventPostDTO.ticketPrice,
            'event_tickets': eventPostDTO.tickets
        }

        /**
         * @type {[{
            "event_id": number,
            "user_id": string,
            "event_category": string,
            "event_title": string,
            "event_description": string,
            "event_date": string,
            "event_has_poster": boolean,
            "event_address": string,
            "event_is_active": boolean,
            "event_ticket_price": number,
            "event_tickets": number
        }]}
         */
        const [data] = await SupabaseService.upload(this.#dbTable, [row])

        return new EventDTO(data.event_id, data.user_id, new EventCategoryModel(data.event_category), data.event_title, new Date(data.event_date), data.event_has_poster, data.event_address)
    }

    /**
     * 
     * @param {number} id 
     * @param {EventPutDTO} event 
     */
    static async updateEvent(id, event) {
        const row = {
            'event_category': event.category.name,
            'event_title': event.title,
            'event_description': event.description,
            'event_has_poster': event.hasPoster,
            'event_address': event.address,
            'event_ticket_price': event.ticketPrice,
            'event_tickets': event.tickets,
        }

        /**
         * @type {{
         *  data: [{
         *      "event_id": number,
         *      "user_id": string,
         *      "event_category": string,
         *      "event_title": string,
         *      "event_description": string,
         *      "event_date": string,
         *      "event_has_poster": boolean,
         *      "event_address": string,
         *      "event_is_active": boolean,
         *      "event_ticket_price": number,
         *      "event_tickets": number
         *  }],
         *  error: import("@supabase/supabase-js").PostgrestError
         * }}
         */
        const { data: [data], error } = await SupabaseService.supabase
            .from(this.#dbTable)
            .update(row)
            .eq('event_id', id)
            .select()

        if (error)
            throw new Error(error.message)

        return new EventDTO(data.event_id, data.user_id, new EventCategoryModel(data.event_category), data.event_title, new Date(data.event_date), data.event_has_poster, data.event_address)
    }
}
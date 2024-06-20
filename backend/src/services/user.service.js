import { UserModel } from "../models/user.model.js";
import { SupabaseService } from "./supabase.service.js";

export class UserService {
    static #dbTable = 'users'
    static #columnsTable = {
        'user_id': '',
        'user_email': ''
    }

    /**
     * 
     * @param {UserModel} user 
     */
    static async add(user) {
        const row = this.#columnsTable
        row.user_id = user.id
        row.user_email = user.email
        return await SupabaseService.upload(this.#dbTable, [row])
    }

    static async getUserOfEvent(eventId) {
        const { data, error } = await SupabaseService.supabase
            .from(this.#dbTable)
            .select("users (user_id, user_email)")
            .eq('event_id', eventId)

        if (error)
            throw new Error(error.message)

        if (!data.length)
            throw new Error("Event doesn't exist or is inactive")

        const row = data[0].users[0]
        const user = new UserModel(row.user_id, row.user_email)

        return user
    }
}
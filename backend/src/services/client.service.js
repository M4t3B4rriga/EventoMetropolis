import { ClientModel } from "../models/client.model.js";
import { SupabaseService } from "./supabase.service.js";

export class ClientService {
    static #dbTable = 'clients'
    static #columnsTable = {
        'client_id': '',
        'client_name': '',
        'client_phone_number': '',
        'client_email': ''
    }

    /**
     * 
     * @param {ClientModel} client 
     */
    static async add(client) {
        const row = this.#columnsTable
        row.client_id = client.id
        row.client_name = client.name
        row.client_phone_number = client.phoneNumber
        row.client_email = client.email
        await SupabaseService.upload(this.#dbTable, [row])
        return client
    }

    /**
     * 
     * @param {string} id 
     */
    static async exist(id) {
        const data = await SupabaseService.get(this.#dbTable, 'client_id', id);
        return data.length > 0;
    }
}
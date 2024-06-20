import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export class SupabaseService {
    static #supabase = createClient(supabaseUrl, supabaseKey)

    /**
     * 
     * @param {File} file 
     */
    static uploadImage(userId, eventId, file) {
        this.#supabase.storage
            .from('images')
            .upload(`${userId}/${eventId}.png`, file, {
                upsert: true
            })
    }

    /**
     * 
     * @param {string} userId 
     * @param {string} eventId 
     * @returns 
     */
    static getImage(userId, eventId) {
        return `${supabaseUrl}/storage/v1/object/public/images/${userId}/${eventId}.png`
    }
}
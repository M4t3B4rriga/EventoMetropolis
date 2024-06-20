import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export class SupabaseService {
    static #supabase = createClient(supabaseUrl, supabaseKey)

    static get supabase() {
        return this.#supabase
    }

    /**
     * 
     * @param {string} table 
     * @param {Map<column, value> | [Map<column, value>]} rows 
     */
    static async upload(table, rows) {
        const { data, error } = await this.#supabase
            .from(table)
            .insert(rows)
            .select()

        if (error)
            throw new Error(error.message)

        return data
    }

    static async get(table, column, equalsTo) {
        let { data, error } = await this.#supabase
            .from(table)
            .select("*")
            .eq(column, equalsTo)
        
        if (error)
            throw new Error(error.message)

        return data
    }
}
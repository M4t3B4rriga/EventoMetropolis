import { EventCategoryModel } from "../models/event_category.model.js";
import { SupabaseService } from "./supabase.service.js";

export class EventCategoryService {
    static #dbTable = 'event_categories'
    static #columnsTable = {
        'event_category': ''
    }

    static async getCategories() {
        const { data, error } = await SupabaseService.supabase
            .from(this.#dbTable)
            .select('*')
        
        if (error)
            throw new Error(error.message)
        
        const categories = data.map(row => new EventCategoryModel(row.event_category))
        
        return categories
    }
}
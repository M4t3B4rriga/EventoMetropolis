import { ResponseModel } from "../models/response.model.js";
import { EventCategoryService } from "../services/event_category.service.js";

export class EventCategoryController {
    

    /**
     * 
     * @param {import("express").Request} request 
     * @param {import("express").Response<ResponseModel, Record<string, any>>} response 
     */
    static getCategories = async (request, response) => {
        let responseModel = new ResponseModel()

        try {
            responseModel.data = await EventCategoryService.getCategories()
            responseModel.response = true
        } catch (error) {
            responseModel.error = error.message
        } finally {
            response.send(responseModel)
        }
    }
}
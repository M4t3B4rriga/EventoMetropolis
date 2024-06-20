import { ContactFormModel } from "../models/contact_form.model.js"
import { ResponseModel } from "../models/response.model.js"
import { ContactFormService } from "../services/contact_form.service.js"
import { RequestValidator } from "../validators/request.validator.js"

export class ContactFormController {
    
    /**
     * 
     * @param {import("express").Request<ParamsDictionary, any, ContactFormModel, QueryString.ParsedQs, Record<string, any>>} request 
     * @param {import("express").Response<ResponseModel, Record<string, any>>} response 
     */
    static postContactForm = (request, response) => {
        const responseModel = new ResponseModel()

        try {
            const contactFormData = request.body

            if (!RequestValidator.hasSchema(contactFormData, ContactFormModel))
                throw new Error(`Request body have empty properties or hasn't specified schema: ${Object.keys(new ContactFormModel())}`)

            ContactFormService.sendContactFormEmail(contactFormData)
            responseModel.data = { message: 'Email send successfully' }
            responseModel.response = true
        } catch (error) {
            responseModel.error = error.message
        } finally {
            response.send(responseModel)
        }
    }
}
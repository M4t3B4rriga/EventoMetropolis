import { InvoiceDTO } from "../dto/invoice.dto.js";
import { ClientModel } from "../models/client.model.js";
import { InvoiceFormModel } from "../models/invoice_form.model.js";
import { ResponseModel } from "../models/response.model.js";
import { ClientService } from "../services/client.service.js";
import { EventService } from "../services/event.service.js";
import { InvoiceService } from "../services/invoice.service.js";
import { RequestValidator } from "../validators/request.validator.js";

export class InvoiceController {

    /**
     * 
     * @param {import("express").Request<ParamsDictionary, any, [ClientModel, InvoiceDTO], QueryString.ParsedQs, Record<string, any>>} request 
     * @param {import("express").Response} response 
     */
    static postInvoice = async (request, response) => {
        const responseModel = new ResponseModel()

        try {
            if (!request.body?.length)
                throw new Error("Request body hasn't specified schema: [ClientModel, InvoiceDTO]")

            const [client, invoice] = request.body

            if (!RequestValidator.hasSchema(client, ClientModel) || !RequestValidator.hasSchema(invoice, InvoiceDTO))
                throw new Error(`Request body have empty properties or hasn't specified schema: \n${Object.keys(new ClientModel())}\n${Object.keys(new InvoiceDTO())}`)

            if (!await ClientService.exist(client.id))
                await ClientService.add(client)

            const invoiceModel = await InvoiceService.add(invoice)

            const { event, user } = await EventService.getEvent(invoiceModel.eventId)

            const invoiceForm = new InvoiceFormModel(invoiceModel.id, client.id, client.name, client.email, client.phoneNumber, user.email, event.title, event.address, event.date, event.ticketPrice, invoiceModel.tickets)

            InvoiceService.sendEmail(invoiceForm)

            responseModel.data = invoiceForm
            responseModel.response = true
        } catch (error) {
            responseModel.error = error.message
        } finally {
            response.send(responseModel)
        }
    }
}
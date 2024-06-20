import { ResponseModel } from "../models/response.model.js"
import { UserModel } from "../models/user.model.js"
import { UserService } from "../services/user.service.js"
import { RequestValidator } from "../validators/request.validator.js"

export class UserController {

    /**
     * 
     * @param {import("express").Request<ParamsDictionary, any, UserModel, QueryString.ParsedQs, Record<string, any>>} request 
     * @param {import("express").Response} response 
     */
    static addUser = async (request, response) => {
        const responseModel = new ResponseModel()

        try {
            const userModel = request.body

            if (!RequestValidator.hasSchema(userModel, UserModel))
                throw new Error(`Request body have empty properties or hasn't specified schema: ${Object.keys(new UserModel())}`)
            
            responseModel.data = await UserService.add(userModel)
            responseModel.response = true
        } catch (error) {
            responseModel.error = error.message
        } finally {
            response.send(responseModel)
        }
    }
}
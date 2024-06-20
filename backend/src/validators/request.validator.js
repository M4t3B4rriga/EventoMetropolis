export class RequestValidator {

    /**
     * 
     * @param {import("express").Request} requestBody 
     * @param {class} classSchema 
     * @returns 
     */
    static isInstanceOf(requestBody, classSchema) {
        return Object.keys(requestBody).length > 0 && Object.keys(new classSchema()).sort((a, b) => a.localeCompare(b)).toString() === Object.keys(requestBody).sort((a, b) => a.localeCompare(b)).toString()
    }

    /**
     * 
     * @param {import("express").Request} requestBody 
     */
    static hasEmptyValues(requestBody) {
        for (const key in requestBody) {
            if (!requestBody[key].toString().length)
                return true
        }

        return false
    }

    static hasSchema(requestBody, classSchema) {
        return this.isInstanceOf(requestBody, classSchema) && !this.hasEmptyValues(requestBody)
    }
}
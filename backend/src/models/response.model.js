export class ResponseModel {
    /**
     * 
     * @param { undefined | {} | [{}] } data 
     * @param {boolean} response 
     * @param {string | undefined} error 
     */
    constructor(data = undefined, response = false, error = undefined) {
        this.data = data
        this.response = response
        this.error = error
    }
}
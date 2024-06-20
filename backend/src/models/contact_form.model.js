export class ContactFormModel {

    /**
     * 
     * @param {string} name 
     * @param {string} phoneNumber 
     * @param {string} email 
     * @param {string} message 
     */
    constructor(name, phoneNumber, email, message) {
        this.name = name
        this.phoneNumber = phoneNumber
        this.email = email
        this.message = message
    }
}
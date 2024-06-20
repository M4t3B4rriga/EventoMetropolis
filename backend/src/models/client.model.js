export class ClientModel {

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} phoneNumber 
     * @param {string} email 
     */
    constructor(id, name, phoneNumber, email) {
        this.id = id
        this.name = name
        this.phoneNumber = phoneNumber
        this.email = email
    }
}
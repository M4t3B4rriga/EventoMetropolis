export class UserModel {
    
    /**
     * 
     * @param {string} id 
     * @param {string} email 
     */
    constructor(id, email) {
        this.id = id
        this.email = email
    }

    static parseFromJson({ id, email }) {
        return new UserModel(id, email)
    }
}
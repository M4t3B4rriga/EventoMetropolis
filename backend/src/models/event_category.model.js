export class EventCategoryModel {

    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        this.name = name
    }

    static parseFromJson({ name }) {
        return new EventCategoryModel(name)
    }
}
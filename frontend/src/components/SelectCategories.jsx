import { useEffect, useState } from "react"
import { EventCategoryModel } from "../../../backend/src/models/event_category.model"
import { ResponseModel } from "../../../backend/src/models/response.model"

/**
 * 
 * @param {{
 *  className: string,
 *  disabled: boolean
 *  defaultValue: EventCategoryModel
 * }} param0 
 * @returns 
 */
export function SelectCategories({className, disabled, defaultValue}) {
    /**
     * @type {[[EventCategoryModel], React.Dispatch<React.SetStateAction<[EventCategoryModel]>>]}
     */
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        /**
         * @type {ResponseModel}
         */
        const responseModel = await fetch('http://localhost:3000/categories', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())

        if (!responseModel.response)
            return

        /**
         * @type {[EventCategoryModel]}
         */
        const categories = responseModel.data.map(json => EventCategoryModel.parseFromJson(json))

        return categories
    }

    useEffect(() => {
        getCategories().then(categories => {
            setCategories(categories)
        })
    }, [])

    if (!categories || !categories.length)
        return

    return (
        <select name="categories" id="categories" className={`input ${className}`} disabled={disabled} >
            {
                categories.map(category => (
                    <option key={category.name} value={category.name} selected={defaultValue && defaultValue.name === category.name }>{category.name}</option>
                ))
            }
        </select>
    )
}
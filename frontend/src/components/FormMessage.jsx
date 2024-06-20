import { useEffect, useState } from "react"
import { FormMessageStatus } from "../enums/FormMessageStatus"

/**
 * 
 * @param {{
 *  message: string,
 *  status: FormMessageStatus,
 *  reset: () => void,
 *  durationMillis: number
 * }} param0 
 * @returns 
 */
export function FormMessage({ message, status, reset, durationMillis }) {
    const [className, setClassName] = useState('message')

    useEffect(() => {
        if (!message.length)
            return setClassName('message')

        setClassName(`${className} message--show ${status}`)

        setTimeout(() => {
            setClassName('message')
            reset()
        }, durationMillis)
    }, [message])

    return (
        <p className={className}>
            {message}
        </p>
    )
}
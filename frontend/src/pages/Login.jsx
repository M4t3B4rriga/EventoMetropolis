import { useContext, useEffect } from "react"
import { LoginForm } from "../components/LoginForm"
import { PageContext } from "../context/PageProvider"

export function Login() {
    const { setPath } = useContext(PageContext)
    
    useEffect(() => {
        setPath('login')
    }, [])

    return (
        <>
            <LoginForm />
        </>
    )
}
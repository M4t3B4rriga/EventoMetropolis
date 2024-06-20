import { useContext, useEffect } from "react";
import { RegisterForm } from "../components/RegisterForm";
import { PageContext } from "../context/PageProvider";

export function Register() {
    const { setPath } = useContext(PageContext)
    
    useEffect(() => {
        setPath('register')
    }, [])

    return (
        <>
            <RegisterForm />
        </>
    )
}
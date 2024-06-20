import { useContext, useEffect } from "react";
import { Benefits } from "../components/Benefits";
import { ContactForm } from "../components/ContactForm";
import { Slogan } from "../components/Slogan";
import { PageContext } from "../context/PageProvider";

export function Contact() {
    const { setPath } = useContext(PageContext)
    
    useEffect(() => {
        setPath('contact')
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }, [])

    return (
        <>
            <Slogan />
            <ContactForm />
            <Benefits />
        </>
    )
}
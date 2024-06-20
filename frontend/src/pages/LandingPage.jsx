import { useContext, useEffect } from "react"
import { Benefits } from "../components/Benefits.jsx"
import { Events } from "../components/Events.jsx"
import { Slogan } from "../components/Slogan.jsx"
import { PageContext } from "../context/PageProvider.jsx"

export function LandingPage() {
    const { setPath } = useContext(PageContext)
    
    useEffect(() => {
        setPath('home')
    }, [])

    return (
        <>
            <Slogan />
            <Events />
            <Benefits />
        </>
    )
}
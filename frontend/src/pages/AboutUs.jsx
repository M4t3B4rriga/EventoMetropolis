import { Slogan } from "../components/Slogan"
import { Benefits } from "../components/Benefits"
import { useContext, useEffect } from "react"
import { PageContext } from "../context/PageProvider"
import DefaultPoster from '../assets/img/default_poster.png'

export function AboutUs() {
    const { setPath } = useContext(PageContext)
    
    useEffect(() => {
        setPath('about_us')
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }, [])

    return (
        <>
            <Slogan />
            <div className="section">
                <section className="row">
                    <div className="column">
                        <h2>Sobre nosotros</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                    <div className="column column--centered">
                        <img src={DefaultPoster} alt="" className="img img--centered" />
                    </div>
                </section>
                <section className="row">
                    <div className="column column--centered">
                        <img src={DefaultPoster} alt="" className="img img--centered" />
                    </div>
                    <div className="column">
                        <h2>¿Qué ofrecemos?</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </section>
                <section className="row">
                    <div className="column">
                        <h2>¿Quiénes somos?</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                    <div className="column column--centered">
                        <img src={DefaultPoster} alt="" className="img img--centered" />
                    </div>
                </section>
            </div>
            <Benefits />
        </>
    )
}
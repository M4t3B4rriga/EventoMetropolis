import { useContext } from 'react'
import { Account } from './Account'
import { Link } from 'react-router-dom'
import { PageContext } from '../context/PageProvider'
import Logo from '../assets/img/logo.png'

export function NavBar() {
    const { path } = useContext(PageContext)

    return (
        <header className='section header'>
            <div className='account'>
                <Account />
            </div>

            <nav className='menu' id='menu'>
                <Link to="/home"><img src={Logo} alt="EventMetropolis logo" className='logo' /></Link>

                <ul className='nav-bar'>
                    <li className='nav-bar__item'><Link to="/home" className={`button ${path.endsWith('home') && 'button--selected'}`}>Home</Link></li>
                    <li className='nav-bar__item'><Link to="/my_events" className={`button ${path.endsWith('my_events') && 'button--selected'}`}>Mis eventos</Link></li>
                    <li className='nav-bar__item'><Link to="/about_us" className={`button ${path.endsWith('about_us') && 'button--selected'}`}>Acerca de nosotros</Link></li>
                    <li className='nav-bar__item'><Link to="/contact" className={`button ${path.endsWith('contact') && 'button--selected'}`}>Contáctanos</Link></li>
                </ul>
            </nav>
        </header>
    )
}
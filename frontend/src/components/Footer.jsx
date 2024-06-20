import { Link } from 'react-router-dom'
import Logo from '../assets/img/logo.png'
import Facebook from '../assets/svg/facebook_icon.svg'
import Instagram from '../assets/svg/instagram_icon.svg'
import Tiktok from '../assets/svg/tiktok_icon.svg'
import TermsAndconditions from '../assets/docs/Terms&Conditions.pdf'
import PrivacyPolicies from '../assets/docs/PrivacyPolicies.pdf'

export function Footer() {
    return (
        <footer className='section footer'>
            <div className='footer__section'>
                <img src={Logo} alt="EventMetropolis logo" className="logo" />

                <div className='social-networks'>
                    <a href='https://www.facebook.com/' target='_blank'>
                        <img src={Facebook} alt="facebook icon" className="icon" />
                    </a>
                    <a href='https://www.instagram.com/' target='_blank'>
                        <img src={Instagram} alt="instagram icon" className="icon" />
                    </a>
                    <a href='https://www.tiktok.com/en/' target='_blank'>
                        <img src={Tiktok} alt="titktok icon" className="icon" />
                    </a>
                </div>
            </div>

            <div className='footer__section'>
                <Link to="/about_us" className='link'>Acerca de nosotros</Link>
                <Link to="/contact" className='link'>Contáctanos</Link>
            </div>

            <div className='footer__section'>
                <a href={PrivacyPolicies} target='_blank' className='link'>Políticas de privacidad</a>
                <a href={TermsAndconditions} target='_blank' className='link'>Términos y Condiciones</a>
            </div>
        </footer>
    )
}
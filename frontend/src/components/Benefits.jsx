import { Link } from 'react-router-dom'
import DefaultPoster from '../assets/img/default_poster.png'

export function Benefits() {

    return (
        <article className='section'>
            <div className='benefits'>
                <img src={DefaultPoster} alt="benefits illustration" className='img benefits__img' />
                <div className='benefits__body'>
                    <h2 className='benefits__title'>Publica todos tus eventos</h2>
                    <p className='benefits__description'>
                        Al registrarte puedes ser parte de esta gran comunidad de emprendedores donde tus eventos pueden tener un mayor alcance
                    </p>
                    <footer className='benefits__footer'>
                        <Link to='/register' className='button button--solid'>Registrarse</Link>
                    </footer>
                </div>
            </div>
        </article>
    )
}
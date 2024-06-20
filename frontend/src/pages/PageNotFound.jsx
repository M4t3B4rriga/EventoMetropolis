import { Error } from "../components/Error"
import SadFace from '../assets/svg/sad_face.svg'

export function PageNotFound() {
    return (
        <section className="error-section page-not-found">
            <h2 className="page-not-found__title">Página no encontrada</h2>
            <Error iconImg={SadFace}>Lo sentimos, al parecer la página que buscas no existe.</Error>
        </section>
    )
}
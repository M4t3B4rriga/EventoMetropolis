import { useState } from "react"
import { FormMessage } from "./FormMessage"
import { FormMessageStatus } from "../enums/FormMessageStatus"
import { FirebaseService } from "../services/firebase.service"
import { Link, useNavigate } from "react-router-dom"

export function LoginForm() {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(FormMessageStatus.successful)
    const [blockSubmit, setBlockSubmit] = useState(false)
    const navigate = useNavigate()

    /**
     * 
     * @param {Event} event 
     */
    const handleLoginSubmit = (event) => {
        event.preventDefault()
        const { loginEmail, loginPassword } = Object.fromEntries(new FormData(event.target))

        FirebaseService.login(loginEmail, loginPassword).then(user => {
            setMessage('Ingreso completado correctamente')
            navigate('/my_events')
        }).catch(error => {
            setStatus(FormMessageStatus.error)
            setMessage('Correo electrónico o contraseña incorrectas')
        }).finally(() => {
            setBlockSubmit(true)
        })

    }

    const resetForm = () => {
        if (status === FormMessage.successful)
            document.getElementById('login').reset()

        setMessage('')
        setBlockSubmit(false)
        setStatus(FormMessageStatus.successful)
    }

    return (
        <form id="login" className="form section section--full-height" onSubmit={handleLoginSubmit}>
            <h2 className="form__title">Ingresar</h2>
            <div className="form__group">
                <label htmlFor="loginEmail" className="label">Correo electrónico</label>
                <input type="email" id="loginEmail" name="loginEmail" className="input input--block" />
            </div>
            <div className="form__group">
                <label htmlFor="loginPassword" className="label">Contraseña</label>
                <input type="password" id="loginPassword" name="loginPassword" className="input input--block" />
            </div>
            <div className="form__group">
                <button type="submit" id="loginSubmit" className="button button--solid button--bordered button--wide" disabled={blockSubmit}>Acceder</button>
            </div>
            <div className="form__group">
                <span>¿No tienes una cuenta? <Link to={'/register'} className='link'>Registrate</Link></span>
            </div>
            <FormMessage message={message} status={status} reset={resetForm} durationMillis={3000} />
        </form>
    )
}
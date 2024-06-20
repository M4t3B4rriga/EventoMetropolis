import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseService } from "../services/firebase.service"
import { FormMessage } from "./FormMessage"
import { FormMessageStatus } from "../enums/FormMessageStatus"
import { ResponseModel } from "../../../backend/src/models/response.model"
import { UserModel } from "../../../backend/src/models/user.model"

export function RegisterForm() {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(FormMessageStatus.successful)
    const [blockSubmit, setBlockSubmit] = useState(false)
    const [password, setPassword] = useState('')
    const [errorClassName, setErrorClassName] = useState('text-error')
    const navigate = useNavigate()

    /**
     * 
     * @param {Event} event 
     */
    const handleRegisterSubmit = (event) => {
        event.preventDefault()
        const { registerEmail, registerPassword, registerPasswordVerified } = Object.fromEntries(new FormData(event.target))

        if (registerPassword !== registerPasswordVerified || !registerPassword.length)
            return

        FirebaseService.register(registerEmail, registerPassword).then(userCredentials => userCredentials.user).then(async user => {
            setMessage('Registro realizado correctamente')

            /**
             * @type {ResponseModel}
             */
            const responseModel = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new UserModel(user.uid, user.email))
            }).then(response => response.json())

            if (!responseModel.response)
                throw new Error(responseModel.error)

            FirebaseService.logout()
            navigate('/login')
        }).catch(error => {
            setStatus(FormMessageStatus.error)
            setMessage('Campos incompletos o el correo electrónico ya está siendo utilizado ' + error.message)
        }).finally(() => {
            setBlockSubmit(true)
        })
    }

    const resetForm = () => {
        if (status === FormMessage.successful)
            document.getElementById('register').reset()

        setMessage('')
        setBlockSubmit(false)
        setStatus(FormMessageStatus.successful)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    /**
     * 
     * @param {Event} event 
     */
    const handlePasswordVerifiedChange = (event) => {
        let passwordVerified = event.target.value

        if (passwordVerified !== password || !password.length)
            setErrorClassName(`text-error text-error--show`)
        else
            setErrorClassName(`text-error`)
    }

    return (
        <form id="register" className="form section section--full-height" onSubmit={handleRegisterSubmit}>
            <h2 className="form__title">Registrarse</h2>
            <div className="form__group">
                <label htmlFor="registerEmail" className="label">Correo electrónico</label>
                <input type="email" id="registerEmail" name="registerEmail" className="input input--block" />
            </div>
            <div className="form__group">
                <label htmlFor="registerPassword" className="label">Contraseña</label>
                <input type="password" id="registerPassword" name="registerPassword" className="input input--block" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="form__group">
                <label htmlFor="registerPasswordVerified" className="label">Repetir contraseña</label>
                <input type="password" id="registerPasswordVerified" name="registerPasswordVerified" className="input input--block" onChange={handlePasswordVerifiedChange} />
                <span className={errorClassName}>Las contraseñas no coinciden</span>
            </div>
            <div className="form__group">
                <button type="submit" id="registerSubmit" className="button button--solid button--bordered button--wide" disabled={blockSubmit}>Crear cuenta</button>
            </div>
            <div className="form__group">
                <span>¿Ya tienes una cuenta? <Link to={'/login'} className='link'>Ingresa</Link></span>
            </div>
            <FormMessage message={message} status={status} reset={resetForm} durationMillis={3000} />
        </form>
    )
}
import { useContext, useState } from "react"
import { UserModel } from "../../../backend/src/models/user.model"
import { PageContext } from "../context/PageProvider"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseService } from "../services/firebase.service"

export function Account() {
    /**
     * @type {{
     *  path: string, user: UserModel
     * }}
     */
    const { path, user } = useContext(PageContext)
    const navigate = useNavigate()

    const handleClickLogout = () => {
        FirebaseService.logout()
        navigate('/home')
    }

    return (
        !user?.id ?
            (
                <>
                    <Link to='/register' className={`button ${path.endsWith('register') && 'button--selected'}`}>Registrarse</Link>
                    <Link to='/login' className='button button--solid'>Ingresar</Link>
                </>
            ) :
            (
                <>
                    <span className='user'>Bienvenido, {user.email}</span>
                    <button className='button button--solid' onClick={handleClickLogout}>Salir</button>
                </>
            )
    )
}
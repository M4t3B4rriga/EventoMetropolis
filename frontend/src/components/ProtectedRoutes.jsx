import { useContext } from "react"
import { PageContext } from "../context/PageProvider"
import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoutes() {
    const { user, loading } = useContext(PageContext)
    
    if (loading)
        return

    if (!user) {
        
        return (
            <Navigate to={'/login'} />
        )
    }

    return (
        <Outlet />
    )
}
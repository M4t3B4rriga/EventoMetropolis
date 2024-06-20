import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { PageNotFound } from './pages/PageNotFound'
import { AboutUs } from './pages/AboutUs'
import { Contact } from './pages/Contact'
import { EventDetail } from './pages/EventDetail'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { MyEvents } from './pages/MyEvents'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import './App.css'

export function App() {

    return (
        <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
            <NavBar />

            <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={<LandingPage />} />
                <Route path='/about_us' element={<AboutUs />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/event/:id' element={<EventDetail />} />
                <Route element={<ProtectedRoutes />} >
                    <Route path='/my_events' element={<MyEvents />} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
            </Routes>

            <Footer />
        </PayPalScriptProvider>
    )
}
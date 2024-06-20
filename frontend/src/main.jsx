import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PageProvider } from './context/PageProvider.jsx'
import 'normalize.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <PageProvider>
                <App />
            </PageProvider>
        </BrowserRouter>
    </React.StrictMode>,
)

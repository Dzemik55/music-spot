import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {CssBaseline} from "@mui/material";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline/>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </StrictMode>,
)

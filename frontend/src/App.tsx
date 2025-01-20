import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"/"} element={<Dashboard/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

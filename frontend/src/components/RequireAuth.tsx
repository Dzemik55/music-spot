import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";
import React from "react";

export const RequireAuth: React.FC = () => {
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    return isAuthenticated ? (
        <Outlet/>
    ) : (
        <Navigate to={"/login"} state={{from: location}} replace/>
    );
};
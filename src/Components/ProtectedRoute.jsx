import React from "react";
import { useSelector } from "react-redux";
import { Navigate,useLocation } from "react-router";

export default function ProtectedRoute({children}){
    const location=useLocation()
    const id=useSelector((state)=>state.User.UserData?.id)
    if(!id){
        return <Navigate to="/login" state={{from:location?.pathname}} replace/>
    }
    return children
}
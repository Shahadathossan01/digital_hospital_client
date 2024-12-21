import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const token= localStorage.getItem('token')?(localStorage.getItem('token')):null
    const {user}=useStoreState(state=>state.user)
    if(token && user){
        return children
    }
    return <Navigate to="/login" />
};

export default PrivateRoute;
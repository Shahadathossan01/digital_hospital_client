import { useStoreState } from "easy-peasy";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const token= localStorage.getItem('token')?(localStorage.getItem('token')):null
    const {user}=useStoreState(state=>state.user)
    const location=useLocation()
    if(token && user){
        return children
    }
    return <Navigate to="/login" state={{from:location}} replace />
};

export default PrivateRoute;
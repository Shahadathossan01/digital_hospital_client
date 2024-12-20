import { patch } from "@mui/material";
import Main from "../layouts/Main";
import Appointment from "../pages/Appointment/Appointment";
import Cancel from "../pages/Cancel/Cancel";
import Fail from "../pages/Fail/Fail";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MedicalRecord from "../pages/MedicalRecord/MedicalRecord";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register"
import RequestedAppointment from "../pages/RequestedAppointment/RequestedAppointment";
import Success from "../pages/Success/Success";
import DoctorAppointment from "../pages/DoctorAppointment/DoctorAppointment";

const routes=[
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/home',
                element:<Home></Home>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/appointment',
                element:<Appointment></Appointment>
            },
            {
                path:'/profile',
                element:<Profile></Profile>
            },
            {
                path:'/medicalRecord',
                element:<MedicalRecord></MedicalRecord>
            },
            {
                path:'/success',
                element:<Success></Success>
            },
            {
                path:'/cancel',
                element:<Cancel></Cancel>
            },
            {
                path:'/fail',
                element:<Fail></Fail>
            },
            {
                path:'/reqAppointment',
                element:<RequestedAppointment></RequestedAppointment>
            },
            {
                path:'/docAppointment',
                element:<DoctorAppointment></DoctorAppointment>
            }
        ]
    }
]

export default routes;
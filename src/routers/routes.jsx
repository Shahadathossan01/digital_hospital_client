import Main from "../layouts/Main";
import Appointment from "../pages/Appointment/Appointment";
import Cancel from "../pages/Cancel/Cancel";
import Fail from "../pages/Fail/Fail";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MedicalRecord from "../pages/MedicalRecord/MedicalRecord";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register"
import Success from "../pages/Success/Success";

const routes=[
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
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
            }
        ]
    }
]

export default routes;
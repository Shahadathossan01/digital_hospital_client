
import Main from "../layouts/Main";
import Appointment from "../pages/Appointment/Appointment";
import Cancel from "../pages/Cancel/Cancel";
import Fail from "../pages/Fail/Fail";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MedicalRecord from "../pages/MedicalRecord/MedicalRecord";
import PatientProfile from "../pages/PatientProfile/PatientProfile";
import Register from "../pages/Register/Register"
import RequestedAppointment from "../pages/RequestedAppointment/RequestedAppointment";
import Success from "../pages/Success/Success";
import DoctorAppointment from "../pages/DoctorAppointment/DoctorAppointment";
import DoctorProfile from "../pages/DoctorProfile/DoctorProfile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

 const  routes=[
      {
          path:'/',
          element:<Main></Main>,
          children:[
              {
                  path:'/',
                  element:<PrivateRoute>
                      <Home></Home>
                  </PrivateRoute>
              },
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
                  path:'/PatientProfile',
                  element:<PatientProfile></PatientProfile>
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
                  element:<PrivateRoute>
                      <DoctorAppointment></DoctorAppointment>
                  </PrivateRoute>
              },
              {
                  path:'/DoctorProfile',
                  element:<DoctorProfile></DoctorProfile>
              }
          ]
      }
  ]

export default routes
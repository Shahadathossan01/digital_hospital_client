
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
import AvailableDoctors from "../pages/AvailableDoctors/AvailableDoctors";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AdminCreateUser from "../pages/AdminCreateUser/AdminCreateUser";
import PaymentPage from "../pages/PaymentPage/PaymentPage";

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
                  path:'/availableDoctors',
                  element:<AvailableDoctors></AvailableDoctors>
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
                  path:'/record',
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
              },
              {
                path:'/adminDashboard',
                element:<AdminDashboard></AdminDashboard>
              },
              {
                path:'/adminCreateUser',
                element:<AdminCreateUser></AdminCreateUser>
              },
              {
                path:'/paymentPage/:id',
                element:<PaymentPage></PaymentPage>
              }
          ]
      }
  ]

export default routes

// import Main from "../layouts/Main";
// import Appointment from "../pages/Appointment/Appointment";
// import Cancel from "../pages/Cancel/Cancel";
// import Fail from "../pages/Fail/Fail";
// import Home from "../pages/Home/Home";
// import Login from "../pages/Login/Login";
// import MedicalRecord from "../pages/MedicalRecord/MedicalRecord";
// import Register from "../pages/Register/Register"
// import RequestedAppointment from "../pages/RequestedAppointment/RequestedAppointment";
// import Success from "../pages/Success/Success";
// import DoctorAppointment from "../pages/DoctorAppointment/DoctorAppointment";
// import DoctorProfile from "../pages/DoctorProfile/DoctorProfile";
// import PrivateRoute from "../PrivateRoute/PrivateRoute";

// import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
// import AdminCreateUser from "../pages/AdminCreateUser/AdminCreateUser";
// import BecomeADoctor from "../pages/BecomeADoctor/BecomeADoctor";
// import BecomeADoctorForm from "../pages/BecomeADoctorForm/BecomeADoctorForm";
// import FindDoctors from "../pages/FindDoctors/FindDoctors";
// import ScrollToTop from "../components/shared/ScrollToTop/ScrollToTop";
// import BookAppointment from "../pages/BookAppointment/BookAppointment";
// import PaymentPage from "../pages/PaymentPage/PaymentPage";
// import PatientLayout from "../layouts/PatientLayout";
// import MyProfile from "../pages/MyProfile/MyProfile";
// import MyAppointments from "../pages/MyAppointment/MyAppointment";
// import MyEmergencyService from "../pages/MyEmergencyService/MyEmergencyService";

//  const  routes=[
//       {
//           path:'/',
//           element:(
//             <>
//                 <ScrollToTop></ScrollToTop>
//                 <Main></Main>
//             </>
//           ),
//           children:[
//               {
//                   path:'/',
//                   element:<PrivateRoute>
//                       <Home></Home>
//                   </PrivateRoute>
//               },
//               {
//                   path:'/findDoctors',
//                   element:<FindDoctors></FindDoctors>
//               },
//               {
//                   path:'/register',
//                   element:<Register></Register>
//               },
//               {
//                   path:'/login',
//                   element:<Login></Login>
//               },
//               {
//                   path:'/appointment',
//                   element:<Appointment></Appointment>
//               },
//               {
//                   path:'/becomeADoctor',
//                   element:<BecomeADoctor></BecomeADoctor>
//               },
//               {
//                   path:'/becomeADoctorForm',
//                   element:<BecomeADoctorForm></BecomeADoctorForm>
//               },
//               {
//                 path: '/PatientProfile',
//                 element: <PatientLayout />, // Using the new layout
//                 children: [
//                     { path: '', element: <MyProfile /> },
//                     { path: 'appointments', element: <MyAppointments /> },
//                     { path: 'emergency', element: <MyEmergencyService /> },
//                 ],
//             },
//               {
//                   path:'/record',
//                   element:<MedicalRecord></MedicalRecord>
//               },
//               {
//                   path:'/success',
//                   element:<Success></Success>
//               },
//               {
//                   path:'/cancel',
//                   element:<Cancel></Cancel>
//               },
//               {
//                   path:'/fail',
//                   element:<Fail></Fail>
//               },
//               {
//                   path:'/reqAppointment',
//                   element:<RequestedAppointment></RequestedAppointment>
//               },
//               {
//                   path:'/docAppointment',
//                   element:<PrivateRoute>
//                       <DoctorAppointment></DoctorAppointment>
//                   </PrivateRoute>
//               },
//               {
//                   path:'/DoctorProfile',
//                   element:<DoctorProfile></DoctorProfile>
//               },
//               {
//                 path:'/adminDashboard',
//                 element:<AdminDashboard></AdminDashboard>
//               },
//               {
//                 path:'/adminCreateUser',
//                 element:<AdminCreateUser></AdminCreateUser>
//               },
//               {
//                 path:'/bookAppointment/:id',
//                 element:<BookAppointment></BookAppointment>
//               },
//               {
//                 path:"/paymentPage",
//                 element:<PaymentPage></PaymentPage>
//               }
//           ]
//       },
//     //   {
//     //     path: '/PatientProfile',
//     //     element: <PatientLayout />, // Using the new layout
//     //     children: [
//     //         { path: '', element: <MyProfile /> },
//     //         { path: 'appointments', element: <MyAppointments /> },
//     //         { path: 'emergency', element: <MyEmergencyService /> },
//     //     ],
//     // },
//   ]

// export default routes
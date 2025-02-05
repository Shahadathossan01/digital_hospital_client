
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import ScrollToTop from "./components/shared/ScrollToTop/ScrollToTop";
import Main from "./layouts/Main";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import FindDoctors from "./pages/FindDoctors/FindDoctors";
import Register from "./pages/Register/Register";
import Appointment from "./pages/Appointment/Appointment";
import BecomeADoctor from "./pages/BecomeADoctor/BecomeADoctor";
import BecomeADoctorForm from "./pages/BecomeADoctorForm/BecomeADoctorForm";
import PatientLayout from "./layouts/PatientLayout";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyAppointments from "./pages/MyAppointment/MyAppointment";
import MyEmergencyService from "./pages/MyEmergencyService/MyEmergencyService";
import MedicalRecord from "./pages/MedicalRecord/MedicalRecord";
import Success from "./pages/Success/Success";
import Fail from "./pages/Fail/Fail";
import RequestedAppointment from "./pages/RequestedAppointment/RequestedAppointment";
import DoctorAppointment from "./pages/DoctorAppointment/DoctorAppointment";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminCreateUser from "./pages/AdminCreateUser/AdminCreateUser";
import BookAppointment from "./pages/BookAppointment/BookAppointment";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import { useStoreState } from "easy-peasy";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Cancel from "./pages/Cancel/Cancel";
import DoctorLayout from "./layouts/DoctorLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import DoctorAppointments from "./pages/DoctorAppointments/DoctorAppointments";
import MySchedule from "./pages/MySchedule/MySchedule";
import ChangePassword from "./components/shared/ChangePassword/ChangePassord";
import CreateNewAccount from "./components/shared/CreateNewAccount/CreateNewAccount";

function App() {
  const {user}=useStoreState(state=>state.user)
  console.log(user)
//   const  routes=createBrowserRouter([
//     {
//         path:'/',
//         element:(
//           <>
//               <ScrollToTop></ScrollToTop>
//               <Main></Main>
//           </>
//         ),
//         children:[
//             {
//                 path:'/',
//                 element:<PrivateRoute>
//                     <Home></Home>
//                 </PrivateRoute>
//             },
//             {
//                 path:'/findDoctors',
//                 element:<FindDoctors></FindDoctors>
//             },
//             {
//                 path:'/register',
//                 element:<Register></Register>
//             },
//             {
//                 path:'/login',
//                 element:<Login></Login>
//             },
//             {
//                 path:'/appointment',
//                 element:<Appointment></Appointment>
//             },
//             {
//                 path:'/becomeADoctor',
//                 element:<BecomeADoctor></BecomeADoctor>
//             },
//             {
//                 path:'/becomeADoctorForm',
//                 element:<BecomeADoctorForm></BecomeADoctorForm>
//             },
//             {
//               path: '/PatientProfile',
//               element: <PatientLayout />, // Using the new layout
//               children: [
//                   { path: '', element: <MyProfile /> },
//                   { path: 'appointments', element: <MyAppointments /> },
//                   { path: 'emergency', element: <MyEmergencyService /> },
//               ],
//           },
//             {
//                 path:'/record',
//                 element:<MedicalRecord></MedicalRecord>
//             },
//             {
//                 path:'/success',
//                 element:<Success></Success>
//             },
//             {
//                 path:'/cancel',
//                 element:<Cancel></Cancel>
//             },
//             {
//                 path:'/fail',
//                 element:<Fail></Fail>
//             },
//             {
//                 path:'/reqAppointment',
//                 element:<RequestedAppointment></RequestedAppointment>
//             },
//             {
//                 path:'/docAppointment',
//                 element:<PrivateRoute>
//                     <DoctorAppointment></DoctorAppointment>
//                 </PrivateRoute>
//             },
//             {
//                 path:'/DoctorProfile',
//                 element:<DoctorProfile></DoctorProfile>
//             },
//             {
//               path:'/adminDashboard',
//               element:<AdminDashboard></AdminDashboard>
//             },
//             {
//               path:'/adminCreateUser',
//               element:<AdminCreateUser></AdminCreateUser>
//             },
//             {
//               path:'/bookAppointment/:id',
//               element:<BookAppointment></BookAppointment>
//             },
//             {
//               path:"/paymentPage",
//               element:<PaymentPage></PaymentPage>
//             }
//         ]
//     },
// ])
  return (
    <>
      <Routes>
        {/**!user or patient route */}
        {
          (user?.role=="patient" || !user) &&
        <Route path="/" element={<><ScrollToTop></ScrollToTop>
          <Main></Main></>}>
          <Route path="/" element={<Home></Home>}/>
          <Route path="/findDoctors" element={<FindDoctors></FindDoctors>}/>
          <Route path="/register" element={<Register></Register>}/>
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/becomeADoctor" element={<BecomeADoctor></BecomeADoctor>}/>
          <Route path="/becomeADoctorForm" element={<BecomeADoctorForm></BecomeADoctorForm>}/>
          
          <Route path="/PatientProfile" element={<><PrivateRoute><PatientLayout /></PrivateRoute></>}>
            <Route path="" element={<MyProfile />}/>
            <Route path="appointments" element={<MyAppointments />}/>
            <Route path="emergency" element={<MyEmergencyService />}/>
          </Route>
          
          <Route path="/success" element={<Success></Success>}/>
          <Route path="/cancel" element={<Cancel></Cancel>}/>
          <Route path="/fail" element={<Fail></Fail>}/>
          <Route path="/record" element={<MedicalRecord></MedicalRecord>}/>
          
          <Route path="/docAppointment" element={<><PrivateRoute>
            <DoctorAppointment></DoctorAppointment>
                </PrivateRoute></>}/>
          <Route path="/DoctorProfile" element={<DoctorProfile></DoctorProfile>}/>
          <Route path="/adminDashboard" element={<AdminDashboard></AdminDashboard>}/>
          <Route path="/adminCreateUser" element={<AdminCreateUser></AdminCreateUser>}/>
          <Route path="/bookAppointment/:id" element={<BookAppointment></BookAppointment>}/>
          <Route path="/paymentPage" element={<PaymentPage></PaymentPage>}/>          
        </Route>

        }
        
        {/**Doctor Route */}
        {
          user?.role=="doctor" &&
          <>
            <Route path="/" element={<DoctorLayout></DoctorLayout>}>
              <Route path="" element={<Dashboard />}/>
              <Route path="doctorAppointments" element={<DoctorAppointments />}/>
              <Route path="mySchedule" element={<MySchedule />}/>
              <Route path="reqAppointments" element={<RequestedAppointment />}/>
              <Route path="profile" element={<DoctorProfile />}/>
              <Route path="changePassword" element={<ChangePassword />}/>
              <Route path="createNewAccount" element={<CreateNewAccount />}/>
            </Route>
          </>
        }

        {/**Admin Route */}
        {
          user?.role=="admin" &&
          <>
            <Route path="/" element={<h1 style={{height:"500px",backgroundColor:"green"}}></h1>}>

            </Route>
          </>
        }

       
      </Routes>
    </>
    // <RouterProvider router={routes}></RouterProvider>
  )
}

export default App

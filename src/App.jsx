
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/shared/ScrollToTop/ScrollToTop";
import Main from "./layouts/Main";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import FindDoctors from "./pages/FindDoctors/FindDoctors";
import Register from "./pages/Register/Register";
import BecomeADoctor from "./pages/BecomeADoctor/BecomeADoctor";
import BecomeADoctorForm from "./pages/BecomeADoctorForm/BecomeADoctorForm";
import PatientProfileLayout from "./layouts/PatientProfileLayout";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyAppointments from "./pages/MyAppointment/MyAppointment";
import Success from "./pages/Success/Success";
import Fail from "./pages/Fail/Fail";
import RequestedAppointment from "./pages/RequestedAppointment/RequestedAppointment";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
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
import AdminLayout from "./layouts/AdminLayout";
import AllUsers from "./pages/Users/Users";
import PromoCode from "./pages/PromoCode/PromoCode";
import AddDoctor from "./pages/AddDoctor/AddDoctor";
import AddAdminOrPatient from "./pages/AddAdminOrPatient/AddAdminOrPatient";
import AboutUs from "./pages/AboutUs/AboutUs";
import UpdatedAdminDashboard from "./pages/UpdatedAdminDashboard/UpdatedAdminDashboard";
import GetInstantVideo from "./pages/GetInstantVideo/GetInstantVideo";
import HealthHub from "./pages/HealthHub/HealthHub";
import MedicineHub from "./pages/MedicineHub/MedicineHub";
import Blogs from "./pages/Blogs/Blogs";
import FrequentlyAsked from "./components/shared/FrequentlyAsked/FrequentlyAsked";
import TermsOrConditions from "./pages/TermsOrConditions/TermsOrConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import LeaderShipProfile from "./pages/LeadershipProfile/LeaderShipProfile";
import SuccessFreeAppointment from "./pages/SuccessFreeAppointment/SuccessFreeAppointment";
import PatientInvoice from "./pages/PatientInvoice/PatientInvoice";
import AdminInvoice from "./pages/AdminInvoice/AdminInvoice";
import OtpVerification from "./pages/OtpVerification/OtpVerification";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  const {user}=useStoreState(state=>state.user)
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
          <Route path="/instant_video" element={<PrivateRoute><GetInstantVideo /></PrivateRoute>}/>
          <Route path="/health_hub" element={<PrivateRoute><HealthHub/></PrivateRoute>}/>
          <Route path="/medicine_hub" element={<PrivateRoute><MedicineHub/></PrivateRoute>}/>
          <Route path="/lab_testing" element={<PrivateRoute></PrivateRoute>}/>
          <Route path="/password/forgot" element={<ForgotPassword></ForgotPassword>}/>
          <Route path="/password/reset/:resetToken" element={<ResetPassword></ResetPassword>}/>
          <Route path="/otp-verification/:credential" element={<OtpVerification></OtpVerification>}/>

          {/**Patient Profile */}
          <Route path="/PatientProfile" element={<><PrivateRoute><PatientProfileLayout /></PrivateRoute></>}>
            <Route path="" element={<MyProfile />}/>
            <Route path="appointments" element={<MyAppointments />}/>
            <Route path="patientInvoice" element={<PatientInvoice />}/>
            {/* <Route path="emergency" element={<MyEmergencyService />}/> */}
          </Route>
          
          <Route path="/success/:transactionId" element={<Success></Success>}/>
          <Route path="/cancel" element={<Cancel></Cancel>}/>
          <Route path="/fail" element={<Fail></Fail>}/>
          <Route path="/bookAppointment/:id" element={<PrivateRoute><BookAppointment/></PrivateRoute>}/>
          <Route path="/paymentPage" element={<PrivateRoute><PaymentPage/></PrivateRoute>}/>          
          <Route path="/about_us" element={<AboutUs></AboutUs>}/>                   
          <Route path="/blogs" element={<Blogs></Blogs>}/>          
          <Route path="/faq" element={<FrequentlyAsked></FrequentlyAsked>}/>                   
          <Route path="/termsOrconditions" element={<TermsOrConditions></TermsOrConditions>}/>                   
          <Route path="/privacy_policy" element={<PrivacyPolicy></PrivacyPolicy>}/>                   
          <Route path="/refund_policy" element={<RefundPolicy></RefundPolicy>}/>                   
          <Route path="/leadershipProfile" element={<LeaderShipProfile></LeaderShipProfile>}/>                   
          <Route path="/successFreeAppointment/:freeAppointmentId" element={<SuccessFreeAppointment></SuccessFreeAppointment>}/>                   
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
              <Route path="/otp-verification/:credential" element={<OtpVerification></OtpVerification>}/>
            </Route>
          </>
        }


        {/**Admin Route */}
        {
          user?.role=="admin" &&
          <>
            <Route path="" element={<AdminLayout></AdminLayout>}> 
              <Route path="/" element={<UpdatedAdminDashboard></UpdatedAdminDashboard>}/>
              <Route path="allUsers" element={<AllUsers></AllUsers>}/>
              <Route path="promoCode" element={<PromoCode></PromoCode>}/>
              <Route path="addDoctor" element={<AddDoctor></AddDoctor>}/>
              <Route path="changePassword" element={<ChangePassword />}/>
              <Route path="addAdminOrPatient" element={<AddAdminOrPatient></AddAdminOrPatient>}/>
              <Route path="adminInvoice" element={<AdminInvoice></AdminInvoice>}/>
              <Route path="/otp-verification/:credential" element={<OtpVerification></OtpVerification>}/>
            </Route>
          </>
        }
      </Routes>
    </>
  )
}

export default App

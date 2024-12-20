import axios from "axios"
import { action, createStore, thunk } from "easy-peasy"
import { toast } from "react-toastify"

const userModel={
    registerData:null,
    registerError:null,
    isLogoutUser:false,
    isLogIn:false,
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    addUser:action((state,payload)=>{
        state.user=payload
    }),
    addIslogIn:action((state,payload)=>{
        state.isLogIn=payload
    }),
    addRegisterData:action((state,payload)=>{
        state.registerData=payload
    }),
    addRegisterError:action((state,payload)=>{
        state.registerError=payload
    }),
    registerUser:thunk(async(actions,payload)=>{
       const {username,email,password,navigate}=payload
       try{
        const {data}=await axios.post('http://localhost:3000/register',{
            username,
            email,
            password
           })
           actions.addRegisterData(data.user)
           navigate('/login')
           toast.success("Register completed! Please login.. ",{position:'top-right'})
       }catch(e){
        console.log(e)
        actions.addRegisterError(e.response.data.message)
       }
    }),
    loginUser:thunk(async(actions,payload)=>{
        const {email,password}=payload.data
        const {navigate}=payload
        const {data}=await axios.post('http://localhost:3000/login',{
            email,
            password
        })
        actions.addUser(data.payload)
        actions.addIslogIn('true')
        localStorage.setItem("token",data.token)
        localStorage.setItem("user",JSON.stringify(data.payload))
        toast.success('Login Successfully!',{position:'top-right'})
        if(data.payload.role=='patient') return navigate('/home')
        if(data.payload.role=='doctor') return navigate('/reqAppointment')
        
    }),
    logoutUser:action((state,payload)=>{
        const {navigate}=payload
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        state.user=null
        state.isLogoutUser=true
        navigate('/login')
        
    })
}
const doctorModel={
    data:[],
    doctor:null,
    updatedAppointmentData:null,
    addData:action((state,payload)=>{
        state.data=payload
    }),
    getDoctors:thunk(async(actions,payload)=>{
        const {data}=await axios.get('http://localhost:3000/doctors')
        actions.addData(data)
    }),
    addDoctor:action((state,payload)=>{
        state.doctor=payload
    }),
    getDoctorById:thunk(async(actions,payload)=>{
        const {data}=await axios.get(`http://localhost:3000/doctor/${payload}`)
        actions.addDoctor(data)
    }),
    addUpdatedAppointmentData:action((state,payload)=>{
        state.updatedAppointmentData=payload
    }),
    updatedAppointment:thunk(async(actions,payload)=>{
        const {userID,appointmentID,patientID}=payload
        const {data}=await axios.patch(`http://localhost:3000/doctorAppointment/${userID}`,{
            appointmentID,
            patientID
        })
        actions.addUpdatedAppointmentData(data)
    })
}
const patientModel={
    patient:null,
    delteState:null,
    updatedData:null,
    addPatient:action((state,payload)=>{
        state.patient=payload
    }),
    getPatient:thunk(async(actions,payload)=>{
        const {data}=await axios.get(`http://localhost:3000/patient/${payload}`)
        actions.addPatient(data)
    }),

    addDelteState:action((state,payload)=>{
        state.delteState=payload
    }),
    deletePatientAppointment:thunk(async(actions,payload)=>{
        const {patientID,appointmentID,doctorID}=payload
        const {data}=await axios.patch(`http://localhost:3000/patientAppointment/${patientID}`,{
            appointmentID,
            doctorID
        })
        actions.addDelteState(data)
    }),
    addUpdatedData:action((state,payload)=>{
        state.updatedData=payload
    }),
    updateProfile:thunk(async(actions,payload)=>{
        const id=payload.userID
        const formData=payload.updatedFormData
        const {data}=await axios.patch(`http://localhost:3000/patient/${id}`,formData)
        actions.addUpdatedData(data)
    })

}
const testRecommendationModel={
    createTestData:null,
    updatedData:null,
    deletedData:null,
    addUpdatedData:action((state,payload)=>{
        state.updatedData=payload
    }),
    uploadTestResult:thunk(async(actions,{id,formData})=>{
        const {data}=await axios.patch(`http://localhost:3000/testRecommendations/${id}`,formData,{
            headers:{'Content-Type':'multipart/form-data'},
        })
        actions.addUpdatedData(data)
    }),
    addCreateTestData:action((state,payload)=>{
        state.createTestData=payload
    }),
    createTest:thunk(async(actions,payload)=>{
        const {testName}=payload.data
        const {apppintmentID}=payload
        const {data}=await axios.post('http://localhost:3000/testRecommendations',{
            testName,
            apppintmentID
        })
        actions.addCreateTestData(data)
    }),
    addDeletedData:action((state,payload)=>{
        state.deletedData=payload
    }),
    deleteTest:thunk(async(actions,payload)=>{
        const {data}=await axios.delete(`http://localhost:3000/testRecommendations/${payload}`)
        actions.addDeletedData(data)
    })




}
const prescriptionModel={
    data:null,
    deletedMedicin:null,
    createPresData:null,
    addDeletedMedicin:action((state,payload)=>{
        state.deletedMedicin=payload
    }),
    medicinDelete:thunk(async(actions,payload)=>{
        const {data}=await axios.delete(`http://localhost:3000/medicinInstructions/${payload}`)
        actions.addDeletedMedicin(data)
    }),
    addCreatePress:action((state,payload)=>{
        state.createPresData=payload
    }),
    createPrescription:thunk(async(actions,payload)=>{
        const {diagnosis}=payload.data
        const {appointmentID}=payload
        const {data}=await axios.post('http://localhost:3000/prescriptions',{
            diagnosis,
            appointmentID
        })
        actions.addCreatePress(data)
    })
}
const medicalRecordModel={
    data:[],
    addData:action((state,payload)=>{
        state.data=payload
    }),
    getMedicalRecord:thunk(async(actions,payload)=>{
        const {data}=await axios.get('http://localhost:3000/medicalRecord')
        actions.addData(data)
    })
}
const appointmentModel={
    updatedData:null,
    addUpdatedData:action((state,payload)=>{
        state.updatedData=payload
    }),
    updateAppointment:thunk(async(actions,payload)=>{
        console.log(payload)
        const {appointmentID,reqApplyedID}=payload
        const {date,time,googleMeetLink}=payload.data
        const {data}=await axios.patch(`http://localhost:3000/appointments/${appointmentID}`,{
            date,
            time,
            googleMeetLink,
            reqApplyedID,
            status:"Accepted"
        })
        actions.addUpdatedData(data)
    })
}
const applyedAppointmentModel={
    deleteData:null,
    addDeletedData:action((state,payload)=>{
        state.deleteData=payload
    }),
    deleteApplyedData:thunk(async(actions,payload)=>{
        const {data}=await axios.delete(`http://localhost:3000/applyForAppointments/${payload}`)
        actions.addDeletedData(data)
    })

}
const sslCommerzModel={
    url:null,
    addUrl:action((state,payload)=>{
        state.url=payload
    }),
    getUrl:thunk(async(actions,payload)=>{
        const {data}=await axios.post('http://localhost:3000/initApplyForPayment',payload)
        window.location.href=data
    })
}

const store=createStore({
    user:userModel,
    doctor:doctorModel,
    patient:patientModel,
    testRecommendation:testRecommendationModel,
    prescription:prescriptionModel,
    medicalRecord:medicalRecordModel,
    sslCommerz:sslCommerzModel,
    appointment:appointmentModel,
    applyedAppointment:applyedAppointmentModel
})

export default store;
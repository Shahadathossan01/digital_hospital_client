import axios from "axios"
import { action, createStore, thunk } from "easy-peasy"
import { toast } from "react-toastify"

const userModel={
    allUsers:[],
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
    registerUser:thunk(async(actions,{formData,navigate})=>{
       try{
        const {data}=await axios.post('http://localhost:3000/register',formData,{headers:{"Content-Type":"multipart/form-data"}})
           actions.addRegisterData(data.user)
           toast.success("Register completed!",{position:'top-right'})
           if(data.user.role=="doctor") return
           navigate('/login')
       }catch(e){
        console.log(e)
        actions.addRegisterError(e?.response?.data.message)
       }
    }),
    // registerDoctor:thunk(async(actions,{formData,navigate})=>{
       
    //    try{
    //     const {data}=await axios.post('http://localhost:3000/registerDoctor',formData,{
    //         headers:{"Content-Type":"multipart/form-data"}
    //     })
           
    //     //    navigate('/login')
    //     //    toast.success("Register completed! Please login.. ",{position:'top-right'})
    //    }catch(e){
    //     console.log(e)
    //     actions.addRegisterError(e.response.data.message)
    //    }
    // }),
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
        return navigate("/")
        
    }),
    logoutUser:action((state,payload)=>{
        const {navigate}=payload
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        state.user=null
        state.isLogoutUser=true
        navigate('/')
        
    }),
    addAllUsers:action((state,payload)=>{
        state.allUsers=payload
    }),
    getAllUsers:thunk(async(actions,payload)=>{
        const {data}=await axios.get("http://localhost:3000/users")
        actions.addAllUsers(data)
    })
}
const doctorModel={
    data:null,
    doctor:null,
    singleDoctor:null,
    updatedAppointmentData:null,
    updatedProfileData:null,
    imageData:null,
    updatedScheduleData:null,
    statusData:null,
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
    }),
    addUpdatedProrileData:action((state,payload)=>{
        state.updatedProfileData=payload
    }),
    updateProfile:thunk(async(actions,payload)=>{
        const {userID,updatedFormData}=payload
        console.log(payload)
        const {data}=await axios.patch(`http://localhost:3000/doctor/${userID}`,updatedFormData)
        actions.addUpdatedProrileData(data)
    }),
    addImageData:action((state,payload)=>{
        state.imageData=payload
    }),
    updateDoctorImage:thunk(async(actions,payload)=>{
        const {userID,formData}=payload
        const {data}=await axios.patch(`http://localhost:3000/doctorImage/${userID}`,formData,{
            headers:{'Content-Type':'multipart/form-data'}
        })
        actions.addImageData(data)
    }),
    addSingleDoctor:action((state,payload)=>{
        state.singleDoctor=payload
    }),
    getSingleDoctor:thunk(async(actions,payload)=>{
        const {data}=await axios.get(`http://localhost:3000/doctor/${payload}`)
        actions.addSingleDoctor(data)
    }),
    addUpdatedScheduleData:action((state,payload)=>{
        state.updatedScheduleData=payload
    }),
    updateSchedule:thunk(async(actions,payload)=>{
        const {doctorID,schedule}=payload
        console.log("finding",schedule)
        const {data}=await axios.patch(`http://localhost:3000/doctorSchedule/${doctorID}`,{
            schedule
        })
        actions.addUpdatedScheduleData(data)
    }),
    addStatusData:action((state,payload)=>{
        state.statusData=payload
    }),
    updateScheduleStatus:thunk(async(actions,payload)=>{
        const {doctorID,scheduleID,status}=payload
        const {data}=await axios.patch('http://localhost:3000/doctorScheduleStatus',{
            doctorID,
            scheduleID,
            status
        })
        actions.addStatusData(data)
    }),
    updateScheduleSlotStatus:thunk(async(actions,payload)=>{
        const {doctorID,scheduleID,slotID,time,status}=payload
        const {data}=await axios.patch('http://localhost:3000/doctorScheduleSlotStatus',{
            doctorID,
            scheduleID,
            slotID,
            time,
            status
        })
        actions.addStatusData(data)
    }),
    addNewSlot:thunk(async(actions,payload)=>{
        const {doctorID,scheduleID}=payload
        const {data}=await axios.patch(`http://localhost:3000/doctors/${doctorID}/schedule/${scheduleID}`)
        actions.addStatusData(data)
    }),
    deleteSlot:thunk(async(actions,payload)=>{
        const {doctorID,scheduleID,slotID}=payload
        const {data}=await axios.delete(`http://localhost:3000/doctors/${doctorID}/schedule/${scheduleID}/slot/${slotID}`)
        actions.addStatusData(data)
    }),
    
}
const patientModel={
    patient:null,
    delteState:null,
    updatedData:null,
    patientImageData:null,
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
    }),
    addPatientImageData:action((state,payload)=>{
        state.patientImageData=payload
    }),
    updatePatientImage:thunk(async(actions,payload)=>{
        const {userID,formData}=payload
        console.log(userID)
        const {data}=await axios.patch(`http://localhost:3000/patientImage/${userID}`,formData,{
            headers:{'Content-Type':'multipart/form-data'}
        })
        actions.addPatientImageData(data)
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
    updatedDiag:null,
    medicineData:null,
    instructionData:null,
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
    }),
    addUpdatedDiag:action((state,payload)=>{
        state.updatedDiag=payload
    }),
    updateDiagnosis:thunk(async(actions,payload)=>{
        const {id}=payload
        const {diagnosis}=payload.data
        const {data}=await axios.patch(`http://localhost:3000/prescriptions/${id}`,{
            diagnosis
        })
        actions.addUpdatedDiag(data)
    }),
    addMedicineData:action((state,payload)=>{
        state.medicineData=payload
    }),
    createMedicine:thunk(async(actions,payload)=>{
        const {medicinName,dosage,frequency,duration}=payload.data
        const {prescriptionID}=payload
        const {data}=await axios.post('http://localhost:3000/medicinInstructions',{
            medicinName,
            dosage,
            frequency,
            duration,
            prescriptionID
        })
        actions.addMedicineData(data)
    }),
    addAdditionalInstruction:action((state,payload)=>{
        state.instructionData=payload
    }),
    updateAdditionalInstruction:thunk(async(actions,payload)=>{
        const {prescriptionID}=payload
        const {instruction}=payload.data
        const {data}=await axios.patch(`http://localhost:3000/prescriptions/${prescriptionID}`,{
            instruction
        })
        actions.addAdditionalInstruction(data)
    }),
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
    appointments:[],
    addAppointments:action((state,payload)=>{
        state.appointments=payload
    }),
    updatedData:null,
    addUpdatedData:action((state,payload)=>{
        state.updatedData=payload
    }),
    updateAppointment:thunk(async(actions,payload)=>{
        const {appointmentID,reqApplyedID,date,time}=payload
        const {googleMeetLink}=payload.data
        const {data}=await axios.patch(`http://localhost:3000/appointments/${appointmentID}`,{
            date,
            time,
            googleMeetLink,
            reqApplyedID,
            status:"confirmed"
        })
        actions.addUpdatedData(data)
    }),
    getAppointments:thunk(async(actions,payload)=>{
        const {data}=await axios.get("http://localhost:3000/appointments")
        actions.addAppointments(data)
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
const adminModel={
    data:null,
    deletedData:null,
    allUserData:[],
    addUserData:action((state,payload)=>{
        state.data=payload
    }),
    addUser:thunk(async(actions,payload)=>{
        const {username,email,password,role}=payload.data
        try{
         const {data}=await axios.post('http://localhost:3000/register',{
             username,
             email,
             password,
             role,
            })
            actions.addUserData(data.user)
            toast.success("Created New User.",{position:'top-right'})
        }catch(e){
         console.log(e)
        }
     }),
     addAllUserData:action((state,payload)=>{
        state.allUserData=payload
     }),
     getAllUser:thunk(async(actions,payload)=>{
        const {data}=await axios.get('http://localhost:3000/users')
        actions.addAllUserData(data)
     }),
     addDeletedData:action((state,payload)=>{
        state.deletedData=payload
     }),
     deleteUser:thunk(async(actions,payload)=>{
        const {data}=await axios.delete(`http://localhost:3000/users/${payload}`)
        actions.addDeletedData(data)
     })
}
const promoCodeModel={
    createdPromoData:null,
    allPromoData:[],
    percentage:0,
    error:null,
    deletedData:null,
    updatedData:null,
    addError:action((state,payload)=>{
        state.error=payload
    }),
    addPercentage:action((state,payload)=>{
        state.percentage=payload
    }),
    addPromoData:action((state,payload)=>{
        state.createdPromoData=payload
    }),
    createPromoCode:thunk(async(actions,{data:createData})=>{
        try{
            const {data}=await axios.post(`http://localhost:3000/promoCode`,createData)
            console.log(data)
            actions.addPromoData(data)
            actions.addError(null)
            toast.success("Created a New Promo Code",{position:'top-right'})
        }catch(e){
            actions.addError(e?.response?.data?.message)
        }
    }),
    addAllPromoData:action((state,payload)=>{
        state.allPromoData=payload
    }),
    getAllPromoCode:thunk(async(actions,payload)=>{
        const {data}=await axios.get('http://localhost:3000/promoCodes')
        actions.addAllPromoData(data)
    }),
    getPercentage:thunk(async(actions,payload)=>{
        try{
            const {data}=await axios.post('http://localhost:3000/promoCodeValidate',{code:payload})
        console.log(data)
        if(data.valid){
            actions.addPercentage(data.percentage)
            actions.addError(null)
        }else{
            actions.addPercentage(0)
            actions.addError(data.message)
        }
    }catch(error){
            actions.addPercentage(0)
            actions.addError(error.response?.data?.message || "Something went Wrong")
        }
    }),
    addDeletedData:action((state,payload)=>{
        state.deletedData=payload
    }),
    deletePromoCode:thunk(async(actions,{id})=>{
        try{
            const {data}=await axios.delete(`http://localhost:3000/promoCodes/${id}`)
            console.log(data)
            actions.addDeletedData(data)
            actions.addError(null)
            toast.success("Deleted Successfully",{position:'top-right'})
        }catch(e){
            actions.addError(e?.response?.data?.message)
        }

    }),
    addUpdatedData:action((state,payload)=>{
        state.updatedData=payload
    }),
    updatePromoCode:thunk(async(actions,{id,data:updateData})=>{
        try{
            const {data}=await axios.patch(`http://localhost:3000/promoCodes/${id}`,updateData)
            actions.addUpdatedData(data)
        }catch(e){
            console.log(e)
        }
    }),

    resetPercentage:action((state,payload)=>{
        state.percentage=0
        state.error=null
    })
}
const superAdminModel={
    createdData:null,
    addCreatedAdmin:action((state,payload)=>{
        state.createdData=payload
    }),
    createSuperAdmin:thunk(async(actions,payload)=>{
        const {data}=await axios.post(`http://localhost:3000/register`,{
            username:"Super Admin",
            email:"super_admin@gmail.com",
            password:"super_admin@1",
            role:"super_admin"
        })
        actions.addCreatedAdmin(data)
    }),
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
    applyedAppointment:applyedAppointmentModel,
    admin:adminModel,
    promoCode:promoCodeModel,
    superAdmin:superAdminModel
})

export default store;
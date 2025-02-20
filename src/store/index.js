import axios from "axios"
import { action, createStore, thunk } from "easy-peasy"
import { toast } from "react-toastify"
const api_base_url=import.meta.env.VITE_API_BASE_URL
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
    registerUser:thunk(async(actions,{formData,navigate,credential})=>{
        console.log(formData)
       try{
        const {data}=await axios.post(`${api_base_url}/api/register`,formData,{headers:{"Content-Type":"multipart/form-data"}})
           toast.success(data.message,{position:'top-right'})
           if(data.success){
               navigate(`/otp-verification/${credential}`);
           }
       }catch(e){
        console.log(e)
        actions.addRegisterError(e?.response?.data.message)
       }
    }),
    otpVerify:thunk(async(actions,{verifyingData,navigate})=>{
        try{
            const {data}= await axios.post(`${api_base_url}/api/otp-verification`,verifyingData)
            if(data.success){
                if(data?.user?.role=="patient"){
                    toast.success(data.message,{position:'top-right'})
                    actions.addUser(data.user)
                    actions.addIslogIn('true')
                    localStorage.setItem("token",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    navigate("/")
                  }
                if(data?.user?.role=="doctor"){
                    toast.success("Successfully Created New Doctor Account.",{position:'top-right'})
                    navigate("/")
                }  

            }
        }catch(error){
            console.log(error)
        }
    }),
    loginUser:thunk(async(actions,{loginData,from,navigate})=>{
        console.log(loginData)
        const {data}=await axios.post(`${api_base_url}/api/login`,loginData)
        if(data.success){
            toast.success(data.message,{position:'top-right'})
            actions.addUser(data.user)
            actions.addIslogIn('true')
            localStorage.setItem("token",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            if(data?.user?.role=="patient"){
                navigate(from,{replace:true})
                return
              }
            
               navigate("/")
        }
        // const {data}=await axios.post(`${api_base_url}/api/login`,{
        //     email,
        //     password
        // })
        // actions.addUser(data.payload)
        // actions.addIslogIn('true')
        // localStorage.setItem("token",data.token)
        // localStorage.setItem("user",JSON.stringify(data.payload))
        // toast.success('Login Successfully!',{position:'top-right'})
        
        
    }),
    addLogoutData:action((state)=>{
        state.user=null
        state.isLogoutUser=true
    }),
    logoutUser:thunk(async(actions,{token})=>{
        const {data}=await axios.get(`${api_base_url}/api/logout`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        if(data.success){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        actions.addLogoutData()
        toast.success(data.message)
        }
    }),
    addAllUsers:action((state,payload)=>{
        state.allUsers=payload
    }),
    getAllUsers:thunk(async(actions)=>{
        const {data}=await axios.get(`${api_base_url}/api/users`)
        actions.addAllUsers(data)
    }),
    sendResetLink:thunk(async(actions,{credential})=>{
        try{
            const {data}=await axios.post(`http://localhost:3000/api/forgotPassword`,{credential})
            if(data.success){
                toast.success(data?.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
        
    }),
    resetPassword:thunk(async(actions,{password,confirmPassword,resetToken,navigate,from})=>{
       try{
        const {data}=await axios.put(`${api_base_url}/api/password/reset/${resetToken}`,{password,confirmPassword})
        if(data.success){
            toast.success(data.message,{position:'top-right'})
            actions.addUser(data.user)
            actions.addIslogIn('true')
            localStorage.setItem("token",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            if(data?.user?.role=="patient"){
                navigate(from,{replace:true})
                return
              }
            navigate("/")
        }
       }catch(error){
        toast.error(error?.response?.data?.message)
       }
    })
}
const doctorModel={
    data:[],
    doctor:null,
    singleDoctor:null,
    updatedAppointmentData:null,
    updatedProfileData:null,
    imageData:null,
    updatedScheduleData:null,
    statusData:null,
    deleteDoctorData:null,
    addData:action((state,payload)=>{
        state.data=payload
    }),
    getDoctors:thunk(async(actions)=>{
        const {data}=await axios.get(`${api_base_url}/api/doctors`)
        actions.addData(data)
    }),
    addDoctor:action((state,payload)=>{
        state.doctor=payload
    }),
    getDoctorById:thunk(async(actions,payload)=>{
        const {data}=await axios.get(`${api_base_url}/api/doctors/${payload}`)
        actions.addDoctor(data)
    }),
    addUpdatedAppointmentData:action((state,payload)=>{
        state.updatedAppointmentData=payload
    }),
    updatedAppointment:thunk(async(actions,payload)=>{
        const {userID,appointmentID,patientID}=payload
        const {data}=await axios.patch(`${api_base_url}/api/doctorAppointment/${userID}`,{
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
        console.log(userID,updatedFormData)
        const {data}=await axios.patch(`${api_base_url}/api/doctors/${userID}`,updatedFormData)
        actions.addUpdatedProrileData(data)
    }),
    addImageData:action((state,payload)=>{
        state.imageData=payload
    }),
    updateDoctorImage:thunk(async(actions,payload)=>{
        const {userID,formData}=payload
        const {data}=await axios.patch(`${api_base_url}/api/doctorImage/${userID}`,formData,{
            headers:{'Content-Type':'multipart/form-data'}
        })
        actions.addImageData(data)
    }),
    addSingleDoctor:action((state,payload)=>{
        state.singleDoctor=payload
    }),
    getSingleDoctor:thunk(async(actions,payload)=>{
        const {data}=await axios.get(`${api_base_url}/api/doctors/${payload}`)
        actions.addSingleDoctor(data)
    }),
    addUpdatedScheduleData:action((state,payload)=>{
        state.updatedScheduleData=payload
    }),
    updateSchedule:thunk(async(actions,payload)=>{
        const {doctorID,schedule}=payload
        console.log("finding",schedule)
        const {data}=await axios.patch(`${api_base_url}/api/doctorSchedule/${doctorID}`,{
            schedule
        })
        actions.addUpdatedScheduleData(data)
    }),
    addStatusData:action((state,payload)=>{
        state.statusData=payload
    }),
    updateScheduleStatus:thunk(async(actions,payload)=>{
        const {doctorID,scheduleID,status}=payload
        const {data}=await axios.patch(`${api_base_url}/api/doctorScheduleStatus`,{
            doctorID,
            scheduleID,
            status
        })
        actions.addStatusData(data)
    }),
    updateScheduleSlotStatus:thunk(async(actions,payload)=>{
        const {doctorID,scheduleID,slotID,formatedTime,status}=payload
        const {data}=await axios.patch(`${api_base_url}/api/doctorScheduleSlotStatus`,{
            doctorID,
            scheduleID,
            slotID,
            time:formatedTime,
            status
        })
        actions.addStatusData(data)
    }),
    addNewSlot:thunk(async(actions,payload)=>{
        const {doctorID,scheduleID}=payload
        const {data}=await axios.patch(`${api_base_url}/api/doctors/${doctorID}/schedule/${scheduleID}`)
        actions.addStatusData(data)
    }),
    deleteSlot:thunk(async(actions,payload)=>{
        const {doctorID,scheduleID,slotID}=payload
        const {data}=await axios.delete(`${api_base_url}/api/doctors/${doctorID}/schedule/${scheduleID}/slot/${slotID}`)
        actions.addStatusData(data)
    }),
    addDeleteDoctorData:action((state,payload)=>{
        state.deleteDoctorData=payload
    }),
    deleteDoctor:thunk(async(actions,payload)=>{
        const {id}=payload
        const {data}=await axios.delete(`${api_base_url}/api/users/${id}`)
        actions.addDeleteDoctorData(data)
    })
    
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
        const {data}=await axios.get(`${api_base_url}/api/patient/${payload}`)
        actions.addPatient(data)
    }),

    addDelteState:action((state,payload)=>{
        state.delteState=payload
    }),
    deletePatientAppointment:thunk(async(actions,payload)=>{
        const {patientID,appointmentID,doctorID}=payload
        const {data}=await axios.patch(`${api_base_url}/api/patientAppointment/${patientID}`,{
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
        const {data}=await axios.patch(`${api_base_url}/api/patient/${id}`,formData)
        actions.addUpdatedData(data)
    }),
    addPatientImageData:action((state,payload)=>{
        state.patientImageData=payload
    }),
    updatePatientImage:thunk(async(actions,payload)=>{
        const {userID,formData}=payload
        console.log(userID)
        const {data}=await axios.patch(`${api_base_url}/api/patientImage/${userID}`,formData,{
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
        const {data}=await axios.patch(`${api_base_url}/api/testRecommendations/${id}`,formData,{
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
        const {data}=await axios.post(`${api_base_url}/api/testRecommendations`,{
            testName,
            apppintmentID
        })
        actions.addCreateTestData(data)
    }),
    addDeletedData:action((state,payload)=>{
        state.deletedData=payload
    }),
    deleteTest:thunk(async(actions,payload)=>{
        const {data}=await axios.delete(`${api_base_url}/api/testRecommendations/${payload}`)
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
        const {data}=await axios.delete(`${api_base_url}/api/medicinInstructions/${payload}`)
        actions.addDeletedMedicin(data)
    }),
    addCreatePress:action((state,payload)=>{
        state.createPresData=payload
    }),
    createPrescription:thunk(async(actions,payload)=>{
        const {diagnosis}=payload.data
        const {appointmentID}=payload
        const {data}=await axios.post(`${api_base_url}/api/prescriptions`,{
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
        const {data}=await axios.patch(`${api_base_url}/api/prescriptions/${id}`,{
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
        const {data}=await axios.post(`${api_base_url}/api/medicinInstructions`,{
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
        const {data}=await axios.patch(`${api_base_url}/api/prescriptions/${prescriptionID}`,{
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
    getMedicalRecord:thunk(async(actions)=>{
        const {data}=await axios.get(`${api_base_url}/api/medicalRecord`)
        actions.addData(data)
    })
}
const appointmentModel={
    appointmentByIdData:[],
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
        const {data}=await axios.patch(`${api_base_url}/api/appointments/${appointmentID}`,{
            date,
            time,
            googleMeetLink,
            reqApplyedID,
            status:"confirmed"
        })
        actions.addUpdatedData(data)
    }),
    getAppointments:thunk(async(actions)=>{
        const {data}=await axios.get(`${api_base_url}/api/appointments`)
        actions.addAppointments(data)
    }),
    addGetAppointmentById:action((state,payload)=>{
        state.appointmentByIdData=payload
    }),
    getAppointmentByid:thunk(async(actions,payload)=>{
        console.log(payload)
        const {data}=await axios.get(`${api_base_url}/api/appointments/${payload}`)
        actions.addGetAppointmentById(data)
    })

}
const applyedAppointmentModel={
    deleteData:null,
    addDeletedData:action((state,payload)=>{
        state.deleteData=payload
    }),
    deleteApplyedData:thunk(async(actions,payload)=>{
        const {data}=await axios.delete(`${api_base_url}/api/applyForAppointments/${payload}`)
        actions.addDeletedData(data)
    })

}
const sslCommerzModel={
    url:null,
    addUrl:action((state,payload)=>{
        state.url=payload
    }),
    getUrl:thunk(async(actions,payload)=>{
        const {data}=await axios.post(`${api_base_url}/api/initApplyForPayment`,payload)
        window.location.href=data
    })
}
const freeAppointmentModel={
    data:null,
    addData:action((state,payload)=>{
        state.data=payload
    }),
    createFreeAppointment:thunk(async(actions,{payload,navigate})=>{
        const {data}=await axios.post(`${api_base_url}/api/freeAppointments`,payload)
        toast.success("Free Appointment Created!",{position:'top-right'})
        if(!data) return null
        navigate(`/successFreeAppointment/${data.freeAppointmentId}`)
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
         const {data}=await axios.post(`${api_base_url}/api/register`,{
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
     getAllUser:thunk(async(actions)=>{
        const {data}=await axios.get(`${api_base_url}/api/users`)
        actions.addAllUserData(data)
     }),
     addDeletedData:action((state,payload)=>{
        state.deletedData=payload
     }),
     deleteUser:thunk(async(actions,payload)=>{
        const {data}=await axios.delete(`${api_base_url}/api/users/${payload}`)
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
            const {data}=await axios.post(`${api_base_url}/api/promoCode`,createData)
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
    getAllPromoCode:thunk(async(actions)=>{
        const {data}=await axios.get(`${api_base_url}/api/promoCodes`)
        actions.addAllPromoData(data)
    }),
    getPercentage:thunk(async(actions,payload)=>{
        try{
            const {data}=await axios.post(`${api_base_url}/api/promoCodeValidate`,{code:payload})
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
            const {data}=await axios.delete(`${api_base_url}/api/promoCodes/${id}`)
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
            const {data}=await axios.patch(`${api_base_url}/api/promoCodes/${id}`,updateData)
            actions.addUpdatedData(data)
        }catch(e){
            console.log(e)
        }
    }),

    resetPercentage:action((state)=>{
        state.percentage=0
        state.error=null
    })
}
const superAdminModel={
    createdData:null,
    addCreatedAdmin:action((state,payload)=>{
        state.createdData=payload
    }),
    createSuperAdmin:thunk(async(actions)=>{
        const {data}=await axios.post(`${api_base_url}/api/register`,{
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
    superAdmin:superAdminModel,
    freeAppointment:freeAppointmentModel
})

export default store;
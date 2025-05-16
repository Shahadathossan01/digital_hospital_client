import axios from "axios"
import { action, createStore, thunk } from "easy-peasy"
import { act } from "react"
import { toast } from "react-toastify"
const api_base_url=import.meta.env.VITE_API_BASE_URL
const token=localStorage.getItem('token') || null

const userModel={
    allUsers:[],
    registerData:null,
    registerError:null,
    isLogoutUser:false,
    loginError:null,
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
       try{
        const {data}=await axios.post(`${api_base_url}/api/register`,formData,{headers:{"Content-Type":"multipart/form-data"}})
           toast.success(data.message,{position:'top-right'})
           if(data.success){
               navigate(`/otp-verification/${credential}`);
           }
       }catch(e){
        console.log(e)
        toast.error(e?.response?.data.message)
        actions.addRegisterError({
            field: e?.response?.data?.field || null,
            message: e?.response?.data?.message || "Something went wrong"
        });
       }
    }),
    otpVerify:thunk(async(actions,{verifyingData,navigate})=>{
        try{
            const {data}= await axios.post(`${api_base_url}/api/otp-verification`,verifyingData)
            if(data.success){
                if(data?.user?.role=="patient" || data?.user?.role=="healthHub"){
                    toast.success(data.message,{position:'top-right'})
                    actions.addUser(data.user)
                    actions.addIslogIn('true')
                    localStorage.setItem("token",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    navigate("/")
                  }
                if(data?.user?.role=="doctor"){
                    toast.success("Successfully Created New Doctor Account. Please Login.",{position:'top-right'})
                    navigate("/")
                }  

            }
        }catch(error){
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }),
    addLoginError:action((state,payload)=>{
        state.loginError=payload
    }),
    loginUser:thunk(async(actions,{loginData,from,navigate})=>{

        try{
            const {data}=await axios.post(`${api_base_url}/api/login`,loginData)
        if(data.success){
            actions.addUser(data.user)
            actions.addIslogIn('true')
            localStorage.setItem("token",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            
            if (data?.user?.forcePasswordReset) {
                toast.success('Reset Your Password!')
                navigate(`/completeForceRestFrom/${data.user.credential}`);
                return;
            }
            if(data?.user?.role=="patient" || data?.user?.role=="healthHub"){
                toast.success(data.message,{position:'top-right'})
                navigate(from,{replace:true})
                return
            }
            
               toast.success(data.message,{position:'top-right'})
               navigate("/")
        }
        }catch(error){
            console.log(error)
            actions.addLoginError(error?.response?.data?.message)
        }
    }),
    addLogoutData:action((state)=>{
        state.user=null
        state.isLogoutUser=true
    }),
    logoutUser:thunk(async(actions)=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        actions.addLogoutData()
        toast.success('Logout Successful.')
    }),
    addAllUsers:action((state,payload)=>{
        state.allUsers=payload
    }),
    getAllUsers:thunk(async(actions)=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.get(`${api_base_url}/api/users`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addAllUsers(data)
    }),
    sendResetLink:thunk(async(actions,{credential})=>{
        try{
            const {data}=await axios.post(`${api_base_url}/api/forgotPassword`,{credential},)
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
    isLoading:false,
    data:[],
    doctor:null,
    singleDoctor:null,
    updatedAppointmentData:null,
    updatedProfileData:null,
    imageData:null,
    updatedScheduleData:null,
    statusData:null,
    deleteDoctorData:null,
    requestedDoctor:[],
    addData:action((state,payload)=>{
        state.data=payload
    }),
    addLoading:action((state,payload)=>{
        state.isLoading=payload
    }),
    getDoctors:thunk(async(actions)=>{
        try{
            actions.addLoading(true)
            const {data}=await axios.get(`${api_base_url}/api/doctors`)
            actions.addData(data)
            actions.addLoading(false)
        }catch(e){
            console.log(e)
        }finally{
            actions.addLoading(false)
        }
    }),
    addRequestedDoctor:action((state,payload)=>{
        state.requestedDoctor=payload
    }),
    getRequestedDoctors:thunk(async(actions)=>{
        const token=localStorage.getItem('token') || null

        try{
            actions.addLoading(true)
            const {data}=await axios.get(`${api_base_url}/api/doctors/requested`,{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })
            actions.addRequestedDoctor(data)
            actions.addLoading(false)
        }catch(e){
            console.log(e)
        }finally{
            actions.addLoading(false)
        }
    }),
    addDoctor:action((state,payload)=>{
        state.doctor=payload
    }),
    getDoctorById:thunk(async(actions,payload)=>{
        // const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.get(`${api_base_url}/api/doctors/${payload}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addDoctor(data)
        }catch(e){
            console.log(e)
        }
    }),
    addUpdatedAppointmentData:action((state,payload)=>{
        state.updatedAppointmentData=payload
    }),
    updatedAppointment:thunk(async(actions,payload)=>{
        const {userID,appointmentID,patientID}=payload
         const token=localStorage.getItem('token') || null
        const {data}=await axios.patch(`${api_base_url}/api/doctorAppointment/${userID}`,{
            appointmentID,
            patientID
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addUpdatedAppointmentData(data)
    }),
    addUpdatedProrileData:action((state,payload)=>{
        state.updatedProfileData=payload
    }),
    updateProfile:thunk(async(actions,payload)=>{
        const {userID,updatedFormData}=payload
         const token=localStorage.getItem('token') || null

         try{
             const {data}=await axios.patch(`${api_base_url}/api/doctors/${userID}`,updatedFormData,{
                 headers:{
                     Authorization: `Bearer ${token}`
                 }
             })
             actions.addUpdatedProrileData(data)

         }catch(e){
            console.log(e)
         }
    }),
    addImageData:action((state,payload)=>{
        state.imageData=payload
    }),
    updateDoctorImage:thunk(async(actions,payload)=>{
        const {userID,formData}=payload
         const token=localStorage.getItem('token') || null

         try{
             const {data}=await axios.patch(`${api_base_url}/api/doctorImage/${userID}`,formData,{
                 headers:{'Content-Type':'multipart/form-data',Authorization: `Bearer ${token}`}
             })
             actions.addImageData(data)

         }catch(e){
            console.log(e)
         }
    }),
    addSingleDoctor:action((state,payload)=>{
        state.singleDoctor=payload
    }),
    getSingleDoctor:thunk(async(actions,payload)=>{
         const token=localStorage.getItem('token') || null

         try{
             const {data}=await axios.get(`${api_base_url}/api/doctors/${payload}`,{
                 headers:{
                     Authorization: `Bearer ${token}`
                 }
             })
             actions.addSingleDoctor(data)

         }catch(e){
            console.log(e)
         }
    }),
    addUpdatedScheduleData:action((state,payload)=>{
        state.updatedScheduleData=payload
    }),
    updateSchedule:thunk(async(actions,payload)=>{
        const {doctorID,schedule}=payload
         const token=localStorage.getItem('token') || null

         try{
             const {data}=await axios.patch(`${api_base_url}/api/doctorSchedule/${doctorID}`,{
                 schedule
             },{
                 headers:{
                     Authorization: `Bearer ${token}`
                 }
             })
             actions.addUpdatedScheduleData(data)

         }catch(e){
            console.log(e)
         }
    }),
    addStatusData:action((state,payload)=>{
        state.statusData=payload
    }),
    updateScheduleStatus:thunk(async(actions,payload)=>{
        const {doctorID,scheduleID,status}=payload
         const token=localStorage.getItem('token') || null

         try{
             const {data}=await axios.patch(`${api_base_url}/api/doctorScheduleStatus`,{
                 doctorID,
                 scheduleID,
                 status
             },{
                 headers:{
                     Authorization: `Bearer ${token}`
                 }
             })
             actions.addStatusData(data)

         }catch(e){
            console.log(e)
         }
    }),
    updateScheduleSlotStatus:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {doctorID,scheduleID,slotID,formatedTime,status}=payload
        
        try{
            const {data}=await axios.patch(`${api_base_url}/api/doctorScheduleSlotStatus`,{
                doctorID,
                scheduleID,
                slotID,
                time:formatedTime,
                status
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            actions.addStatusData(data)

        }catch(e){
            console.log(e)
        }
    }),
    addNewSlot:thunk(async(actions,payload)=>{
         const token=localStorage.getItem('token') || null
        const {doctorID,scheduleID}=payload

        try{
            const {data}=await axios.patch(`${api_base_url}/api/doctors/${doctorID}/schedule/${scheduleID}`,{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            actions.addStatusData(data)

        }catch(e){
            console.log(e)
        }
    }),
    deleteSlot:thunk(async(actions,payload)=>{
        const {doctorID,scheduleID,slotID}=payload
         const token=localStorage.getItem('token') || null

         try{
             const {data}=await axios.delete(`${api_base_url}/api/doctors/${doctorID}/schedule/${scheduleID}/slot/${slotID}`,{
                 headers:{
                     Authorization: `Bearer ${token}`
                 }
             })
             actions.addStatusData(data)

         }catch(e){
            console.log(e)
         }
    }),
    addDeleteDoctorData:action((state,payload)=>{
        state.deleteDoctorData=payload
    }),
    deleteDoctor:thunk(async(actions,payload)=>{
        const {id}=payload
         const token=localStorage.getItem('token') || null

         try{
             const {data}=await axios.delete(`${api_base_url}/api/users/${id}`,{
                 headers:{
                     Authorization: `Bearer ${token}`
                 }
             })
             actions.addDeleteDoctorData(data)

         }catch(e){
            console.log(e)
         }
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
    getPatient:thunk(async(actions,{id})=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.get(`${api_base_url}/api/patient/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addPatient(data)
    }),

    addDelteState:action((state,payload)=>{
        state.delteState=payload
    }),
    deletePatientAppointment:thunk(async(actions,payload)=>{
        const {patientID,appointmentID,doctorID}=payload
        const token=localStorage.getItem('token') || null
        const {data}=await axios.patch(`${api_base_url}/api/patientAppointment/${patientID}`,{
            appointmentID,
            doctorID
        },{headers:{
                Authorization: `Bearer ${token}`
            }})
        actions.addDelteState(data)
    }),
    addUpdatedData:action((state,payload)=>{
        state.updatedData=payload
    }),
    updateProfile:thunk(async(actions,payload)=>{
        const id=payload.userID
        const token=localStorage.getItem('token') || null
        const formData=payload.updatedFormData
        const {data}=await axios.patch(`${api_base_url}/api/patient/${id}`,formData,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addUpdatedData(data)
    }),
    addPatientImageData:action((state,payload)=>{
        state.patientImageData=payload
    }),
    updatePatientImage:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {userID,formData}=payload
        const {data}=await axios.patch(`${api_base_url}/api/patientImage/${userID}`,formData,{
            headers:{'Content-Type':'multipart/form-data',Authorization: `Bearer ${token}`}
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
        const token=localStorage.getItem('token') || null
        const {data}=await axios.patch(`${api_base_url}/api/testRecommendations/${id}`,formData,{
            headers:{'Content-Type':'multipart/form-data',Authorization: `Bearer ${token}`},
        })
        actions.addUpdatedData(data)
    }),
    addCreateTestData:action((state,payload)=>{
        state.createTestData=payload
    }),
    createTest:thunk(async(actions,payload)=>{
        const {testName}=payload.data
        const token=localStorage.getItem('token') || null
        const {apppintmentID}=payload
        const {data}=await axios.post(`${api_base_url}/api/testRecommendations`,{
            testName,
            apppintmentID
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addCreateTestData(data)
    }),
    addDeletedData:action((state,payload)=>{
        state.deletedData=payload
    }),
    deleteTest:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.delete(`${api_base_url}/api/testRecommendations/${payload}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addDeletedData(data)
    })

}
const prescriptionModel={
    data:null,
    deletedMedicin:null,
    createPresData:null,
    updatedData:null,
    medicineData:null,
    instructionData:null,
    getPrescriptionByIdData:null,
    addDeletedMedicin:action((state,payload)=>{
        state.deletedMedicin=payload
    }),
    medicinDelete:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.delete(`${api_base_url}/api/medicinInstructions/${payload}`,{
             headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addDeletedMedicin(data)
    }),
    addCreatePress:action((state,payload)=>{
        state.createPresData=payload
    }),
    createPrescription:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {problem}=payload.data
        const {appointmentID}=payload
        const {data}=await axios.post(`${api_base_url}/api/prescriptions`,{
            problem,
            appointmentID
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addCreatePress(data)
    }),
    addUpdatedPrescriptionData:action((state,payload)=>{
        state.updatedData=payload
    }),
    updatePrescription:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {id}=payload
        const {data:updatedData}=payload
        const {data}=await axios.patch(`${api_base_url}/api/prescriptions/${id}`,{
            updatedData
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addUpdatedPrescriptionData(data)
    }),
    addMedicineData:action((state,payload)=>{
        state.medicineData=payload
    }),
    createMedicine:thunk(async(actions,payload)=>{
        const {medicinName,dosage,frequency,duration}=payload.data
        const token=localStorage.getItem('token') || null;
        const {prescriptionID}=payload
        const {data}=await axios.post(`${api_base_url}/api/medicinInstructions`,{
            medicinName,
            dosage,
            frequency,
            duration,
            prescriptionID
        },{
             headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addMedicineData(data)
    }),
    addAdditionalInstruction:action((state,payload)=>{
        state.instructionData=payload
    }),
    updateAdditionalInstruction:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {prescriptionID}=payload
        const {advice}=payload.data
        const {data}=await axios.patch(`${api_base_url}/api/prescriptions/${prescriptionID}`,{
            advice
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addAdditionalInstruction(data)
    }),
    addGetPrescriptionByid:action((state,payload)=>{
        state.getPrescriptionByIdData=payload
    }),
    getPrescriptionById:thunk(async(actions,{id})=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.get(`${api_base_url}/api/prescriptions/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addGetPrescriptionByid(data)
    })
}
const medicalRecordModel={
    data:[],
    addData:action((state,payload)=>{
        state.data=payload
    }),
    getMedicalRecord:thunk(async(actions)=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.get(`${api_base_url}/api/medicalRecord`,{
             headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addData(data)
    })
}
const appointmentModel={
    appointmentByIdData:null,
    updatedData:null,
    appointments:[],
    updatedStatusData:null,
    updatedRefPayment:null,
    addAppointments:action((state,payload)=>{
        state.appointments=payload
    }),
    addUpdatedData:action((state,payload)=>{
        state.updatedData=payload
    }),
    updateAppointment:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        try{
            const {appointmentID,reqApplyedID,date,time}=payload
        const {googleMeetLink}=payload.data
        const {data}=await axios.patch(`${api_base_url}/api/appointments/${appointmentID}`,{
            date,
            time,
            googleMeetLink,
            reqApplyedID,
            status:"confirmed"
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addUpdatedData(data)
        }catch(e){
            console.log(e)
        }
    }),
    getAppointments:thunk(async(actions)=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.get(`${api_base_url}/api/appointments`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addAppointments(data)
    }),
    addGetAppointmentById:action((state,payload)=>{
        state.appointmentByIdData=payload
    }),
    getAppointmentByid:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.get(`${api_base_url}/api/appointments/${payload}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addGetAppointmentById(data)
    }),
    resetAppointmentByIdData:action((state,payload)=>{
        state.appointmentByIdData=null
    }),
    addedUpdatedStatusData:action((state,payload)=>{
        state.updatedStatusData=payload
    }),
    updateStatus:thunk(async(actions,{id})=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.patch(`${api_base_url}/api/appointments/status/${id}`,{},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addedUpdatedStatusData(data)
    }),
    addUpdatedRefPayment:action((state,payload)=>{
        state.updatedRefPayment=payload
    }),
    updateReferredPayment:thunk(async(actions,{id,referredPayment})=>{
        const token=localStorage.getItem('token') || null;
        const {data}=await axios.patch(`${api_base_url}/api/appointments/referredPayment/${id}`,{
            referredPayment
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addUpdatedRefPayment(data)
    })

}
const applyedAppointmentModel={
    deleteData:null,
    addDeletedData:action((state,payload)=>{
        state.deleteData=payload
    }),
    deleteApplyedData:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.delete(`${api_base_url}/api/applyForAppointments/${payload}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addDeletedData(data)
    })

}
const sslCommerzModel={
    url:null,
    addUrl:action((state,payload)=>{
        state.url=payload
    }),
    getUrl:thunk(async(actions,{payload})=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.post(`${api_base_url}/api/initApplyForPayment`,payload,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            window.location.href=data

        }catch(error){
            console.log(error)
        }
    })
}
const freeAppointmentModel={
    data:null,
    addData:action((state,payload)=>{
        state.data=payload
    }),
    createFreeAppointment:thunk(async(actions,{payload,navigate})=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.post(`${api_base_url}/api/freeAppointments`,payload,{
             headers:{
                Authorization:`Bearer ${token}`
            }
        })
        toast.success("Free Appointment Created!",{position:'top-right'})
        if(!data) return null
        navigate(`/successFreeAppointment/${data.freeAppointmentId}`)
    })
}
const adminModel={
    data:null,
    deletedData:null,
    allUserData:[],
    addAdminData:action((state,payload)=>{
        state.data=payload
    }),
    addAdmin:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {username,credential,password,role}=payload.data
        try{
         const {data}=await axios.post(`${api_base_url}/api/setupAdmin`,{
             username,
             credential,
             password,
             role,
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            actions.addAdminData(data.user)
            toast.success(data?.message,{position:'top-right'})
        }catch(e){
         console.log(e)
         toast.error(e?.response?.data?.message)
        }
     }),
     addAllUserData:action((state,payload)=>{
        state.allUserData=payload
     }),
     getAllUser:thunk(async(actions)=>{
        const token=localStorage.getItem('token') || null;
        const {data}=await axios.get(`${api_base_url}/api/users`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addAllUserData(data)
     }),
     addDeletedData:action((state,payload)=>{
        state.deletedData=payload
     }),
     deleteUser:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.delete(`${api_base_url}/api/users/${payload}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addDeletedData(data)
     }),
     forceResetPassword:thunk(async(actions,{password,navigate,id})=>{
         const token=localStorage.getItem('token') || null

        try{
            const {data}=await axios.patch(`${api_base_url}/api/users/${id}/forceResetPassword`,{tempPassword:password},{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })

            if(data.success){
                toast.success(data.message)
                return;
            }
            
        }catch(e){
            toast.error(e?.response?.data?.message)
        }
     }),

     completeForcedReset:thunk(async(actions,{password,credential,navigate,from})=>{
         const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.patch(`${api_base_url}/api/users/completeForcedReset`,{
                credential,
                newPassword:password
            },{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })

            if(data.success){
                toast.success('Login Successfull.')
                if(data?.user?.role=="patient" || data?.user?.role=="healthHub"){
                    navigate(from,{replace:true})
                    return
                }
                
                toast.success('Login Successfull.')
               navigate("/")
            }
        }catch(e){
            toast.error(e?.response?.data?.message)
        }
     })
}
const promoCodeModel={
    createdPromoData:null,
    singlePromoCode:null,
    allPromoData:[],
    promoCodeByCode:null,
    error:null,
    deletedData:null,
    updatedData:null,
    addError:action((state,payload)=>{
        state.error=payload
    }),
    addPromoCodeByCode:action((state,payload)=>{
        state.promoCodeByCode=payload
    }),
    addPromoData:action((state,payload)=>{
        state.createdPromoData=payload
    }),
    createPromoCode:thunk(async(actions,{data:createData})=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.post(`${api_base_url}/api/promoCode`,createData,{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })
            actions.addPromoData(data)
            actions.addError(null)
            toast.success("Created a New Promo Code",{position:'top-right'})
        }catch(e){
            actions.addError(e?.response?.data?.message)
            toast.error(e?.response?.data?.message)
        }
    }),
    addAllPromoData:action((state,payload)=>{
        state.allPromoData=payload
    }),
    getAllPromoCode:thunk(async(actions)=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.get(`${api_base_url}/api/promoCodes`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addAllPromoData(data)
        }catch(e){
            console.log(e)
        }
    }),
    getPromoCodeByCode:thunk(async(actions,{code,userId})=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.post(`${api_base_url}/api/promoCodeValidate`,{code,userId},{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })

        actions.addPromoCodeByCode(data)
        actions.addError(null)
    }catch(error){
            actions.addPromoCodeByCode(null)
            actions.addError(error.response?.data?.message || "Something went Wrong")
        }
    }),
    addDeletedData:action((state,payload)=>{
        state.deletedData=payload
    }),
    deletePromoCode:thunk(async(actions,{id})=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.delete(`${api_base_url}/api/promoCodes/${id}`,{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })

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
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.patch(`${api_base_url}/api/promoCodes/${id}`,updateData,{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })
            actions.addUpdatedData(data)
        }catch(e){
            toast.error(e?.response?.data.message)
            console.log(e)
        }
    }),
    resetPromoCode:action((state)=>{
        state.promoCodeByCode=0
        state.error=null
    }),
    addSinglePromoCode:action((state,payload)=>{
        state.singlePromoCode=payload
    }),
    getSinglePromoCode:thunk(async(actions,{id})=>{
        const token=localStorage.getItem('token') || null
        const {data}=await axios.get(`${api_base_url}/api/promoCodes/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        actions.addSinglePromoCode(data)
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
const blogModel={
    isLoading:false,
    createdBlog:null,
    allBlogsData:[],
    deletedData:null,
    updatedData:null,
    singleBlog:null,
    addCreatedBlog:action((state,payload)=>{
        state.createdBlog=payload
    }),
    createBlogs:thunk(async(actions,{formData})=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.post(`${api_base_url}/api/blogs`,formData,{
                headers: { 'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}` }
            })
            actions.addCreatedBlog(data)
        }catch(e){
            console.log('Error creating blog',e)
        }
    }),
    addGetAllBlogsData:action((state,payload)=>{
        state.allBlogsData=payload
    }),
    addIsloading:action((state,payload)=>{
        state.isLoading=payload
    }),
    getAllBlogs:thunk(async(actions,payload)=>{
        try{
            actions.addIsloading(true)
            const {data}=await axios.get(`${api_base_url}/api/blogs`)
            actions.addGetAllBlogsData(data)
            actions.addIsloading(false)
        }catch(error){
            console.log('Not found all blogs',error)
        }finally{
            actions.addIsloading(false)
        }
    }),
    clearSingleBlog:action((state)=>{
        state.singleBlog=null
    }),
    addSingleBlog:action((state,payload)=>{
        state.singleBlog=payload
    }),
    getBlogsById:thunk(async(actions,{id})=>{
        actions.clearSingleBlog()
        try{
            const {data}=await axios.get(`${api_base_url}/api/blogs/${id}`)
            actions.addSingleBlog(data)
        }catch(error){
            console.log('Blogs not found',error)
        }
    }),
    addUpdatedData:action((state,payload)=>{
        state.updatedData=payload
    }),
    updateBlogs:thunk(async(actions,{id,formData})=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.patch(`${api_base_url}/api/blogs/${id}`,formData,{
                headers: { 'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}` }
            })
            actions.addUpdatedData(data)
        }catch(error){
            console.log('Not updated',error)
        }
    }),

    addDeletedData:action((state,payload)=>{
        state.deletedData=payload
    }),
    deleteBlogs:thunk(async(actions,{id})=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.delete(`${api_base_url}/api/blogs/${id}`,{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })
            actions.addDeletedData(data)
        }catch(error){
            console.log('Blog not found',error)
        }
    })
}
const healthHubModel={
    isLoading:false,
    healthHub:null,
    updatedData:null,
    allHealthHub:[],
    refAppointments:[],
    allRefAppointments:[],
    addHealthHub:action((state,payload)=>{
        state.healthHub=payload
    }),
    addIsloading:action((state,payload)=>{
        state.isLoading=payload
    }),
    getHealthHub:thunk(async(actions,{id})=>{
        const token=localStorage.getItem('token') || null
        try{
            actions.addIsloading(true)
            const {data}=await axios.get(`${api_base_url}/api/healthHub/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            actions.addHealthHub(data)
            actions.addIsloading(false)
        }catch(e){
            console.log('Health Hub not found',e)
        }finally{
            actions.addIsloading(false)
        }
    }),
    addUpdatedData:action((state,payload)=>{
        state.updatedData=payload
    }),
    updateHealthHub:thunk(async(actions,{id,formData})=>{
        const token=localStorage.getItem('token') || null

        try{
            const {data}=await axios.patch(`${api_base_url}/api/healthHub/${id}`,formData,{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })
            actions.addUpdatedData(data)

        }catch(e){
            toast.error(e?.response?.data.error)
            console.log(e)
        }
    }),
    addGetAllHealthHub:action((state,payload)=>{
        state.allHealthHub=payload
    }),
    getAllHealthHub:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.get(`${api_base_url}/api/healthHub`,{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })
            actions.addGetAllHealthHub(data)
        }catch(e){
            console.log(e)
            console.log('Health hub not found')
        }
    }),
    addRefAppointments:action((state,payload)=>{
        state.refAppointments=payload
    }),
    addAllRefAppointments:action((state,payload)=>{
        state.allRefAppointments=payload
    }),
    getRefAppointmentByHealthHubId:thunk(async(actions,{id})=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.get(`${api_base_url}/api/healthHub/${id}/refAppointments`,{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })
            actions.addRefAppointments(data)
        }catch(e){
            console.log(e)
            console.log('Ref. Appointments not found')
        }
    }),
    getAllRefAppointments:thunk(async(actions,payload)=>{
        const token=localStorage.getItem('token') || null
        try{
            const {data}=await axios.get(`${api_base_url}/api/allRefAppointments`,{
                headers:{
                Authorization: `Bearer ${token}`
            }
            })
            actions.addAllRefAppointments(data)
        }catch(e){
            console.log(e)
            console.log('Ref. Appointments not found')
        }
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
    applyedAppointment:applyedAppointmentModel,
    admin:adminModel,
    promoCode:promoCodeModel,
    superAdmin:superAdminModel,
    freeAppointment:freeAppointmentModel,
    blog:blogModel,
    healthHub:healthHubModel
})

export default store;
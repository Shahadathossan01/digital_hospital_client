import axios from "axios"
import { action, createStore, thunk } from "easy-peasy"
import { toast } from "react-toastify"

const userModel={
    registerData:null,
    registerError:null,
    isLogoutUser:false,
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    addUser:action((state,payload)=>{
        state.user=payload
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
        actions.addUser(data)
        localStorage.setItem("token",data.token)
        localStorage.setItem("user",JSON.stringify(data.payload))
        toast.success('Login Successfully!',{position:'top-right'})
        navigate('/')
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

const store=createStore({
    user:userModel
})

export default store;
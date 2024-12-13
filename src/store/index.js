import axios from "axios"
import { action, createStore, thunk } from "easy-peasy"
import { toast } from "react-toastify"

const userModel={
    registerData:null,
    addRegisterData:action((state,payload)=>{
        state.registerData=payload
    }),
    registerUser:thunk(async(actions,payload)=>{
       const {username,email,password}=payload
       try{
        const {data}=await axios.post('http://localhost:3000/register',{
            username,
            email,
            password
           })
           actions.addRegisterData(data.user)
           toast.success("Register Completed!",{position:'top-right'})
       }catch(e){
        console.log(e)
       }
    })
}

const store=createStore({
    user:userModel
})

export default store;
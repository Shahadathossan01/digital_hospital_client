import { Button } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useForm } from "react-hook-form";


const TestRecommendation = ({item}) => {
    const {register,handleSubmit,reset}=useForm()
    const {uploadTestResult}=useStoreActions(action=>action.testRecommendation)
    const id=item._id
    const onSubmit=(data)=>{
       const formData=new FormData()
       formData.append('image',data.image[0])
       uploadTestResult({id,formData})
       reset()
    }
    return (
        <>
           <div style={{marginBottom:'10px'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <li>{item.testName} {item.image&&<span style={{color:'green'}}>uploaded</span>} </li>
                    <input {...register('image',{required:'Please choose a file'})} type="file" name="image" />
                    <button type="submit">Upload</button>
                    <hr />
                </form>
           </div>
        </>
    );
};

export default TestRecommendation;
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import DoctorCard from "../../components/shared/DoctorCard/DoctorCard";

const Home = () => {
    const {getDoctors}=useStoreActions(action=>action.doctor)
    const {data}=useStoreState(state=>state.doctor)

    useEffect(()=>{
        getDoctors()
    },[getDoctors])
    if(data.length==0){
        return <h1>There is no doctor available</h1>
    }
    return (
        <div>
            <h1>Available Doctors:</h1>
            <div style={{display:'flex',gap:'40px',flexWrap:'wrap',justifyContent:'center'}}>
            {
                data.map((item)=>(
                    <DoctorCard key={item._id} item={item}></DoctorCard>
                ))
            }
            </div>
        </div>
    );
};

export default Home;
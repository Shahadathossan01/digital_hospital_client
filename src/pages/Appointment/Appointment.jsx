import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import PatientAppointCard from "../../components/shared/PatientAppointCard/PatientAppointCard";

const Appointment = () => {
    const {user}=useStoreState(state=>state.user)
    const {getPatient}=useStoreActions(action=>action.patient)
    const {patient,delteState}=useStoreState(state=>state.patient)
    const {updatedData}=useStoreState(state=>state.testRecommendation)
    const {deletedMedicin}=useStoreState(state=>state.prescription)
    const userID=user?.id
    
    useEffect(()=>{
        getPatient(userID)
    },[getPatient,userID,delteState,updatedData,deletedMedicin])
    
    if(!user && !patient){
        return 
    }
    return (
        <div>
            <h1>Appointments:</h1>
            <div style={{display:'flex',gap:'20x',flexWrap:'wrap'}}>
                {
                    patient?.appointments?.map(item=>(
                        <PatientAppointCard key={item._id} item={item}></PatientAppointCard>
                    ))
                }
            </div>
        </div>
    );
};

export default Appointment;
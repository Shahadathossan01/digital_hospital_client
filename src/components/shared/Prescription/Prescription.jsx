import { format } from "date-fns";
import MedicinList from "../MedicinList/MedicinList";

const Prescription = ({item,targetRef}) => {
    const {patient,doctor,prescription}=item
    const {firstName,lastName,age,gender,blood,height,weight}=patient.profile
    const {diagnosis}=prescription
    const {specialization,designation}=doctor.profile
    const date=new Date()
    const formattedDate=format(date, 'd/M/yyyy')
    return (
        <>
            <div ref={targetRef}>
            <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}>
                <div>
                    <h3>Date: {formattedDate}</h3>
                    <h3>Patient Name: {firstName} {lastName}</h3>
                    <h3>Diagnosis: {diagnosis}</h3>
                </div>
                <div>
                    <h3>Dr. {doctor.profile.firstName} {doctor.profile.lastName}</h3>
                    <h3>{specialization}</h3>
                    <h3>{designation}</h3>
                </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}>
                <h4>Age: {age}</h4>
                <h4>Gender: {gender}</h4>
                <h4>Blood: {blood}</h4>
                <h4>Height: {height}</h4>
                <h4>Weight: {weight}</h4>
            </div>
            <div>
                    {
                        prescription?.medicinInstructions.map((item,index)=>(
                            <MedicinList number={index+1} key={item._id} item={item}></MedicinList>
                        ))
                    }
            </div>
            <div style={{padding:'10px'}}>
                <h1>Additional Instructions:</h1>
                <p>{prescription?.instruction}</p>
            </div>
            </div>
        </>
    );
};

export default Prescription;
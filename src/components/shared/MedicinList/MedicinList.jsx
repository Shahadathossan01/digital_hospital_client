import { useStoreActions } from "easy-peasy";


const MedicinList = ({item,number}) => {
    const {medicinDelete}=useStoreActions(action=>action.prescription)
    const id=item._id
    const {medicinName,dosage,frequency,duration}=item
    return (
        <div>
                <div style={{display:'flex',gap:'20px',marginBottom:'10px',alignItems:'center',paddingLeft:'10px'}}>
                <h2>{number}. {medicinName} {dosage} -{frequency} for {duration} month</h2>
                <button onClick={()=>medicinDelete(id)} style={{height:'20px'}}>delete</button>
                </div>
        </div>
    );
};

export default MedicinList;
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Divider, Rating, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import OpenModal from "../../modal/OpenModal";
import DoctorProfileModal from "../../modal/DoctorProfileModal";

const DoctorTable=({data})=>{
    const columns=["No.","Name","BMDC Num.","NID/Passport","Fee","isValid","Action"]
    const {updateProfile,deleteDoctor}=useStoreActions(action=>action.doctor)
    const [open, setOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    if(!data){
      return null
    }

    const handleVerified=(item)=>{
      const userID=item?._id
      const updatedFormData={isValid:"true"}
      updateProfile({userID,updatedFormData})
    }

    const handleOpenModal = (doctor) => {
      setSelectedDoctor(doctor);
      setOpen(true);
    };
  
    const handleCloseModal = () => {
      setOpen(false);
      setSelectedDoctor(null);
    };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {
              data?.length==0 &&
              <Typography>No Data</Typography>
            }
            {
                data?.map(item=>(
                    <TableRow key={item._id}>
                        <TableCell>1</TableCell>
                        <TableCell>{item?.title} {item?.firstName} {item?.lastName}</TableCell>
                        <TableCell>{item?.bmdcNumber}</TableCell>
                        <TableCell>{item?.nidOrPassport}</TableCell>
                        <TableCell>{item?.fee}</TableCell>
                        <TableCell>{item.isValid?"Valid":"Invalid"}</TableCell>
                        <TableCell>
                            <Box sx={{display:"flex",gap:0}}>
                                <Button  onClick={() => handleOpenModal(item)}>Profile</Button>

                                <Button onClick={()=>handleVerified(item)}>
                                  <VerifiedUserIcon sx={{color:"green"}}></VerifiedUserIcon>
                                </Button>

                                <Button onClick={()=>deleteDoctor({id:item?._id})}><ClearIcon sx={{color:"red"}}></ClearIcon></Button>
                            </Box>
                        </TableCell>
          
                    </TableRow>

                ))
            }
            
          </TableBody>
        </Table>
      </TableContainer>
      <DoctorProfileModal open={open} handleClose={handleCloseModal} item={selectedDoctor}></DoctorProfileModal>
    </Paper>
  );
}


const UpdatedAdminDashboard = () => {
    const {getDoctors}=useStoreActions(actions=>actions.doctor)
    const {data,deleteDoctorData,updatedProfileData}=useStoreState(state=>state.doctor)

    useEffect(()=>{
        getDoctors()
    },[getDoctors,deleteDoctorData,updatedProfileData])

    const filterData=data?.filter(item=>item.isValid===false)
    return (
        <div>
            <Typography variant="h6"><span style={{color:"red"}}>Requested Doctors</span> For Join Our Platform.</Typography>
            <DoctorTable data={filterData}></DoctorTable>
        </div>
    );
};

export default UpdatedAdminDashboard;
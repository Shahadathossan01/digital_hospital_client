import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from "@mui/material";
import { format } from "date-fns";

const columns = [
  "No","Doctor Name","CreatedAt","TransactionId","Schedule Date","Slot","Fee"
];

const InvoiceTable=({appointments})=>{
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
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
            {appointments
              .map((item,index) =>(
                <TableRow key={item?._id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{item?.doctor?.title} {item?.doctor?.firstName} {item?.doctor?.lastName}</TableCell>
                    <TableCell>{format(new Date(item?.createdAt),"M/d/yyyy")}</TableCell>
                    <TableCell>{item?.transactionId?item?.transactionId:"N/A free appointment"} <span></span></TableCell>
                    <TableCell>{format(new Date(item?.date),"M/d/yyyy")}</TableCell>
                    <TableCell>{item?.time}</TableCell>
                    <TableCell>{item?.totalFee}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
              ))
          
              }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


const PatientInvoice = () => {
    const {user}=useStoreState(state=>state.user)
    const {getPatient}=useStoreActions(actions=>actions.patient)
    const {patient}=useStoreState(state=>state.patient)
    console.log(user)
    const userId=user?.id
    useEffect(()=>{
        getPatient(userId)
    },[getPatient,userId])

    if(!patient) return null

    console.log(patient.appointments)

    return (
        <Box>
            <InvoiceTable appointments={patient?.appointments}></InvoiceTable>
        </Box>
    );
};

export default PatientInvoice;
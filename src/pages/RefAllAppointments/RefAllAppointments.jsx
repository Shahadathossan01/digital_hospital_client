import { useStoreActions, useStoreState } from "easy-peasy";
import { act, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
const columns = [
  "No","Author","CreatedAt","TransactionId","Schedule Date&Slot","Fee","Ref. Payment","Payment Status"
];

const InvoiceTable=({appointments})=>{
  const {user}=useStoreState(state=>state.user)
  const {updateReferredPayment}=useStoreActions(actions=>actions.appointment)

  const handleMarkAsPaid = (id) => {
    updateReferredPayment({id,referredPayment:true})
  };
  
  const handleMarkAsPending = (id) => {
    updateReferredPayment({id,referredPayment:false})
  };
  
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
            {
              appointments?.length ==0?(
                <Typography>No Data</Typography>
              ):(
                appointments
              .map((item,index) =>(
                <TableRow key={item?._id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>
                        {item?.patient?
                            'Patient'
                        
                        :
                            'HealthHub'
                        }
                    </TableCell>
                    <TableCell>
                      {format(new Date(item?.createdAt),"M/d/yyyy")}
                    </TableCell>
                    <TableCell>
                    {item?.transactionId
                    ? (user.role === 'healthHub'
                        ? item.transactionId.slice(0, 8) + '...'
                        : item.transactionId)
                    : "N/A free appointment"} 
                    </TableCell>
                    <TableCell>
                      {format(new Date(item?.date),"M/d/yyyy")}<br></br>
                      {item?.time}

                    </TableCell>
                    <TableCell>{item?.totalFee}</TableCell>
                    <TableCell>
                      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
                          <Typography>20%: {item?.totalFee * 0.2}</Typography>
                          {/* {
                            item?.referredPayment?(
                              <PriceCheckIcon color="success"></PriceCheckIcon>
                            ):(
                              <CurrencyExchangeIcon color="disabled"></CurrencyExchangeIcon>
                            )
                          } */}
                      </Box>
                    </TableCell>
                    <TableCell>
                    {
                      item?.referredPayment ? (
                        <>
                          {/* Green Button - already paid */}
                          <Tooltip title="Payment Success">
                            <IconButton disabled={user?.role==='healthHub'?true:false} size="large"  color="success" onClick={() => handleMarkAsPending(item._id)}>
                              <PriceCheckIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          {/* Gray Button - pending */}
                          <Tooltip title={user?.role==='healthHub'?'':'Mark as Paid'}>
                            <IconButton disabled={user?.role==='healthHub'?true:false} color="default" onClick={() => handleMarkAsPaid(item._id)}>
                              <CurrencyExchangeIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )
                    }
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
              ))
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


const RefAllAppointments = () => {
  const user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null
  const userID = user?._id;
 const {getAllRefAppointments}=useStoreActions(actions=>actions.healthHub)
 const {allRefAppointments}=useStoreState(state=>state.healthHub)
 const {updatedRefPayment}=useStoreState(state=>state.appointment)

useEffect(()=>{
    getAllRefAppointments()
},[getAllRefAppointments,userID,updatedRefPayment])

    if(!allRefAppointments) return null
    return (
        <Box>
            <InvoiceTable appointments={allRefAppointments}></InvoiceTable>
        </Box>
    );
};

export default RefAllAppointments;
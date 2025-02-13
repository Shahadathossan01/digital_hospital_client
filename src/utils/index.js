import { addDays, format, getDaysInMonth, getMonth, isAfter, isToday, parseISO } from "date-fns";
const checkUpdatedData=(data)=>{
    const updateFormData = Object.keys(data).reduce((acc, key) => {
        if (data[key].length !== 0) { // Check if the value length is not 0
            acc[key] = data[key];
        }
        return acc;
    }, {});

    return updateFormData
}

const specialityName=(data)=>{
    if(!data) return
  const singleName=data.reduce((acc,cur)=>{
        const speciality=cur.speciality.trim()
        if(!acc.includes(speciality)){
            acc.push(speciality)
        }
        return acc
    },[])
    return singleName
}

const filterDoctorBySpecialty=(data,filterValue)=>{
    if(!data) return
    if(filterValue=='all'){
        return data
    }
    const filterDoctor=data.reduce((acc,cur)=>{
        const speciality=cur.speciality.trim()
        if(speciality==filterValue){
            acc.push(cur)
        }
        return acc;
    },[])
    return filterDoctor
}


const createSlots = (times) => {
    return times.map((time) => ({
      time,
      status: "available",
    }));
  };

const createSchedule=(totalDays,times)=>{
    const today=new Date()
    const currentMonth = getMonth(today) + 1;
    const schedule=Array(totalDays).fill(null).reduce((acc,cur,i)=>{
        const date=addDays(today,i);
        const dateConvert=new Date(date)
        const isoDate=dateConvert.toISOString()
        const updatedMonth = getMonth(date) + 1;
        if(currentMonth ==updatedMonth){
            acc.push({
                date:isoDate,
                status:"available",
                slots: createSlots(times)
            })
        }
        return acc;
    },[])
    return schedule
}
const filterUser=(users,roleState)=>{
    if(roleState=='all'){
        return users
    }
    const newUser=users.filter(item=>item.role==roleState)
    return newUser
}

const getTotalDaysInMonth=(localDate)=>{
    // const date=new Date(localDate)
    return getDaysInMonth(localDate)
}

const filterAppointments=(appointments,filterValue)=>{
    const filterAppointment=appointments.filter(item=>item.status==filterValue)
    return filterAppointment
}

const getUpcommingAppointments=(appointments)=>{
    const currentDate=new Date()
    const upcommingAppointments=appointments.reduce((acc,cur)=>{
        const appointmentDate=parseISO(cur.date)
        if(isAfter(appointmentDate,currentDate)){
            acc.push(cur)
        }
        return acc;
    },[])

    return upcommingAppointments
}

const filterDoctorAppointments=(appointments,filterValue)=>{
    const currentDate=new Date()
    const filteredAppointments=appointments.reduce((acc,cur)=>{

        if(filterValue=="today"){
            const appointmentDate=parseISO(cur.date)
            if((isToday(appointmentDate)) && (cur.status=="confirmed" || cur.status=="completed")){
                acc.push(cur)
            }
        }

        else if(filterValue=="all"){
            return appointments
        }
        else if(cur.status==filterValue){
            acc.push(cur)
        }

        return acc;
    },[])

    return filteredAppointments
}


export {checkUpdatedData,specialityName,filterDoctorBySpecialty,createSchedule,getTotalDaysInMonth,filterUser,filterAppointments,getUpcommingAppointments,filterDoctorAppointments}
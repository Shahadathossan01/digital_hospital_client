const checkUpdatedData=(data)=>{
    const updateFormData = Object.keys(data).reduce((acc, key) => {
        if (data[key].length !== 0) { // Check if the value length is not 0
            acc[key] = data[key];
        }
        return acc;
    }, {});

    return updateFormData
}

const categoryName=(data)=>{
    if(!data) return
  const singleName=data.reduce((acc,cur)=>{
        const category=cur.category.trim()
        if(!acc.includes(category)){
            acc.push(category)
        }
        return acc
    },[])
    return singleName
}

const filterDoctorByCategory=(data,filterValue)=>{
    if(!data) return
    if(filterValue=='all'){
        return data
    }
    const filterDoctor=data.reduce((acc,cur)=>{
        const category=cur.category.trim()
        if(category==filterValue){
            acc.push(cur)
        }
        return acc;
    },[])
    return filterDoctor
}

import { addDays, format, getDaysInMonth, getMonth } from "date-fns";

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

export {checkUpdatedData,categoryName,filterDoctorByCategory,createSchedule,getTotalDaysInMonth,filterUser}
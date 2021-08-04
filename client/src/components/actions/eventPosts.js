import * as api from '../api/event';

export const getEvents = ()=>async(dispatch)=>{

    try{
        const {data} =await api.fetchEvents();
        dispatch ({type:'FETCH_ALL',payload:data});
    }catch (error){
        console.log(error);
    }

    
}


export const createEvent= (post) => async(dispatch)=>{
    try {

        const {data} = await api.createEvent(post)

        dispatch({type:'CREATE',payload:data});
        
    } catch (error) {
        console.log(error.message)
    }
}


export const updateEvent =(id,post) => async(dispatch)=>{
    try {

        const {data}  =await api.updateEvent(id,post);
        dispatch({type:'UPDATE',payload:data})

        
    } catch (error) {
        console.log(error)
    }
}


export const deleteEvent =(id)=>async(dispatch)=>{
try {
    await api.deleteEvent(id);
    dispatch({type:'DELETE',payload:id});

} catch (error) {

    console.log(error);
    
}



}


export const getNoEvents = ()=>async(dispatch)=>{

    try{
        const {data} =await api.fetchNoEvents();
        dispatch ({type:'FETCH_ALL_NO',payload:data});
    }catch (error){
        console.log(error);
    }

    
}

export const updateapprovel =(id,post) => async(dispatch)=>{
    try {

        const {data}  =await api.updateaprovel(id,post);
        dispatch({type:'UPDATE_APPROVEL',payload:data})

        
    } catch (error) {
        console.log(error)
    }
}


export const updateDecline =(id,post) => async(dispatch)=>{
    try {

        const {data}  =await api.updatedecline(id,post);
        dispatch({type:'UPDATE_DECLINE',payload:data})

        
    } catch (error) {
        console.log(error)
    }
}



export const getdeclineEvents = ()=>async(dispatch)=>{

    try{
        const {data} =await api.fetchDeclineEvents();
        dispatch ({type:'FETCH_ALL_Decline',payload:data});
    }catch (error){
        console.log(error);
    }

    
}




export const getApprovedEvents = ()=>async(dispatch)=>{

    try{
        const {data} =await api.fetchApprovedEvents();
        dispatch ({type:'FETCH_ALL_Approved',payload:data});
    }catch (error){
        console.log(error);
    }

    
}


export const getworkshpsEvents = ()=>async(dispatch)=>{

    try{
        const {data} =await api.fetchworkshpsEvents();
        dispatch ({type:'FETCH_ALL_WrokShops_Events',payload:data});
    }catch (error){
        console.log(error);
    }

    
}




export const getReserchesEvents = ()=>async(dispatch)=>{

    try{
        const {data} =await api.fetchresearchesEvents();
        dispatch ({type:'FETCH_ALL_WrokShops_Events',payload:data});
    }catch (error){
        console.log(error);
    }

    
}














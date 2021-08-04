import * as api from '../api/conference';

export const getconference = ()=>async(dispatch)=>{

    try{
        const {data} =await api.fetchEvents();
        dispatch ({type:'FETCH_ADMIN',payload:data});
    }catch (error){
        console.log(error);
    }

    
}



export const updateconference =(id,post) => async(dispatch)=>{
    try {

        const {data}  =await api.updateconference(id,post);
        dispatch({type:'UPDATE_CONFERENCE',payload:data})

        
    } catch (error) {
        console.log(error)
    }
}


export const getEditorconference = ()=>async(dispatch)=>{

    try{
        const {data} =await api.fetchEditorConference();
        dispatch ({type:'FETCH_EDITOR',payload:data});
    }catch (error){
        console.log(error);
    }

    
}

export const getAdminconference = ()=>async(dispatch)=>{

    try{
        const {data} =await api.fetchAdminConference();
        dispatch ({type:'FETCH_ADMIN_CONFERENCE',payload:data});
    }catch (error){
        console.log(error);
    }

    
}


export const updateconferenceApprovel =(id,post) => async(dispatch)=>{
    try {

        const {data}  =await api.updateApprovel(id,post);
        dispatch({type:'UPDATE_CONFERENCE_APPROVEL',payload:data})

        
    } catch (error) {
        console.log(error)
    }
}


export const ConferenceDecline =(id,post) => async(dispatch)=>{
    try {

        const {data}  =await api.conferenceDecline(id,post);
        dispatch({type:'CONFERENCE_DECLINE',payload:data})

        
    } catch (error) {
        console.log(error)
    }
}


export const ConferenceApprved =(id,post) => async(dispatch)=>{
    try {

        const {data}  =await api.conferenceApprove(id,post);
        dispatch({type:'CONFERENCE_APPROVED',payload:data})

        
    } catch (error) {
        console.log(error)
    }
}





import axios from 'axios';

const urlget = 'http://localhost:8070/mainevent/readAll';
const urladd = 'http://localhost:8070/mainevent/add';
const urlupdate = 'http://localhost:8070/mainevent/update';
const urldelete = 'http://localhost:8070/mainevent/delete';
const urlFetchNo = 'http://localhost:8070/mainevent//readNo';
const urlaprrove = 'http://localhost:8070/mainevent/approve';
const urldecline = 'http://localhost:8070/mainevent/decline';
const urlFetchApproved = 'http://localhost:8070/mainevent//readApproved';
const urlFetchdecline = 'http://localhost:8070/mainevent//readDecline';
const urlFetchWorkshopEvents = 'http://localhost:8070/mainevent//readworkshopsEvents';
const urlFetchReserchEvents = 'http://localhost:8070/mainevent//readresearchEvents';





export const fetchEvents =()=>axios.get(urlget);
export const createEvent =(newEvent)=>axios.post(urladd,newEvent);
export const updateEvent = (id,updateEvent)=>axios.patch(`${urlupdate}/${id}`,updateEvent);
export const deleteEvent = (id)=>axios.delete(`${urldelete}/${id}`);

export const  fetchNoEvents =()=>axios.get(urlFetchNo);
export const updateaprovel = (id,updateEvent)=>axios.patch(`${urlaprrove}/${id}`,updateEvent);
export const updatedecline = (id,updateEvent)=>axios.patch(`${urldecline}/${id}`,updateEvent);

export const  fetchApprovedEvents =()=>axios.get(urlFetchApproved);
export const  fetchDeclineEvents =()=>axios.get(urlFetchdecline);

export const  fetchworkshpsEvents =()=>axios.get(urlFetchWorkshopEvents);
export const  fetchresearchesEvents =()=>axios.get(urlFetchReserchEvents);










import axios from 'axios';

const urlget = 'http://localhost:8070/conference/readapproved';
const urlupdate = 'http://localhost:8070/conference/Editorupdate';
const urlgetEditor = 'http://localhost:8070/conference/readEditor';
const urlgetadmin = 'http://localhost:8070/conference/readadmin';
const urlupdateApprovel = 'http://localhost:8070/conference/adminupdate';
const urlconferenceDecline = 'http://localhost:8070/conference/conferenceDecline';
const urlconferenceApprove = 'http://localhost:8070/conference/conferenceApprove';

export const fetchEvents =()=>axios.get(urlget);
export const updateconference = (id,updateEvent)=>axios.patch(`${urlupdate}/${id}`,updateEvent);
export const fetchEditorConference =()=>axios.get(urlgetEditor);
export const fetchAdminConference =()=>axios.get(urlgetadmin);
export const updateApprovel = (id,updateEvent)=>axios.patch(`${urlupdateApprovel}/${id}`,updateEvent);
export const conferenceDecline = (id,updateEvent)=>axios.patch(`${urlconferenceDecline}/${id}`,updateEvent);
export const conferenceApprove = (id,updateEvent)=>axios.patch(`${urlconferenceApprove}/${id}`,updateEvent);



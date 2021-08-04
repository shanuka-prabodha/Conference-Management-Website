import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom"
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import Footer from "../LandingPage/Footer/Footer";

const FilesList = () => {

    const history = useHistory()
    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [userType, seTuserType] = useState('')
  useEffect(() => {

    const getusertype = async () => {
      const access_token = localStorage.getItem('token')
      console.log(access_token)
      let config = {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      }
      axios.get('http://localhost:8070/user/post',config).then((response) => {
          if (response.data.message) {
            alert(response.data.message)
          } else {
              seTuserType(response.data.user.usertype)
              
          }
        })
        .catch()
  };
  getusertype();

    const getFilesList = async () => {
      try {
        const { data } = await axios.get("http://localhost:8070/review/getapprovePapers");
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

function buttonclick(id){

   history.push("/VRReasearch",{paperid:id})

}


  return (
    <div className="files-container">
      <AppBarComponent getUserType={userType}/>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <div>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description,state, file_path, file_mimetype }) => (
                <div key={_id} class="card" style={{borderRadius:'10px',padding:'15px',backgroundColor:"whitesmoke",display:"inline-block",marginLeft:'15px',marginTop:'10px'}}>
                  <h3 >Titile : {title}</h3>
                  <h3>Description : {description}</h3>
                  <h5>State : {state}</h5>
                </div>
              )
            )
          ) : 
                <h3>No files found. Please add some.</h3>
          }
        </div>
    
    </div>
  );
};

export default FilesList;
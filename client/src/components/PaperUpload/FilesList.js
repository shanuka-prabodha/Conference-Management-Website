import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { useHistory } from "react-router";

import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css'; // You can also use <link> for styles
import Footer from "../LandingPage/Footer/Footer";

AOS.init();

const buttonColor = {
  backgroundColor: "#5E4FA2",
  color: "white",
  fontFamily: "Poppins",
  borderRadius: "6px",
  height: "fit-content",
  width: "55px",
  zIndex :"99"

}
const dissableButtonColor = {
  backgroundColor: "#8e7bd4",
  color: "white",
  fontFamily: "Poppins",
  borderRadius: "6px",
  height: "fit-content",
  width: "55px",
  zIndex :"99"

}

var userType = "researcher";

const FilesList= ()=> {

  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  useEffect(() => {


        const access_token = localStorage.getItem('token')
        console.log(access_token)
        let config = {
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        }
        axios.get('http://localhost:8070/user/post',
          config)
          .then((response) => {
            if (response.data.message) {
              alert(response.data.message)
            } else {

              getFilesList(response.data.user._id)
              
            }
      
          })
          .catch()

    const getFilesList = async (userid) => {
      try {
        const { data } = await axios.get("http://localhost:8070/getAllFiles/",{params:{ID:userid}});
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };




    
  }, []);




  const DeleteFile = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:8070/delete/${id}`, {
        responseType: 'blob'
      });
      window.location.reload()

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };


  

  const navigatePayment=(id)=>{
    history.push('/payment',{
      id:id,
      type:'paper'
    })
  }
  

  const navigateUpdatepage=(id,title,description,file_path,file_mimetype)=>{
    history.push('/paper-update',{
      id:id,
      title:title,
      description:description,
      file_path:file_path,
      file_mimetype:file_mimetype,
     
    })
  }

  return (
    <div>
      <AppBarComponent getUserType={userType}/>
    <div className="container">
    <br />
        <div className="dialog-title" style={{ marginBottom: "5%" }}>
          My Reseach Papers
          <hr className="workshopStyle" />
        </div>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      
      <div style={{display:"grid", gridTemplateColumns: "450px 450px 450px"}}>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, userId,state,paid, title, description, file_path, file_mimetype ,originalName}) => (
                
            <div className="confDetails ShadowL" style={{ margin: "2% 0", height:"fit-content" }}>
                <div key={_id} className="d-flex justify-content-center" data-aos="zoom-in-up" >
                <div className="card-body">
                   <div className="row">
                      <div className="col-lg-12">
                  <span className="card-text" style={{ fontSize:'18px' }}><strong>{title}</strong></span> <br/>
                  <span className="card-text" >{description}</span> <br />
                  <span className="card-text" style={{ fontSize:'15px' }}><strong>State : {state}</strong></span> 
                  <h5 hidden={paid=='no' }>Paid</h5>   
                  </div>
                  </div>
                
                  <div className="row">
                  <div className="col-lg-12" style={{textAlign:"center"}}>
                    <Button
                      href={file_path}
                      
                    >
                      Download
                    </Button>
                  </div>
                  </div>

                  <div className="row">
                  <div className="col-lg-4">
                  
                    <Button
                           size="small" variant="contained"
                           style={buttonColor} onClick={() => DeleteFile(_id)}>Delete</Button>

                    </div>
                    <div className="col-lg-4"> 
                    {state=="Accepted"? <Button
                           size="small" variant="contained"
                           style={dissableButtonColor} disabled={state=='Accepted'} onClick={()=>navigateUpdatepage(_id,title,description,file_path,file_mimetype)}>Update</Button>
                           :
                           <Button
                           size="small" variant="contained"
                           style={buttonColor} disabled={state=='Accepted'} onClick={()=>navigateUpdatepage(_id,title,description,file_path,file_mimetype)}>Update</Button>
                           }
                           </div>
                    <div className="col-lg-4">
                      
                      {(state!="Accepted" || paid=='yes') ?
                      <Button
                           size="small" variant="contained"
                           style={dissableButtonColor} disabled={state!='Accepted' || paid=='yes'  } onClick={()=>navigatePayment(_id)}>Pay</Button>
                           :
                           <Button
                           size="small" variant="contained"
                           style={buttonColor} disabled={state!='Accepted' || paid=='yes'  } onClick={()=>navigatePayment(_id)}>Pay</Button>
                           }</div>
                  </div>
                  

                </div>
                </div>
                </div>

              )
            )
            
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
              </div>
        </div>

      </div>

   
   
  );
};

export default FilesList;
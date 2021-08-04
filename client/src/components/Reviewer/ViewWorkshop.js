import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom";
import download from 'downloadjs';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import Footer from "../LandingPage/Footer/Footer";
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css'; // You can also use <link> for styles


AOS.init();

const buttonColor = {
  
  backgroundColor: "#5E4FA2",
  color: "white",
  fontFamily: "Poppins",
  borderRadius: "8px",
  height: "40px",
  width: "fit-content",
  zIndex: "99",
  marginTop: "3%"
}


const ViewWorkshop = () => {

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const history = useHistory()
  const [file, setFile] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [mess, setMessage] = useState('')
  const [userType, seTuserType] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const newhandleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

    const getusertype = async () => {
      const access_token = localStorage.getItem('token')
      console.log(access_token)
      let config = {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      }
      axios.get('http://localhost:8070/user/post', config).then((response) => {
        if (response.data.message) {
          alert(response.data.message)
        } else {
          seTuserType(response.data.user.usertype)
        }
      })
        .catch()
    };
    getusertype();

    const getFile = async () => {
      try {
        const { data } = await axios.get("http://localhost:8070/review/getWorkshop", { params: { id: location.state.paperid } });
        setFile(data);
        console.log(data)
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFile();
  }, []);

  function accept(id) {

    const body = {
      id: id,
      state: "Accepted"
    }

    axios.put("http://localhost:8070/review/updateWorkshop", body).then((res) => {
      alert("Accept success")
      window.location.reload(false)
    }).catch((err) => {
      console.log(err)
    })

  }

  function decline(id, userId) {
    setOpen(false);
    const body = {
      id: id,
      state: "Declined"
    }
    axios.put("http://localhost:8070/review/updateWorkshop", body).then((res) => {
      sendmessage(userId)
      window.location.reload(false)
    }).catch((err) => {
      console.log(err)
    })
  }



  function sendmessage(userId) {
    const message = {
      userID: userId,
      msg: mess,
      state: "unread"
    }
    console.log(message)
    axios.post("http://localhost:8070/review/sendmessage", message).then(() => {
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <AppBarComponent getUserType={userType} />
      <div className="container my-5">

          {file.map(({ _id, topic, description, date, time, userID, state, file_path }) => (
            <div className="d-flex justify-content-center" data-aos="zoom-in-up">
              <div key={_id} className="confDetails ShadowL" style={{ width: "800px", height: "fit-content" }}>
                <div className="card-body my-5">
                  <div className="row">
                    <div className="col-lg-12" style={{marginLeft:"10%"}}>
                      <p className="card-text" style={{fontSize:"18px"}}><strong>Title :<br/></strong> {topic}</p>
                      <p className="card-text" style={{fontSize:"18px"}}><strong>State : <br/></strong>{state}</p>
  
                      <p className="card-text" style={{fontSize:"18px"}}><strong>date : <br/></strong>{date}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12" style={{textAlign:"center"}}>
                      <Button size="small" variant="contained"
                      style={buttonColor} href={file_path}>
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="row" style={{marginTop:"5%", textAlign:"center"}}>
                    <div className="col-lg-6">
                      <Button disabled={state == "Accepted"} variant="outlined" color="primary" onClick={(e) => {
                        accept(_id)
                      }}>Accept</Button>
                    </div>
                    <div className="col-lg-6">
                      <Button disabled={state == "Declined"} variant="outlined" color="primary" onClick={handleClickOpen}>
                        Decline
                      </Button>
                    </div>
                      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Enter your message</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Message"
                            type="text"
                            fullWidth
                            onChange={(e) => {
                              setMessage(e.target.value)
                            }}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={() => {
                            decline(_id, userID)
                          }} color="primary">
                            Send
                          </Button>
                        </DialogActions>
                      </Dialog>
                    

                  </div>
                </div>
              </div>
            </div>
          ))}

        
      </div>
      
    </div>
  );
};

export default ViewWorkshop;
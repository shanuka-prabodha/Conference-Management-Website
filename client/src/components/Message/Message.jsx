import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import Button from "@material-ui/core/Button";
import Footer from "../LandingPage/Footer/Footer";

var userType = "workshop";

const buttonColor = {
  position: "absolute",
  backgroundColor: "#5E4FA2",
  color: "white",
  fontFamily: "Poppins",
  borderRadius: "12px",
  height: "55px",
  width: "100px",
  right: "5%",
  top: "5%"

}


const Message = () => {



  const history = useHistory()
  const [messagelist, setMessagelist] = useState([]);
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

    const getMessagelist = async () => {
      const access_token = localStorage.getItem('token')
      let config = {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      }
      await axios.get('http://localhost:8070/user/post', config).then((response) => {
        if (response.data.message) {
          alert(response.data.message)
        } else {
          getFilesList(response.data.user._id);
        }
      }).catch()
    }

    const getFilesList = async (userid) => {
      try {
        const { data } = await axios.get("http://localhost:8070/review/getmessages", { params: { ID: userid } });
        setErrorMsg('');
        setMessagelist(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getMessagelist()
  }, []);

  function setRead(_id) {

    const message = {
      id: _id,
      state: "read"
    }

    axios.put("http://localhost:8070/review/updatemessage", message).then((res) => {
      window.location.reload(false)
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

  }



  return (
    <div>
      <AppBarComponent getUserType={userType} />
      <div className="container" style={{height:"90vh"}}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <div>
          {messagelist.length > 0 ? (
            messagelist.map(
              ({ _id, message, State, userID }) => (



                <div key={_id} className="confDetails ShadowL" style={{ margin: "3% 0", width: "100%" }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div style={{ margin: "0% 3%", position: "absolute", top: "0%" }}>
                        <p className="card-topic" >Message</p>
                        <p className="card-text"> {message}</p>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div style={{ position: "absolute", right: "10%" }}>
                        <Button size="small" variant="contained" style={buttonColor} hidden={State == "read"} onClick={() => {
                          setRead(_id)
                        }}>Mark as Read
                        </Button>
                      </div>

                    </div>
                  </div>

                </div>

              )
            )
          ) :
            <h3>No Messages found.</h3>
          }
        </div>
      </div>
 
    </div>
  );
};

export default Message;
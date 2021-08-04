import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import AppBarAvatar from "./AppBarAvatar";
import axios from 'axios';


const buttonInStyle = {
    color: "#5E4FA2",
    border: "1px solid #5E4FA2",
    fontWeight: 600,
    fontSize: "15px",
    fontFamily: 'Montserrat',
    zIndex: "99",
    marginLeft: "25px"
}

const buttonUpStyle = {
    color: "#5E4FA2",
    backgroundColor:"#FEC949",
    fontWeight: 600,
    fontSize: "15px",
    fontFamily: 'Montserrat',
    zIndex: "99",
    marginLeft: "25px"
}

function AppBarButtons(){

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
                console.log(response.data.user.usertype);
                  seTuserType(response.data.user.usertype)
                  
              }
            })
            .catch()
      };
      getusertype();
    }, []);


    var ch = ""
if('token' in localStorage){    
    ch = "no"
}else{
    ch = "yes"
}

function logout(){
    localStorage.removeItem('token')
}

    return ( <div>
        {userType==""?
            <div>
            <Button hidden={ch == "no"}variant="outlined" style={buttonInStyle} href="/signin">Sign In</Button>
            <Button hidden={ch == "no"}variant="outline-success" style={buttonUpStyle} href="/registration" >Sign Up</Button>
            </div>
            :
            <AppBarAvatar hidden={ch == "yes"} variant="outline-success" style={buttonUpStyle}>Log Out</AppBarAvatar>
    }
        </div>
        );
}

export default AppBarButtons;
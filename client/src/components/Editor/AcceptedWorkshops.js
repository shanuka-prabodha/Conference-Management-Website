import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom"
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import Footer from "../LandingPage/Footer/Footer";
function AcceptedWorkshops(){
    const history = useHistory()
    const[workshop, setWorkshop] = useState([]);
    const [userType, seTuserType] = useState('')
    
    useEffect(() => {

        const getusertype = async () => {
            const access_token = localStorage.getItem('token')
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
        retrieveWorkshops();
    });

    function retrieveWorkshops(){
        axios.get("http://localhost:8070/workshops/approved",{params:{state:"Accepted"}}).then(res=>{
                setWorkshop(res.data)
                console.log("fsfafa"+res.data)
        }).catch((err)=>{
          console.log(err)
        })
    }

    function buttonclick(id){
        history.push("/VRWorkshop",{paperid:id})
     }

    return(
      <div>
        <AppBarComponent getUserType={userType}/>
        <div className="container">
            
            <div className="row">
            <div className="itemBox">
                {workshop.map(({ _id, topic, description,date, time, userID, state }) => (
                <div key={_id} class="card" style={{borderRadius:'10px',padding:'15px',backgroundColor:"whitesmoke",display:"inline-block",marginLeft:'15px',marginTop:'10px'}}>
                  <h3 >Titile : {topic}</h3>
                  <h3>State : {state}</h3>
                  <h3>Description : {description}</h3>
                  <h3>date : {date}</h3>
                </div>
              ))}
            </div>
            </div>
                
        </div>
    
        </div>
    )
}

export default AcceptedWorkshops;
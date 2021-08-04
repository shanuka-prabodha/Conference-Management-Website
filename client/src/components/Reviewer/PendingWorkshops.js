import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css'; // You can also use <link> for styles
import { UilBookOpen } from '@iconscout/react-unicons'
import Button from "@material-ui/core/Button";
import Footer from "../LandingPage/Footer/Footer";

AOS.init();

const buttonColor = {
  position: "absolute",
  backgroundColor: "#5E4FA2",
  color: "white",
  fontFamily: "Poppins",
  borderRadius: "12px",
  height: "55px",
  width: "55px",
  right: "5%",
  top: "5%",
  zIndex: "99"

}

function ItemSection() {
  const history = useHistory()
  const [workshop, setWorkshop] = useState([]);
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
    retrieveWorkshops();
  });

  function retrieveWorkshops() {
    axios.get("http://localhost:8070/workshops/").then(res => {
      setWorkshop(res.data)
    });
  }

  function buttonclick(id) {

    history.push("/VRWorkshop", { paperid: id })

  }

  return (
    <div>
      <AppBarComponent getUserType={userType} />
      <div className="container my-5" style={{height:"90vh"}}>
        <div className="dialog-title" style={{ marginBottom: "5%" }}>
          Workshop Review
          <hr className="workshopStyle" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "450px 450px 450px" }}>


          {workshop.map(({ _id, topic, description, date, time, userID, state }) => (
            <div className="d-flex justify-content-center" data-aos="zoom-in-up">
              <div key={_id} className="confDetails ShadowL" style={{ width: "300px" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-10">
                      <p className="card-text"><strong>Titile :</strong> {topic}</p>
                      <p className="card-text"><strong>Reviewed :</strong> {state}</p>
                      <p className="card-text"><strong>Date :</strong> {date}</p>
                    </div>
                    <div className="col-lg-2">
                      <Button
                        size="small" variant="contained"
                        style={buttonColor}
                        onClick={(e) => {
                          buttonclick(_id)
                        }}><UilBookOpen style={{ width: "80%", height: "auto" }} /></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
   
    </div>
  )
}

export default ItemSection;
import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { useHistory } from "react-router";
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import "../style.css";
import "../Styles/card.css";
import { UilFolderDownload } from '@iconscout/react-unicons';
import Button from "@material-ui/core/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css'; // You can also use <link> for styles
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
  zIndex :"99"

}

const DisplayPapers = () => {

  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();
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
    const getFilesList = async () => {
      try {
        const { data } = await axios.get("http://localhost:8070/getAll");
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getFilesList()
  }, []);

  const downloadFile = async (id, path, mimetype, name) => {
    try {

      const result = await axios.get(`http://localhost:8070/download/${id}`, {
        responseType: 'blob'
      });
      const filename = name;
      return download(result.data, filename, mimetype);
    } catch (error) {
      console.log(error)
    }
  };






  return (
    <div>
      <AppBarComponent getUserType={userType} />
      <br/>
      <div className="dialog-title" style={{ marginBottom: "5%" }}>
          Reseach Papers
          <hr className="workshopStyle" />
        </div>
      <div className="container my-5" style={{height:"90hv"}}>

        {errorMsg && <p className="errorMsg">{errorMsg}</p>}

        <div style={{display:"grid", gridTemplateColumns: "400px 400px 400px"}}>

          {
            filesList.map(
              ({ _id, userId, state, paid, title, description, file_path, file_mimetype, originalName }) => (

                <div key={_id} className="d-flex justify-content-center" data-aos="zoom-in-up" >
                  <div className="confDetails ShadowL" style={{ margin: "2% 0", height:"fit-content" }}>
                    <Row>
                      <Col lg={8} sm={8} >
                        <div style={{margin:"1% 4% 0", position:"absolute", top:"0%"}}>
                          <p className="card-topic">{title}</p>
                        </div>
                      </Col>
                      <Col lg={4} sm={4} >
                        <Button
                          size="small" variant="contained"
                          style={buttonColor}
                          href={file_path}
                          onClick={() =>
                            downloadFile(_id, file_path, file_mimetype, originalName)
                          }
                        >
                          <UilFolderDownload style={{ width: "80%", height: "auto" }} />
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} sm={12}>
                        <div style={{margin:"30% 5% 0"}}>
                        <p className="card-text">{description}</p>
                        </div>
                      
                      </Col>
                    </Row>
                  </div>
                </div>
              )
            )
          }

        </div>
      </div>

    </div>
  );
};

export default DisplayPapers;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import LoginImg from "../img/Login-img.svg";
import LoginPath from "../img/login-path.svg";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const buttonStyle = {
    backgroundColor: "#5E4FA2",
    color: "#FEC949",
    fontWeight: 700,
    fontSize: "18px",
    fontFamily: 'Montserrat',
    height: "50px",
    width: "500px",
    borderRadius: "8px",
    zIndex: "99",
    marginTop: "5%"
}

const buttonSignUp = {
    color: "#5E4FA2",
    fontWeight: 700,
    fontSize: "18px",
    fontFamily: 'Montserrat',
    height: "50px",
    width: "500px",
    borderRadius: "8px",
    border: "3px solid #5E4FA2",
}

const inputBoxStyle = {
    width: "500px",
    marginTop: "3%"
}

const hrStyle = {
    marginBottom: "10%",
    marginTop: "10%",
    border: "1px solid #5E4FA2",
    opacity: "23%"
}

const imgStyle = {
    margin: "8% 25% 5%",
    width: "50%",
    height: "auto"
}

const h1Style = {
    color: "#5E4FA2",
    fontSize: "45px",
    fontWeight: "600",
    fontFamily: "Montserrat"
}

const pStyle = {
    color: "#5E4FA2",
    fontSize: "25px",
    fontWeight: "400"
}

const loginPathImg = {
    position: "absolute",
    width: "14%",
    height: "auto",
    fontFamily: "Montserrat sans-serif"
}

function Registraion() {

    const location = useLocation();
    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [usertype, setUser] = useState("")
    const [check, setCheck] = useState("")
    const [UserType, seTuserType] = useState('')
    const history = useHistory()

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
    }, []);


    function register(e) {

        e.preventDefault();

        const newUSer = {
            username,
            email,
            password,
            usertype
        }
        if (check != "true") {
            alert("accept terms and conditions")
        } else {

            axios.post("http://localhost:8070/user/register", newUSer).then((response) => {
                if (response.data.Error) {
                    alert(response.data.Error)
                    document.getElementById("myForm").reset();
                } else {
                    document.getElementById("myForm").reset();
                    history.push("/signin")

                }
            }).catch((err) => {
                alert(err)
            })
        }
    }

    return (
        <div>
            <AppBarComponent getUserType={UserType} />

            <Container fluid>
                <Row>
                    <Col lg={6} sm={12} style={{ backgroundColor: "#ECE6F2", paddingTop: "5%" }}>
                        <p className="text-center" style={pStyle}>
                            Welcome to
                        </p>
                        <h2 className="text-center" style={h1Style}>International Conference <br />
                            on <br />
                            Application Frameworks</h2>
                        <img src={LoginImg} style={imgStyle} />
                    </Col>
                    <img src={LoginPath} style={loginPathImg} />
                    <Col lg={6} sm={12} className="wholeColumn">
                        <div className="container">
                            <h1 className="h1Style" >Sign Up</h1>
                            <hr width="20%" align="left" className="hrStyle" />
                            <p className="pStyle" >
                                Welcome back to ICAF. Please insert your login details to admit the system.
                            </p>

                            <form id="myForm">

                                <div className="form-group">

                                    <TextField variant="outlined" fullWidth size="small" label="Name" style={inputBoxStyle} type="text" id="name" placeholder="Enter Username"
                                        onChange={(event) => {
                                            setName(event.target.value)
                                        }} />

                                </div>

                                <div className="form-group">

                                    <TextField variant="outlined" fullWidth size="small" label="Email" style={inputBoxStyle} type="text" id="emaill" placeholder="Enter Email"
                                        onChange={(event) => {
                                            setEmail(event.target.value)
                                        }} />
                                </div>

                                <div className="form-group">
                                    <TextField variant="outlined" fullWidth size="small" label="Password" style={inputBoxStyle} type="password" id="pass" placeholder="Enter Password"
                                        onChange={(event) => {
                                            setPassword(event.target.value)
                                        }} />
                                </div>
                                <div className="form-group">
                                    <div>
                                        <label > <b>User Type</b></label>
                                        <div>
                                            <input type="radio" name="user" value="researcher" id="flexRadioDefault1" onChange={(event) => {
                                                setUser(event.target.value)
                                            }} />
                                            <label>
                                                Reacher
                                            </label>
                                        </div>
                                        <div style={{paddingLeft:"13%"}}>
                                            <input type="radio" name="user" value="workshop" id="flexRadioDefault2" onChange={(event) => {
                                                setUser(event.target.value)
                                            }} />
                                            <label>
                                                Workshop Conductor
                                            </label>
                                        </div>
                                        <div style={{paddingLeft:"2%"}}>
                                            <input type="radio" name="user" value="attendee" id="flexRadioDefault2" onChange={(event) => {
                                                setUser(event.target.value)
                                            }} />
                                            <label>
                                                Attendeee
                                            </label>
                                        </div>
                                     
                                     
                                       
                                    </div>

                                </div>
                                <div className="form-group">
                                <input type="checkbox" value="true" id="flexCheckDefault" onChange={(event) => {
                                    setCheck(event.target.value)
                                }} />
                                <label style={{marginLeft:"2%"}}>
                                    I agreed terms and conditions.
                                </label>
                                <br />
                                </div>

                                <Button style={buttonStyle} type="submit" className="btn btn-primary" onClick={register}>Sign In</Button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>

    )
}

export default Registraion;

/*

<div className="container">
                <h1 className="h1Style" >Sign In</h1>
                <form id="myForm">
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">User Name</label>
                        <input required style={inputBoxStyle} type="text" id="name" placeholder="Enter Username"
                            onChange={(event) => {
                                setName(event.target.value)
                            }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">Email</label>
                        <input required style={inputBoxStyle} type="text" id="emaill" placeholder="Enter Email"
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">Password</label>
                        <input required style={inputBoxStyle} type="password" id="pass" placeholder="Enter Password"
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }} />
                    </div>
                    <div>
                        <label >User Type</label>
                        <div>
                            <input type="radio" name="user" value="researcher" id="flexRadioDefault1" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Reacher
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="user" value="workshop" id="flexRadioDefault2" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Workshop Conductor
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="user" value="attendee" id="flexRadioDefault2" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Attendeee
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="user" value="admin" id="flexRadioDefault2" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Admin
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="user" value="reviewer" id="flexRadioDefault2" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Reviewer
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="user" value="editor" id="flexRadioDefault2" onChange={(event) => {
                                setUser(event.target.value)
                            }} />
                            <label>
                                Editor
                            </label>
                        </div>
                    </div>
                    <br />
                    <input type="checkbox" value="true" id="flexCheckDefault" onChange={(event) => {
                        setCheck(event.target.value)
                    }} />
                    <label>
                        I agreed terms and conditions.
                    </label>
                    <br />
                    <div>
                        <button type="submit" className="btn btn-primary" onClick={register}>Submit</button>
                    </div>
                </form>

                </div>*/
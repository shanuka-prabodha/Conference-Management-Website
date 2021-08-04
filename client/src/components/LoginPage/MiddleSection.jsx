import React, { useState } from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import LoginImg from "../img/Login-img.svg";
import LoginPath from "../img/login-path.svg";
import axios from "axios"
import {useHistory} from "react-router-dom";
import TextField from '@material-ui/core/TextField';

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
    marginTop:"3%"
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

const loginPathImg ={
    position: "absolute",
    width: "14%",
    height: "auto",
    fontFamily: "Montserrat sans-serif"
}

function MiddleSection(){
    
const [email , setEmail] = useState("")
const [password , setPassword] = useState("")
const type = "guest"
const history = useHistory()

function login(e){
    e.preventDefault();

    const oldUser = {
        email,
        password
    }
    
    console.log(email , password)

    axios.post("http://localhost:8070/user/login",oldUser).then((response)=>{
        if(response.data.message){
            alert(response.data.message)    
        }else{

            localStorage.setItem("token" , response.data.token)
           
            if(response.data.usertype == "Seller"){
                history.push("/product")
            }else{
                history.push("/")
            }
    

        }    
    }).catch((err) =>{
        alert(err)
    })
}    

    return(
    <div>
        <Container fluid>
            <Row>
                <img src={LoginPath} style={loginPathImg}/>
                <Col lg={6} sm={12} className="wholeColumn">
                        <div className="container">
                            <h1 className= "h1Style" >Sign In</h1>
                            <hr width="20%" align="left" className="hrStyle"/>
                            <p className= "pStyle" >
                                Welcome back to ICAF. Please insert your login details to admit the system.
                            </p>

                            <form >

                                <div className="form-group">
                                    
                                    <TextField variant="outlined" fullWidth size="small" label="Email" style={inputBoxStyle} type="text" className="form-control" id="age" placeholder="Insert your email address"
                                           onChange={(event)=>{
                                            setEmail(event.target.value)
                                           }}/>

                                </div>

                                <div className="form-group">
                                    
                                    <TextField variant="outlined" fullWidth size="small" label="Password" style={inputBoxStyle} type="password" className="form-control" id="age" placeholder="Insert your password"
                                           onChange={(event)=>{
                                            setPassword(event.target.value)
                                           }}/>

                                </div>
                                <br/>

                                <Button onClick={login} style={buttonStyle} type="submit">Sign In</Button>
                                <br />
                                <hr width="70%" align="center" style={hrStyle}/>
                                <br />
                                <Button  style={buttonSignUp} >Sign Up</Button>
                            </form>
                        </div>
                </Col>
                <Col lg={6} sm={12} style = {{backgroundColor: "#ECE6F2", paddingTop: "5%"}}>
                    <p className= "text-center" style={pStyle}>
                        Welcome back to
                    </p>
                    <h2 className="text-center" style={h1Style}>International Conference <br />
                        on <br />
                        Application Frameworks</h2>
                   <img src={LoginImg} style = {imgStyle} />
                </Col>
            </Row>
        </Container>
    </div>);
}

export default MiddleSection;
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import paid from "../img/ticket.jpg"
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Footer from "../LandingPage/Footer/Footer";
const crypto = require("crypto");


var userType="";

const loginStyle = {
    width: '400px',
    heigth: 'auto',
    padding: '5% 10% 0%',

}

const loginButton = {
    margin: '5% 2.5% 5%',
    backgroundColor: '#5E4FA2',
    width: "200px"
}

const paperStyle = {
    width: "50%",
    heigth: "auto",
    padding: "2.5%",
    
}

export default function Buyticket() {

    const referenceid = crypto.randomBytes(16).toString("hex");

    console.log(referenceid);



    const history = useHistory();
    const buy=()=>{
        history.push('/payment',{
            type:'ticket',
            ref:referenceid
        })
      }



    return (
        <div>
            <AppBarComponent getUserType={userType}/>
        
        <div className="container my-5" style={{height:"90vh"}}>
       
            <Grid container spacing={3} align="center" justify="center" alignItems="center">

                <Paper style={paperStyle} elevation={11} >
                    <Grid align="center">
                        <Typography variant="h4" style={{ color: "#5E4FA2", fontWeight: 700, marginBottom: "5%", fontFamily: 'Poppins'}}>Your Ticket</Typography>
                    </Grid>
                    <Grid>
                        <img src={paid} style={{ width: "300px" }} />
                    </Grid>
                  
                    <Grid>
                        <Button type="submit" variant="contained" color="secondary" size="large" style={loginButton} onClick={()=>buy()}>
                           Buy
                            </Button>

                    </Grid>
                    <Grid>
                        <h6>Your Reference Number : {referenceid}</h6>
                       Ticket Price 2000/=
                    </Grid>


                </Paper>


            </Grid>

            
        </div>
        <Footer />
        </div>


    )
}
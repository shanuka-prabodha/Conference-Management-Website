import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import { validate } from "react-email-validator";
import paid from "../img/paid.jpg"
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const loginStyle = {
    width: '400px',
    heigth: 'auto',
    padding: '5% 10% 0%',

}

const loginButton = {
    margin: '5% 2.5% 5%',
    backgroundColor: '#F83037',
    width: "200px"
}

const paperStyle = {
    width: "30%",
    heigth: "auto",
    padding: "2.5%",
    position: "absolute",
    top: "10%",
    left: "30%"
}

export default function Payment_success() {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
    
      const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
      }));
    
      const classes = useStyles();
     
      const [open, setOpen] = React.useState(false);
    
     
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    


    let [email, setEmail] = useState(" ");
    const [emailError, setEmailError] = useState('')

    const location = useLocation();
    let refId = location.state.refnum;
    const payType = location.state.type;
    const payable = location.state.amount;

    if(payType=='ticket'){
        refId= 'Your Reference Number is ' + refId;
    }

    const history = useHistory();

    //==========================Email Validation==========================//
    const validateEmail = (e) => {

        setEmail(e.target.value);

        if (validate(email) == true) {
            setEmailError('Valid Email')
        } else {
            setEmailError('Enter valid Email!')
        }
    }




     //==========================Send Email==========================// 

    function sendEmail(e) {
        e.preventDefault();

        const newRegister = {
            email,
            refId,
            payable
       
        }

        axios.post("http://localhost:8070/onlinepay/sendmail", newRegister).then((res) => {
            // const resdata = res.data
            if (emailError === "Valid Email") {
                setOpen(true);
                setTimeout(() => {
                    history.push("/")
                }, 3000);
            }
          

        }).catch((err) => {
            alert(err)
        })

    }



    return (
        <div className="container">
       
            <Grid container spacing={3} align="center" justify="center" alignItems="center">

                <Paper style={paperStyle} elevation={11} >
                    <Grid align="center">
                        <Typography variant="h4" style={{ color: "#F83037", fontWeight: 700, marginBottom: "5%" }}>Confirm your Email to send bill.</Typography>
                    </Grid>
                    <Grid>
                        <img src={paid} style={{ width: "300px" }} />
                    </Grid>
                    <Grid>
                        <TextField id="outlined-basic" style={{ marginTop: "5%" }} label="Email" variant="outlined" color="secondary" size="small" fullWidth required pattern="[0-9]"
                            onChange={(e) => {
                                validateEmail(e)

                            }} /> <br />

                    </Grid>
                    <Grid>
                        <Button type="submit" variant="contained" color="secondary" size="large" style={loginButton} onClick={sendEmail}>
                            Send Email
                            </Button>

                    </Grid>
                    <Grid>
                        <Typography variant="h6" >Your Receipt</Typography>
                    </Grid>


                </Paper>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Email Sent Successfuly!
        </Alert>
      </Snackbar>

            </Grid>

        
        </div>


    )
}
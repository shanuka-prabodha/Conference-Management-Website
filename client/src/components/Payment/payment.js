import React, { useState } from "react";
import axios from "axios";
import master from "../img/Master.png"
import visa from "../img/visa.png"
import cards from "../img/cards.png"
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import { useLocation } from "react-router-dom";
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import ReceiptCard from "./ReceipteCard";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
var userType="";

const loginStyle = {
    width: '400px',
    heigth: 'auto',
    padding: '5% 10% 0%',

}

const loginButton = {
    margin: '5% 2.5% 5%',
    backgroundColor: '#5E4FA2',
    width: "100px",
    fontFamily: 'Poppins'
}

const paperStyle = {
    width: "30%",
    heigth: "auto",
    padding: "2.5%",
    position: "absolute",
    top: "15%"
}

export default function Payment(props) {


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
    

    const [type, setType] = useState(" ");
    const [number, setNumber] = useState();
    const [year, setYear] = useState();
    const [date, setDate] = useState();
    const [cvc, setCvc] = useState();
    var [payable, setPayable] = useState();


    const location = useLocation();
    const payid = location.state.id;
    const paytype = location.state.type;
    const refId = location.state.ref;




    
    //============================ useState for Spinners================================
    const [loading, setLoading] = useState(false);

    //============================CARD PAYMENT FUNCTION================================

    const history = useHistory();

    function sendData(e) {
        setLoading(true)
        e.preventDefault();



      

        //store user entered data into object
        const newuser = {
            type,
            number,
            year,
            date,
            cvc,
            payable

        }

        const body = {
            id: payid,
            paid: 'yes'

        }

        //send newuser object to backend 
        axios.post("http://localhost:8070/onlinepay/card", newuser).then((res) => {

            setTimeout(() => {
                setLoading(false)
                const resdata = res.data
                if (resdata === "true") {    // if backend task successfully completed received the message as true

                    if (paytype == 'paper') {
                        axios.put("http://localhost:8070/paidupdate", body
                        ).then((res) => {

                            const access_token = localStorage.getItem('token')
                            console.log(access_token)
                            let config = {
                              headers: {
                                'Authorization': 'Bearer ' + access_token
                              }
                            }
                            axios.get('http://localhost:8070/user/post',
                                config)
                                .then((response) => {
                                    if (response.data.message) {
                                        alert(response.data.message)
                                    } else {

                                        const newpayment = {
                                            users: response.data.user._id,
                                            amount: payable,
                                            type: paytype,
                                         
                                        }

                                        axios.post("http://localhost:8070/payment/paid", newpayment).then((res) => {

                                            if (res.data == "true") {
                                                setOpen(true);
                                                setTimeout(() => {
                                                    history.push("/success",{
                                                        refnum: "Your reaserch paper is approved",
                                                        type:paytype,
                                                        amount: payable,
                                                    })//navigate the payment_success page and send data
                                                }, 3000);

                                          
                                            } else {
                                                alert("error")
                                            }

                                        }).catch((err) => {
                                            alert(err)
                                        })

                                    }

                                })
                                .catch()

                           

                        }).catch((err) => {
                            console.log(err)
                        })


                    } else {

                      
                        const access_token = localStorage.getItem('token')
                        console.log(access_token)
                        let config = {
                          headers: {
                            'Authorization': 'Bearer ' + access_token
                          }
                        }
                        axios.get('http://localhost:8070/user/post',
                            config)
                            .then((response) => {
                                if (response.data.message) {
                                    alert(response.data.message)
                                } else {
                              
                                    const newpayment = {
                                        users: response.data.user._id,
                                        amount: payable,
                                        type: paytype,
                                        reference:refId
                                    }

                                    axios.post("http://localhost:8070/payment/paid", newpayment).then((res) => {

                                        if (res.data == "true") {
                                            setOpen(true);
                                            setTimeout(() => {
                                                history.push("/success",{
                                                    refnum:refId,
                                                    type:paytype,
                                                    amount: payable
                                                })//navigate the payment_success page and send data
                                            }, 3000);

                                          
                                        } else {
                                            alert("error")
                                        }

                                    }).catch((err) => {
                                        alert(err)
                                    })

                                }

                            })
                            .catch()

                    }





                }
                else if (resdata === "false") {
                    alert(res.data);

                }
                else if (resdata === "balance insufficient") {    //if received the message as balance insufficient
                    history.push("/failed")  //navigate the payment_failed page

                }

            }, 3000)

        }).catch((err) => {
            alert(err)
        })

    }




    function cancel() {
        history.push("/cart")
    }




    //============================CARD PAYMENT TOGGLE================================

    const years = [
        {
            value: '2022',
            label: '2022',
        },
        {
            value: '2023',
            label: '2023',
        },
        {
            value: '2024',
            label: '2024',
        },
        {
            value: '2025',
            label: '2025',
        },
        {
            value: '2026',
            label: '2026',
        },
        {
            value: '2027',
            label: '2027',
        },
        {
            value: '2028',
            label: '2028',
        },
        {
            value: '2029',
            label: '2029',
        },
        {
            value: '2030',
            label: '2030',
        },
    ];

    const months = [
        {
            value: '01',
            label: '01',
        },
        {
            value: '02',
            label: '02',
        },
        {
            value: '03',
            label: '03',
        },
        {
            value: '04',
            label: '04',
        },
        {
            value: '05',
            label: '05',
        },
        {
            value: '06',
            label: '06',
        },
        {
            value: '07',
            label: '07',
        },
        {
            value: '08',
            label: '08',
        },
        {
            value: '09',
            label: '09',
        },
        {
            value: '10',
            label: '10',
        },
        {
            value: '11',
            label: '11',
        },
        {
            value: '12',
            label: '12',
        },
    ];

    const [currency, setCurrency] = React.useState('');

    const yearChange = (event) => {
        setCurrency(event.target.value);
        setYear(event.target.value);
    };

    const [month, setMonth] = React.useState('');

    const monthChange = (event) => {
        setMonth(event.target.value);
        setDate(event.target.value)
    };




    //=====================return function============================

    return (

        <div>
            <AppBarComponent getUserType={userType}/>
        <div className="container">

            <Grid container spacing={3} align="center" justify="center" alignItems="center">
			<ReceiptCard paytype={paytype}  />
                <Paper elevation={2} style={paperStyle}>
                    <Grid align="left">
                        <Typography variant="h5" align="center" style={{ marginBottom: "5%", color: "#5E4FA2", fontFamily: 'Poppins', fontWeight: "700" }}>Select your Payment Method</Typography>
                    </Grid>
                    <Grid>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="userType" name="payment">
                                <img src={cards} width="50px" />
                                <FormControlLabel value="card" control={<Radio />} label="Card Payment" />
                                <div style={{
                                    borderRadius: '10px',
                                    padding: '30px',
                                    display: "inline-block",
                                    marginTop: '10px',
                                    width: '400px'
                                }}>

                                    <form onSubmit={sendData}>

                                        <Grid container spacing={2} align="center" justify="center" alignItems="center">



                                            <Paper style={loginStyle} elevation={11} fullWidth>
                                                <Grid align="center">
                                                    <Typography variant="subtitle1" >Payment Details</Typography>
                                                </Grid>
                                                <Grid>
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">Card Type *</FormLabel>
                                                        <RadioGroup aria-label="userType" name="gender1"  >
                                                            <img src={visa} width="50px" />
                                                            <FormControlLabel value="visa" control={<Radio />} label="Visa" onChange={(event) => {
                                                                setType(event.target.value)
                                                            }}></FormControlLabel>

                                                            <img src={master} width="50px" />
                                                            <FormControlLabel value="master" control={<Radio />} label="Master"
                                                                onChange={(event) => {
                                                                    setType(event.target.value)
                                                                }} />

                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>

                                                <Grid>
                                                    <TextField id="outlined-basic" label="Card Number" variant="outlined" color="secondary" size="small" fullWidth required pattern="[0-9]"
                                                        onChange={(event) => {
                                                            setNumber(event.target.value)
                                                        }} /> <br />
                                                </Grid>

                                                <Grid>
                                                    <TextField
                                                        required
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Year"
                                                        value={currency}
                                                        size="small"
                                                        onChange={yearChange}
                                                        variant="outlined"
                                                        style={{ marginTop: "5%", width: "100px" }}
                                                    >
                                                        {years.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>

                                                <Grid>
                                                    <TextField
                                                        required
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Month"
                                                        value={month}
                                                        onChange={monthChange}
                                                        variant="outlined"
                                                        size="small"
                                                        style={{ marginTop: "5%", width: "100px" }}
                                                    >
                                                        {months.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>

                                                <Grid>
                                                    <TextField id="outlined-basic" label="CVV Number" variant="outlined" style={{ marginTop: "5%", width: "130px" }} color="secondary" size="small" fullWidth required pattern="[0-9]"
                                                        onChange={(event) => {
                                                            setCvc(event.target.value)
                                                            if(paytype=='paper'){
                                                                setPayable(12000);
                                                            }
                                                            if(paytype=='ticket'){
                                                                setPayable(2000)
                                                            }
                                                        
                                                        }} /> <br />
                                                </Grid>
                                                <Grid>
                                                    <Button type="submit" variant="contained" color="secondary" size="large" style={loginButton} disabled={loading} size="small">
                                                        Pay
                                                        {
                                                            loading && <i className="fa fa-refresh fa-spin"></i>}
                                                    </Button>

                                                    <Button variant="contained" color="secondary" size="large" style={loginButton} onClick={cancel} size="small">
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                            </Paper>

                                        </Grid>
                                    </form>


                                  

                                </div>


                            </RadioGroup>

                        </FormControl>
                    </Grid>


                </Paper>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Payment Successfuly!
        </Alert>
      </Snackbar>

            </Grid>
        </div>
        </div>
    )

}





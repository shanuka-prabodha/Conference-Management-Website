import React, { Component } from "react";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


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

export default class Payment_failed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            digit: 10,      //intial state = 10 
        }
    }


    componentDidMount  ()  {

        this.myTimer = setInterval(() => {
            this.setState((prevState) => ({
                digit: prevState.digit - 1,    //reduce state by 1 in every second

            }));


        }, 1000)


        setTimeout(() => {
            clearInterval(this.myTimer)    // clear interval after 10seconds

        }, 10000)

    }




    render() {


        const { digit } = this.state;


        if (digit == 0) {
            return <Redirect to="/" />    //after 10 seconds redirect to the cart page
        }

        return (

            <div className="container">
            
                <Grid container spacing={3} align="center" justify="center" alignItems="center">

                    <Paper style={paperStyle} elevation={11} >
                        <Grid align="center">
                            <Typography variant="h4" style={{ color: "#F83037", fontWeight: 700, marginBottom: "5%" }}>Your Credit Card Balance is insufficient</Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="h6">Try Again</Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="h6">Thank you</Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="h6">{digit}</Typography>
                        </Grid>
                    </Paper>
                </Grid>

            </div>
        )
    }

}
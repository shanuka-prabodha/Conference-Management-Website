import React, { useEffect, useState } from 'react';
import AppBarComponent from "../../LandingPage/AppBar/AppBarComponent";
import "../../Styles/editworkshop.css";
import { Col, Container, Row } from "react-bootstrap";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { UilStopwatch } from '@iconscout/react-unicons';
import FormControl from '@material-ui/core/FormControl';
import EditClock from "../../img/Clock-edit.svg";
import FileBase from 'react-file-base64';
import Footer from "../../LandingPage/Footer/Footer";
import {
    ThemeProvider,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import axios from "axios";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1.5),
        width: '400px'
    },
}));

const buttonColor = {
    backgroundColor: "#5E4FA2",
    color: "white",
    fontFamily: "Poppins",
    borderRadius: "12px",
    margin: "5% 0",
    width: "fit-content"
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#5E4FA2",
        },
    },
});

function EditWorkshop(props) {



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
                    seTuserType(response.data.user.usertype)
                }
              })
              .catch()
        };
        getusertype();
      }, []);

    const [workshop, setWorkshop] = useState({
        topic: "",
        description: "",
        date: "",
        time: "",
        image: "",
        pdf: "",
        file_path: "",
        file_mimetype: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setWorkshop(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    function handleClick() {
        axios.put(`http://localhost:8070/workshops/change/${props.match.params.id}`, workshop);
        setOpen(true);
    }

    useEffect(() => {

        axios.get(`http://localhost:8070/workshops/${props.match.params.id}`).then(res => {
            setWorkshop(res.data);
        })
    }, []);




    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
              <AppBarComponent getUserType={userType} />
            <div  className="my-5">
            <Container>
                <Row className="align-middle" >

                    <Col lg={12}>
                        <div className="editForm">
                            <div className="dialog-title">
                                Lets change existing workshop.
                                <hr className="workshopStyle" />
                            </div>
                            <img src={EditClock} className="clockImage" />
                            <FormControl>
                                <ThemeProvider theme={theme}>
                                    <TextField name="topic" id="mui-theme-provider-outlined-input" className={classes.margin} label="Workshop name" variant="outlined" fullWidth size="small" onChange={handleChange} value={workshop.topic} InputLabelProps={{
                                        shrink: true,
                                    }} />
                                    <TextField name="description" id="mui-theme-provider-outlined-input" className={classes.margin} label="Description" multiline rows={4} variant="outlined" fullWidth size="small" onChange={handleChange} value={workshop.description} InputLabelProps={{
                                        shrink: true,
                                    }} />
                                    <TextField name="date" type="date" id="mui-theme-provider-outlined-input" className={classes.margin} label="Date" variant="outlined" fullWidth size="small" onChange={handleChange} value={workshop.date} InputLabelProps={{
                                        shrink: true,
                                    }} />
                                    <TextField name="time" type="time" id="mui-theme-provider-outlined-input" className={classes.margin} label="Time" variant="outlined" fullWidth size="small" onChange={handleChange} value={workshop.time} InputLabelProps={{
                                        shrink: true,
                                    }} />

                                    <FileBase
                                        type="file"
                                        multiple={false}
                                        name="image"
                                        onDone={({ base64 }) => setWorkshop({ ...workshop, image: base64 })}
                                    />

                                    <Button ><a
                                        href={workshop.file_path}
                                    >
                                        Download
                                    </a></Button>

                                    <Button type="submit" onClick={() => {
                                        handleClick();
                                    }} size="large" variant="contained" style={buttonColor} >Schedule <UilStopwatch style={{ marginLeft: "5%" }} /> </Button>


                                </ThemeProvider>
                            </FormControl>
                        </div>
                    </Col>
                    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            This is a success message!
                        </Alert>
                    </Snackbar>
                </Row>
            </Container>
            </div>
<Footer/>
        </div>
    )
}

export default EditWorkshop;
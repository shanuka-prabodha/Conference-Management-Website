import React, { useRef, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { UilStopwatch } from '@iconscout/react-unicons';
import { ThemeProvider,makeStyles,createMuiTheme,} from '@material-ui/core/styles';
import axios from "axios";
import Dropzone from 'react-dropzone';
import { UilUpload } from '@iconscout/react-unicons';
import FileBase from 'react-file-base64';



const buttonColor = {
    backgroundColor: "#5E4FA2",
    color: "white",
    fontFamily: "Poppins",
    borderRadius: "12px",
    margin: "5% 0",
    width: "fit-content"
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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#5E4FA2",
        },
    },
});

function ItemForm(props) {

    const [item, setItem] = useState([])

    const [details, setDetails] = useState({
        topic: "",
        description: "",
        date: "",
        time: "",
        image: "",
        pdf: "",
        userID: "",
        state: "pending"
    });

    useEffect(() => {

    }, []);


    function handleChange(event) {
        const { name, value } = event.target;
        console.log(name);
        setDetails(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });


    const access_token = localStorage.getItem('token')
    console.log(access_token)
    let config = {
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    }
    axios.get(
      'http://localhost:8070/user/post',
      config)
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message)
        } else {
            //alert(response.data.user._id)
            setDetails(prevValue => {
                return {
                    ...prevValue,
                    userID: response.data.user._id
                };
            });
        }
      })
      .catch()

    }

    function handleClick(event) {

    
        props.addWorkshops(details);
        setDetails({
            topic: "",
            description: "",
            date: "",
            time: "",
            image: "",
            pdf: "",
            userID: ""
        });

        event.preventDefault();
    }

    // File upload

    const [file, setFile] = useState(null);
    const dropRef = useRef();

    const onDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile)
    }

    const updateBorder = (dragState) => {
        if (dragState === 'over') {
            dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
            dropRef.current.style.border = '2px dashed #e9ebeb';
        }
    }


    function handleOnSubmit(e) {
        console.log(file);
        e.preventDefault();

        const formData = new FormData();

        formData.append('pdf', file);
   


        axios.get("http://localhost:8070/workshops/lastItem").then(res => {

            setItem(res.data);

            item.map((items) => {
                    axios.put(`http://localhost:8070/workshops/uploadFile/${items._id}`, formData, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    }).then((response) => {
                        console.log(response.data);

                    }).catch((error) => {

                        console.log(error);
                    });
            })
            console.log(res.data);
            //setWorkshop(res.data)
        });
    }

    //File upload end

    function uploadFile() {
      
        handleOnSubmit();
    }



    const classes = useStyles();
    return (
        <div>
            <form>
                <ThemeProvider theme={theme}>
                    <TextField name="topic" id="mui-theme-provider-outlined-input" className={classes.margin} label="Workshop name" variant="outlined" fullWidth size="small" onChange={handleChange} value={details.title} />
                    <TextField name="description" id="mui-theme-provider-outlined-input" className={classes.margin} multiline rows={4} label="Description" variant="outlined" fullWidth size="small" onChange={handleChange} value={details.description} />
                    <TextField name="date" type="date" id="mui-theme-provider-outlined-input" className={classes.margin} label="Date" variant="outlined" fullWidth size="small" onChange={handleChange} InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField name="time" type="time" id="mui-theme-provider-outlined-input" className={classes.margin} label="Time" variant="outlined" fullWidth size="small" onChange={handleChange} InputLabelProps={{
                        shrink: true,
                    }} />

                    <FileBase
                        type="file"
                        multiple={false}
                        name="image"
                        onDone={({ base64 }) => setDetails({ ...details, image: base64 })}
                    />

                </ThemeProvider>
                <br />
                <Button onClick={(event) => {
                    handleClick(event);
                }} size="large" variant="contained" style={buttonColor}>Schedule <UilStopwatch style={{ marginLeft: "5%" }} /> </Button>


                <div className="upload-section row" style={{ width: 'fit-content' }}>
                    <div className="col-lg-8">
                        <Dropzone
                            onDrop={onDrop}
                            onDragEnter={() => updateBorder('over')}
                            onDragLeave={() => updateBorder('leave')}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef} style={{ border: '1px solid #000', height: '100px' }}>
                                    <input {...getInputProps()} />
                                    <p>Click here to select a file</p>
                                    {file && (
                                        <div>
                                            <strong>Selected file:</strong> {file.name}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    <div className="col-lg-4">
                        <Button style={buttonColor} onClick={handleOnSubmit}><UilUpload style={{ margin: "5% 0" }} /></Button>
                    </div>
                </div>

                <Button type="submit" style={buttonColor}>Done</Button>

            </form>
        </div>

    )
}

export default ItemForm;
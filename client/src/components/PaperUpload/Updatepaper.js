import React, { useState, useRef ,useEffect } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBarComponent from "../LandingPage/AppBar/AppBarComponent";
import Footer from "../LandingPage/Footer/Footer";
import {useHistory} from "react-router-dom"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const buttonColor = {
  backgroundColor: "#5E4FA2",
  color: "white",
  fontFamily: "Poppins",
  borderRadius: "7px",
  margin: "5% 0",
  width: "100px"
}

export default function Updatepaper(){


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


  const [file,setFile] = useState(null);
 
  const [filename,setFilename] = useState('')
  const [id , setID] = useState('')
  const dropRef = useRef();


  const history = useHistory();
  const location = useLocation();
  const updateid = location.state.id;
  let uptitle=location.state.title;
  let updescription=location.state.description;
  const upfile_path=location.state.file_path;

  const [userType, seTuserType] = useState('')

  const [data, setData] = useState({
    title: uptitle,
    description: updescription
});


  function handleChange(event) {
    const { name, value } = event.target;
    setData(prevValue => {
        return {
            ...prevValue,
            [name]: value
        };
    });
}



  const onDrop = (files)=>{
    const[uploadedFile] = files;
    setFile(uploadedFile)
  }

  const updateBorder=(dragState)=>{
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  }


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

 function handleOnSubmit(e){
        e.preventDefault();
        const access_token = localStorage.getItem('token')
        console.log(access_token)
         let config = {      
             headers: {
               'Authorization': 'Bearer ' + access_token
             }
         }
         axios.get('http://localhost:8070/user/post',config).then( ( response ) => {
             if(response.data.message){
                 alert(response.data.message)  
             }else{
             

             }   
        
           })
           .catch()
 
      const formData = new FormData();
      formData.append('id',updateid);
      formData.append('file',file);
      formData.append('title',data.title);
      formData.append('description',data.description);

     
        axios.put("http://localhost:8070/updatepaper", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((response) => {
          setOpen(true);
          setTimeout(() => {
            history.push("/file-list")
          }, 3000);
         
            }).catch((error) => {
                console.log(error);
                
        });
    }



    return (

      <div>

      <AppBarComponent getUserType={userType} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Updated Successfuly!
        </Alert>
      </Snackbar>
      <br />
        <div className="dialog-title" style={{ marginBottom: "5%" }}>
          Update Your Research Paper Here
          <hr className="workshopStyle" />
        </div>

      <form onSubmit={handleOnSubmit} >


        <hr />
        
        <div className="form-check "  >
          <TextField type="text" name="title"
          label="Enter Title"
          variant="outlined"  size="small"
          style={{marginTop:"1%", width:"500px"}}
          value= {data.title}
          onChange={handleChange} />
        </div>

        <div className="form-check "  >
          <TextField style={{marginTop:"1%", width:"500px"}} multiline rows={4} variant="outlined" label="Enter Description" size="small" type="text" name="description"
              value= {data.description}
              onChange={handleChange}/>
        </div>

        <div className="upload-section" style={{ width: '800px', marginTop:"1%", marginLeft:"30%"}}>
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef} style={{ border: '1px solid #000', height: '200px' }}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {'file.name'}
                {file && (
                  <div>
                    <strong>Selected file: </strong> {file.name}
                    {setFilename(file.name)}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>


        <Button type="submit" className="btn btn-danger" style={buttonColor}>Upload</Button>

      </form>

  



    </div>
    )

  
    


}
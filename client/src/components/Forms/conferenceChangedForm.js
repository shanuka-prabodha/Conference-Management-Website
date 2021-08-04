import React,{useState,useEffect} from 'react';

import Styles from './styles'
import {TextField,Button,Typography,Paper} from '@material-ui/core'

import {useDispatch,useSelector} from 'react-redux'
import {updateconference} from '../actions/conference';
import axios from 'axios';

const EventForm = ({currentId,setCurrentId})=>{
    const classes = Styles();
    const dispatch = useDispatch();
    

    const[postData,setPostData] =useState({
      Title: '',description:'',startingDate:'',endDate:'',approvel:"",Venue:'',changer:"",message:""

        
    }) 




    const eventpost =useSelector((state) =>currentId ? state.conference.find((p)=>p._id ===currentId):null);

    useEffect(()=>{
            if(eventpost) setPostData(eventpost);


           


    },[eventpost])

    






    const handleSubmit =(e) =>{

 

        if(currentId){

          
                dispatch(updateconference(currentId,postData))
            
            

           
     
            
            clear();
        }


        
    }

    const clear =()=>{
        setCurrentId(null);
        setPostData({
            Title: '',description:'',startingDate:'',endDate:'',approvel:'no',Venue:'',changer:"editor",message:""
    
            
        }) 
    
    }

   


    console.log("this is from from "+postData.Title);

    return(

        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>

                <Typography variant="h6"> Edit Conference </Typography>
                <TextField name ='Title' 
                variant="outlined"
                label="Title"
                fullWidth
                value={postData.Title}
                onChange={(e) =>setPostData({...postData, Title : e.target.value })}
                />
                <TextField name ='Venue' 
                variant="outlined"
                label="Venue"
                fullWidth
                value={postData.Venue}
                onChange={(e) =>setPostData({...postData, Venue : e.target.value })}
                />


                <TextField name ='description' 
                variant="outlined"
                label="Description"
                fullWidth
                value={postData.description}
                onChange={(e) =>setPostData({...postData, description : e.target.value })}
                />

                <TextField name ='startingDate' 
                variant="outlined"
                label="Starting Date"
                fullWidth
                value={postData.startingDate}
                onChange={(e) =>setPostData({...postData, startingDate : e.target.value })}
                />


            
 
              <TextField name ='endDate'

                variant="outlined"
                label="end Date"
                fullWidth
                value={postData.endDate}
                onChange={(e) =>setPostData({...postData, endDate : e.target.value })}
                />

                <TextField name ='message'

                variant="outlined"
                label="Message"
                fullWidth
                value={postData.message}
                onChange={(e) =>setPostData({...postData, message : e.target.value })}
                />


                <div className={classes.fileInput}>
                  

                    <Button className={classes.buttonSubmit} variant="contained" type="submit" color="primary" size ="large" fullWidth>
                      SUBMIT  </Button>

                      <Button variant="contained" color="secondary" size ="small"  onClick ={clear} fullWidth>
                      Clear  </Button>
                    

                    

                </div>





            </form>
            
        </Paper>
    )
}

export default EventForm;
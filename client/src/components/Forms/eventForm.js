import React,{useState,useEffect} from 'react';

import Styles from './styles'
import {TextField,Button,Typography,Paper} from '@material-ui/core'

import FileBase from 'react-file-base64'
import {useDispatch,useSelector} from 'react-redux'
import {createEvent,updateEvent} from '../actions/eventPosts'

const EventForm = ({currentId,setCurrentId})=>{
    const classes = Styles();
    const dispatch = useDispatch();

    const[postData,setPostData] =useState({
        event: '',description:'',date:'',duration:'',approvel:'no',selectedfile:'',conductor:"",Mtype:""

        
    }) 

    const eventpost =useSelector((state) =>currentId ? state.eventPosts.find((p)=>p._id ===currentId):null);

    useEffect(()=>{
            if(eventpost) setPostData(eventpost);
    },[eventpost])


    const handleSubmit =(e) =>{

 

        if(currentId){
            dispatch(updateEvent(currentId,postData))
            clear();
        }else{

        dispatch(createEvent(postData))
        clear();
        }
    }

    const clear =()=>{
        setCurrentId(null);
        setPostData({
            event: '',description:'',date:'',duration:'',approvel:'no',selectedfile:'',conductor:"",Mtype:""
    
            
        }) 
    
    }

    console.log(eventpost)

    return(

        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>

                <Typography variant="h6">{currentId ? 'Edit' :'Add'} a MainEvent </Typography>
                <TextField name ='event' 
                variant="outlined"
                label="Event"
                fullWidth
                value={postData.event}
                onChange={(e) =>setPostData({...postData, event : e.target.value })}
                />
                <TextField name ='conductor' 
                variant="outlined"
                label="Conductor"
                fullWidth
                value={postData.conductor}
                onChange={(e) =>setPostData({...postData, conductor : e.target.value })}
                />


                <TextField name ='description' 
                variant="outlined"
                label="Description"
                fullWidth
                value={postData.description}
                onChange={(e) =>setPostData({...postData, description : e.target.value })}
                />

                <TextField name ='duration' 
                variant="outlined"
                label="Duration"
                fullWidth
                value={postData.duration}
                onChange={(e) =>setPostData({...postData, duration : e.target.value })}
                />


            
 
              <TextField name ='date'
                type='datetime-local'
                variant="outlined"
                
                fullWidth
                value={postData.date}
                onChange={(e) =>setPostData({...postData, date : e.target.value })}
                />

                


            <select 

            name ='Mtype'

            variant="outlined"
            label="Type"
            fullWidth
            value={postData.Mtype}
            onChange={(e) =>setPostData({...postData, Mtype : e.target.value })}
            
            >
             <option selected>Main Event Type</option>
            <option value="workshop">workshop</option>
            <option value="research">research</option>
            
            </select>


                <div className={classes.fileInput}>
                    <FileBase
                    
                    type ="file"
                    multiple ={false}
                    onDone ={({base64})=>setPostData({...postData,selectedfile:base64})}
                    
                    />

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
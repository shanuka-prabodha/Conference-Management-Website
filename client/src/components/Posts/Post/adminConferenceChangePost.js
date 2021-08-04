import React,{useState,useEffect} from 'react';
import Styles from './style'
import {Card,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {useDispatch}  from 'react-redux';
import {updateconferenceApprovel,ConferenceDecline,ConferenceApprved} from '../../actions/conference'
import axios from 'axios';



const EventPost = ({post,setCurrentId})=>{
    const classes = Styles();
    const EventDispatch = useDispatch();
    const Dispatch = useDispatch();
    console.log(post._id)
    const [update,setupdate] = useState(null);
    
    useEffect(()=>{
        


        axios.get("http://localhost:8070/conference/readapproved").then(response=>{
            setupdate(response.data)
            console.log(response.data);
        })


},[])



    return(
        <Card className={classes.card}>

            <CardMedia className={classes.media}  title={post.Title} />

            <div className={classes.overlay}>
                
                <Typography variant="h6">Title :{post.Title}</Typography>
                <Typography variant="h6">Starting Date :{post.startingDate}</Typography>
                <Typography variant="h6">End Date :{post.endDate}</Typography>
                <Typography variant="h6">Venue :{post.Venue}</Typography>
                <Typography variant="h6">Approvel :{post.approvel}</Typography>


            </div>
            <div className={classes.overlay2}>
            
                <Button style={{color:'white'}} size='small' onClick={()=>setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize = "default" />


                </Button>

            </div>


            <CardContent>
            <Typography variant="h5" color="textPrimary">Title :{post.Title}</Typography>
            <Typography  variant="body2" color="textSecondary" gutterBottom>Desciption: {post.description}</Typography>

            <Typography  variant="body2" color="textSecondary" gutterBottom>What changed: {post.message}</Typography>
            </CardContent>

            <CardActions className= {classes.cardActions}> 
                
                  <Button size ="small" color="primary" onClick={()=>update.map((item,index)=>{
                     EventDispatch(updateconferenceApprovel(item._id,{Title:post.Title,description:post.description,startingDate:post.startingDate,endDate:post.endDate,approvel:"approved",Venue:post.Venue,changer:'admin',message:post.message}),
                     Dispatch(ConferenceApprved(post._id,{Title:post.Title,description:post.description,startingDate:post.startingDate,endDate:post.endDate,approvel:"approved",Venue:post.Venue,changer:'editor',message:post.message})),window.location.reload(false))

                })} href="/">
            
                    
                    approve

                    
                </Button>


                <Button size ="small" color="primary" onClick={()=>EventDispatch( ConferenceDecline(post._id,{Title:post.Title,description:post.description,startingDate:post.startingDate,endDate:post.endDate,approvel:"decline",Venue:post.Venue,changer:'editor',message:post.message}),
                    window.location.reload(false))} >
            
                    
            decline

            
        </Button>



        

                
            </CardActions>



        </Card>
    )
}

export default EventPost;













           
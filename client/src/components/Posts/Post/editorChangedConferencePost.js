import React from 'react';
import Styles from './style'
import {Card,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {useDispatch}  from 'react-redux';



const EventPost = ({post,setCurrentId})=>{
    const classes = Styles();
    const EventDispatch = useDispatch();
    console.log(post._id)
    
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
                
                

                
            </CardActions>



        </Card>
    )
}

export default EventPost;
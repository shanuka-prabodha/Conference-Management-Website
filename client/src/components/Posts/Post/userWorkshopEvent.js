import React from 'react';
import Styles from './style'
import {Card,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core';

import {useDispatch}  from 'react-redux';



const EventPost = ({post,setCurrentId})=>{
    const classes = Styles();
    const EventDispatch = useDispatch();
    return(
        <Card className={classes.card}>

            <CardMedia className={classes.media}  image ={post.selectedfile} title={post.event} />

            <div className={classes.overlay}>
                
                <Typography variant="h6">Date :{post.date}</Typography>
                <Typography variant="h6">Duration :{post.duration}</Typography>
                <Typography variant="h6">Conductor :{post.conductor}</Typography>
                <Typography variant="h6">Type :{post.Mtype}</Typography>


            </div>
           


            <CardContent>
            <Typography variant="h5" color="textPrimary">Event :{post.event}</Typography>
            <Typography  variant="body2" color="textSecondary" gutterBottom>Desciption: {post.description}</Typography>
            </CardContent>

            <CardActions className= {classes.cardActions}> 
                
              

                
            </CardActions>



        </Card>
    )
}

export default EventPost;
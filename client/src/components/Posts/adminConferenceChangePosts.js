import React from 'react';

import Posts from './Post/adminConferenceChangePost'

import{useSelector} from 'react-redux'

import {Grid,CircularProgress} from '@material-ui/core'



import Styles from './styles'




const EventPosts = ({setCurrentId})=>{

    const eventposts = useSelector((state)=>state.conference)

    const classes = Styles();

    console.log(eventposts);

    

    return(

        !eventposts.length ? <CircularProgress /> : (



            



            <Grid className={classes.container} container alignItems ="stretch" spacing={3}>

                {

                    eventposts.map((post)=>(

                        <Grid key={post._id} item xs={12} sm={6}>



                            <Posts post={post} setCurrentId={setCurrentId} />

                        

                        </Grid>



                    ))}



            </Grid>

        )



        

    )

    

}



export default EventPosts;
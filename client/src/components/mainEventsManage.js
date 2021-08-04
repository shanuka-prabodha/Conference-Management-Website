
import React,{useState,useEffect} from 'react';
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core';
//import mainevents from "./img/mainevents.jpg";
import EventPosts from './Posts/eventPosts';
import EventForm from './Forms/eventForm';
import Styles from './style';
import {useDispatch} from 'react-redux';
import {getEvents} from './actions/eventPosts';
import AppBarComponent from "./LandingPage/AppBar/AppBarComponent";
import axios from 'axios';
import Footer from "./LandingPage/Footer/Footer";

const App =() =>{

        const [currentId,setCurrentId] = useState(null);
        const [userType, seTuserType] = useState('')
        const classes = Styles();
        const dispatch =useDispatch();

        useEffect(()=>{
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
            dispatch(getEvents());

        },[currentId,dispatch])

    return (

        <div>
        <AppBarComponent getUserType={userType}/>
        
            <Container maxwidth ='lg'>



                <AppBar className ={classes.appBar} position ="static" color ='inherit'>

                    <Typography className={classes.heading} variant ="h2" align = "center">  Main Events</Typography>

                   
                </AppBar>

                <Grow in>

                    <Container>
                        <Grid container justify ="space-between" alignItems="stretch" spacing ={3}>

                            <Grid item xs ={12} sm ={7}>
                                </Grid>

                                <EventPosts setCurrentId ={setCurrentId} />     


                                <Grid item xs ={12} sm ={4}>
                                    <EventForm  currentId={currentId} setCurrentId ={setCurrentId}/>
                                </Grid>

                        </Grid>
                    </Container>

                </Grow>


            </Container>
         

</div>
           
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import AppBarComponent from "./AppBar/AppBarComponent";
import Hero from "./HeroSection/Hero";
import CardComponent from "./KeynotesComponent/CardComponent";
import axios from 'axios';
import ContactUs from "./Contacts/ContactUs";
import Footer from "./Footer/Footer";

function LandingPageComponent(){

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
                console.log(response.data.user.usertype);
                  seTuserType(response.data.user.usertype)
                  
              }
            })
            .catch()
      };
      getusertype();
    }, []);
  
      return <div>
          <AppBarComponent getUserType={userType}/>
          <Hero />
          <CardComponent />
          <ContactUs />
          <Footer />
      </div>;
  }
  
  export default LandingPageComponent;
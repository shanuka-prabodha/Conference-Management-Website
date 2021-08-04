import React,{useState,useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import MainImage from "../../img/Hero-main.svg";
import PathImage from "../../img/Path.svg";
import HalfElipse from "../../img/HalfElipse.svg";
import FullElipse from "../../img/Ellipse.svg";
import "../../Styles/style.css";
import { UilNavigator } from '@iconscout/react-unicons';
import { UilCalendarAlt } from '@iconscout/react-unicons';
import { UilBuilding } from '@iconscout/react-unicons';
import CountTime from './CountTimer';

import {useDispatch,useSelector} from 'react-redux';
import {getconference} from '../../actions/conference';
import {Grid,CircularProgress,Card,CardActions,CardContent,CardMedia,Typography } from '@material-ui/core'
import AOS from 'aos';
import '../../../../node_modules/aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();

AOS.init();

const buttonStyle = {
    backgroundColor: "#5E4FA2",
    color: "#FEC949",
    fontWeight: 500,
    fontSize: "13px",
    fontFamily: 'Montserrat',
    height: "50px",
    borderRadius: "8px",
    zIndex: "99"
}

const elipseOne = {
    top : "16%",
    left : "7%",
    width : "7%"
}

const elipseTwo = {
    bottom : "20%",
    right : "30%",
    width : "12%"
}

function Hero(post){

          //dispatch getconference details redux
        
    const [currentId,setCurrentId] = useState(null);
        
   
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(getconference());

    },[currentId,dispatch])


    //to get data from goloble store use useselector

    const eventposts = useSelector((state)=>state.conference)

/*
    {let longText = props.description;
                let shortTest = longText.substr(0, 33)
                console.log(shortTest);}
*/

    return (<div className="heroStyle my-5" id="home">
        <Container fluid>
            <img src={PathImage} className= "pathStyle"/>
            <img src={FullElipse} className="fullElipse" style={elipseOne}/>
            <img src={FullElipse} className="fullElipse" style={elipseTwo}/>

            { eventposts.map((post,index)=>{ 
                    return(
                        <div>
            <Row className="wholeRow">
                <Col lg={6} sm={12} className="wholeColumn">
                    <h1 data-aos="fade-up" className= "h1Style" >{post.Title}</h1>
                    <hr data-aos="fade-up" data-aos-delay="100" width="40%" align="left" className="hrStyle"/>
                    <p data-aos="fade-up" data-aos-delay="200" className= "pStyle" >{post.description}</p>

                    <Button style={buttonStyle} data-aos="fade-up" data-aos-delay="300" href='#contact'> Contact us Today <UilNavigator size= "35px" style={{paddingLeft:"5%"}}/></Button>
                    <img src={HalfElipse} className="halfEStyle" />
                </Col>
                <Col lg={6} sm={12}>
                    <img src={MainImage} data-aos="fade-up" data-aos-delay="150" className="imageStyle" />
                </Col>
            </Row>
            
            <Row>
                <Col lg={6} className="pl-5 d-flex  justify-content-center justify-content-lg-end" >
                    <div className="confDetails ShadowL pb-3" style={{height:"fit-content"}} data-aos="fade-up">
                        <Row>
                        <Col lg={4} >
                            <UilCalendarAlt size="100" color="#5E4FA2" className="pl-4 pt-3"/>
                        </Col>
                        <Col lg={8} className="pt-3 pl-4" style={{textAlign:"center"}}>
                            <div className="confText" style={{width:"140px"}}>{post.startingDate.substr(0, 10)}</div>
                            <div className="confText" style={{width:"140px"}}>to</div>
                            <div className="confText" style={{width:"140px"}}>{post.endDate.substr(0, 10)}</div>
                        </Col>

                        </Row>
                    </div>
                </Col>
                            

                <Col lg={6} className="pl-5 d-flex rightCard justify-content-center justify-content-lg-start" style={{paddingLeft: "80px"}}>
                    <div className="confDetails ShadowR" style={{height:"fit-content"}} data-aos="fade-up">
                        <Row>
                            <Col lg={4} >
                                <UilBuilding size="100" color="#5E4FA2" className="pl-4 pt-3"/>
                            </Col>
                            <Col lg={8} className="pt-3 pl-4">
                                <div className="confText">{post.Venue}</div> <br/>
                                <div className="confText"></div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            </div>
                    )})}
      
        </Container>
    </div>);
}

export default Hero;
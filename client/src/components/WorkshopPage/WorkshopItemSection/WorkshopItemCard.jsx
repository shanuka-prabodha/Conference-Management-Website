import React from 'react';
import "../../Styles/card.css";
import Button from "@material-ui/core/Button";
import { UilTrash } from '@iconscout/react-unicons'
import { UilEdit } from '@iconscout/react-unicons'
import { UilBookOpen } from '@iconscout/react-unicons'

const buttonColor ={
    position: "absolute",
    backgroundColor:"#5E4FA2",
    color:"white",
    fontFamily: "Poppins",
    borderRadius: "12px",
    height: "55px",
    right: "3%",
    bottom:"2%",
    width:"55px"
}

const editButtonColor ={
    position: "absolute",
    backgroundColor:"#5E4FA2",
    color:"white",
    fontFamily: "Poppins",
    borderRadius: "12px",
    height: "55px",
    right: "3%",
    bottom:"20%",
    width:"55px"
}


function WorkshopItemCard(props){

    function handleClick(){
        props.onDelete(props.id);
    }

    let longText = props.description;
    let shortTest = longText.substr(0,33)
    console.log(shortTest);

    return(
        <div>
        <div className="card-box d-flex justify-content-center ">
            <div>
                {/*<img src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" className="card-image"/>*/}
                <img src={props.image} className="card-image"/>
                <h4 className="card-topic">{props.topic}</h4>
                <p className="card-text">{shortTest}...</p>
                <p className="card-text"><div className="dateBack">Date: {props.date} <br/> Time: {props.time}</div></p>
                {props.getUserType === "workshop" && (
                <Button size="small" variant="contained" style={editButtonColor} href={`/edit/${props.id}`}> <UilEdit style={{width:"80%", height: "auto"}}></UilEdit> </Button>
                )}
                {props.getUserType === "workshop" && (
                <Button size="small" variant="contained" style={buttonColor} onClick={handleClick}><UilTrash style={{width:"80%", height: "auto"}} /> </Button>
                )}
                {!(props.getUserType === "workshop") && (
                <Button size="small" variant="contained" style={buttonColor} href={`/view/${props.id}`}> <UilBookOpen style={{width:"80%", height: "auto"}}/> </Button>
                )}
            </div>
        </div>
        </div>

    )
}

export default WorkshopItemCard;
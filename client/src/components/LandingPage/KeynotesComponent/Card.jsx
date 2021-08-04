import React from "react";
import "../../Styles/card.css";
import {Avatar} from "@material-ui/core";

function Card(props){

    return (
        <div className="card-box d-flex justify-content-center">
            <Avatar className="avatar" src={props.src}  />
            <h4 className="profName">{props.name}</h4>
            <p className="profDesc text-center">{props.position}</p>
        </div>
    );
}

export default Card;
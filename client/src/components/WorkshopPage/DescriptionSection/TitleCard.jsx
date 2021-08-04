import React from 'react';
import "../../Styles/titleCard.css";


function TitleCard(props){
    return(
        <div className="d-flex justify-content-center">
            <div className="title-card d-flex justify-content-center" >
                <div className="col-sm-8 col-lg-8 textBox">
                    <h4 className="titleName">{props.title}</h4>
                    <p className="titleDesc">{props.description}</p>
                </div>
                <div className="col-sm-4 col-lg-4 imageBox" align="center">
                    <img className="imageUrl" src ={props.imgURL} />
                </div>
            </div>
        </div>
    )
}

export default TitleCard;
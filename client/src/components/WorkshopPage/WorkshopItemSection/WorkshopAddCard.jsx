import React from "react";
import "../../Styles/card.css";
import Plus from "../../img/workshop/plusCircle.svg";


function WorkshopAddCard(props){

    return(
        <div>
            {props.getUserType === "workshop" && (
            <div className="card-box d-flex justify-content-center ">
                <img src={Plus} style={{width:"75%", height:"auto"}}/>
            </div>
            )}
        </div>
    )
}

export default WorkshopAddCard;
import React from 'react';
import TitleCard from "./TitleCard";
import Calender from "../../img/workshop/workCalender.svg"

function TitleBar(props) {
    return (
        <div className="my-5">
            {!(props.getUserType === "workshop") && (
            <div className="dialog-title" style={{ marginBottom: "5%" }}>
                Workshop Page
                <hr className="workshopStyle" style={{width:"15%"}} />
            </div>
            )}
            {props.getUserType === "workshop" && (
                <TitleCard
                    imgURL={Calender}
                    title="Schedule a new workshop."
                    description="Here you able to schedule new workshop, update workshop details and cancel scheduled workshop."
                />
            )}
        </div>
    )
}

export default TitleBar;
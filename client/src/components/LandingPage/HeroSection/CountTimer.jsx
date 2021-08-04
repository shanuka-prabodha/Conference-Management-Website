import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import "../../Styles/card.css";

function CountTimer(){

        //const {initialMinute = 0,initialSeconds = 0} = [5, 10];
      /*  const [ minutes, setMinutes ] = useState(5);
        const [seconds, setSeconds ] =  useState(27);
        useEffect(()=>{
        let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        });*/

    return(
        <div className="confDetails Shadow" style={{width:"40%"}}>
            {/* minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
            */}
            <Row>
                <Col lg={3}>
                    <div className="countdownSquare">

                    </div>
                </Col>
                <Col lg={3}>
                    <div className="countdownSquare">

                    </div>
                </Col>
                <Col lg={3}>
                    <div className="countdownSquare">

                    </div>
                </Col>
                <Col lg={3}>
                    <div className="countdownSquare">

                    </div>
                </Col>
            </Row>
            

        </div>                  
    )
}

export default CountTimer;
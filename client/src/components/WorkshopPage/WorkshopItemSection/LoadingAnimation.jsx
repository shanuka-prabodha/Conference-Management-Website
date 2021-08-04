import React, { useEffect, useRef } from "react";
import lottie from 'lottie-web';

function LoadingAnimation(){

    const container = useRef(null);

    useEffect(()=>{
        lottie.loadAnimation({
            container: container.current, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../img/loading.json') // the path to the animation json
        })
    },[])
    return(
        <div className="container" ref={container}></div>
    );
}

export default LoadingAnimation;
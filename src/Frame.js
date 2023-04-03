import React from 'react';
import './Frame.css';

const Frame = ({ images }) => {
    return (
        <div class="parent">
            <div>
                
            </div>
            <h1>Frame.</h1>
            <img className = "image1" src={images} alt="Oopsies.." />
            <svg className = "rectangle1" width="250" height="275" viewBox="0 0 785 275" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="250" height="275" fill="#FFA620" fill-opacity="0.5" />
                {/* <rect width="785" height="275" fill="#FFA620" fill-opacity="0.5" /> */}
            </svg>
            <span className = "text">Rp. 400.000</span>
        </div>
    );
};

export default Frame;

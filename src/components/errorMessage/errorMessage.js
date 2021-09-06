import React from 'react';
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <div className="my-error">
            <div> Something goes wrong</div>
            <img src = {img} alt = "error" ></img> 
        </div>
    )
}
export default ErrorMessage;

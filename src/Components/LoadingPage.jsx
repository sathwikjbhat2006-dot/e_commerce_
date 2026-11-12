import React from "react";
import "../AllCss/LoadingPage.css";

export default function LoadingPage(){
console.log("loading page");

    return(
        <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading...</p>
        </div>
    )
}
import React from "react";
import "../AllCss/AllBtn.css";

export default function AllBtn({label="",text="", className="", children,...props}){

    return(
        <button className={`custom-btn ${className}`} {...props}>{text}{children}</button>
    )
}
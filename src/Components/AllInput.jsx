import React from "react";
import "../AllCss/AllInput.css";

export default function Allinput({label="",text="",...props}){

    return(
        <div >
        {
        label && (
                <div><label >{label}</label></div>
        )}
    
        <div>
            <input  type="text" placeholder="placeholder" {...props}></input>
        </div>
        </div>
    )
}
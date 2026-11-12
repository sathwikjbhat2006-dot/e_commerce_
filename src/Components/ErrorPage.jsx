import React from "react";
import "../AllCss/ErrorPage.css";
import errorImg from "../assets/error-illustration.svg";

export default function ErrorPage({ msg = "An unexpected error occurred" }) {
    console.log("error page");

    return (
        <div className="error-container">
            <img
                src={errorImg}
                alt="Error Illustration"
                className="error-image"
            />
            <h1 className="error-title">Oops! Something went wrong.</h1>
            <p className="error-message">{msg}</p>
        </div>
    )
}
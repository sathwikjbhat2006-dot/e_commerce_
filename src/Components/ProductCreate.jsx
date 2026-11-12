import React from "react";
import { useSelector } from "react-redux";
import Form from "./Form";
import "../AllCss/ProductCreate.css";

export default function ProductCreate(){
const admin=useSelector((state)=>state.Info.Admin)
    return admin && (
        <div className="product-create-container">
            <h1 className="product-create-title">create product</h1>
            <Form mode="create"/>
        </div>
    )
}
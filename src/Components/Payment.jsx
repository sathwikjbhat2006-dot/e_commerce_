import React from "react";
import AllBtn from "./AllBtn";
import "../AllCss/Payment.css";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AddItems } from "../Features/OrderSlice";
import {ClearCart} from '../Features/CartSlice'
export default function Payment() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location =useLocation()
    const items=useSelector((state)=>state.Buy.items)
    const HandleClick=()=>{
        if(items){
        if(items.length>1 && location.state?.from ==="cart"){
            dispatch(ClearCart())
        }
        dispatch(AddItems({items:items}))}
        navigate('/profile/my-ordes')
    }
    return (
        
        <div className="payment-container">
            <h2 className="payment-title">This product only include</h2>
            <ul className="payment-methods-list">
                <li className="payment-method-card">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="payment-method-icon">
                        <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                        <line x1="12" y1="12" x2="12" y2="12.01"></line>
                        <path d="M17 12h.01"></path>
                        <path d="M7 12h.01"></path>
                    </svg>
                    <h3 className="payment-method-title">Cash on Delivery</h3>
                    <p className="payment-method-desc">Pay through cash when your order is delivered to your doorstep. Simple, safe, and secure.</p>
                    <div className="payment-action-btn-wrapper">
                        <AllBtn text="Place Order" onClick={HandleClick}/>
                    </div>
                </li>
            </ul>
        </div>
    );
}
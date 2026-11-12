import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import AllBtn from "./AllBtn";
import { RemLst } from "../Features/WhiteListSlice";
import "../AllCss/WhiteList.css";
import { AddCart } from "../Features/CartSlice";
export default function WhiteList(){
const items=useSelector((state)=>state.WhiteList?.items)
console.log(items);
const dispatch=useDispatch()

    return(
        <div className="whitelist-container">
            <h2 className="whitelist-heading">My Wishlist</h2>
            {items?.length > 0 ? (
                <div className="whitelist-grid">
                    {items?.map((item)=>(
                        <div key={item?.id} className="whitelist-card">
                            <Link to={`/products/info/${item?.id}`} className="whitelist-link">
                                <div className="whitelist-img-wrapper">
                                    <img src={item?.thumbnail} alt={item?.title} className="whitelist-image" />
                                </div>
                                <div className="whitelist-details">
                                    <h3 className="whitelist-title">{item?.title}</h3>
                                    <div className="whitelist-price-container">
                                        <span className="whitelist-price">${item?.price}</span>
                                        <span className="whitelist-discount">{item?.discountPercentage}% OFF</span>
                                    </div>
                                </div>
                            </Link>
                            <div className="whitelist-button-group">
                                <AllBtn className="whitelist-btn-add" text="add to cart" onClick={()=>dispatch(AddCart({item:item}))}/>
                                <AllBtn className="whitelist-btn-remove" text="remove" onClick={()=>dispatch(RemLst(item?.id))}/>
                                <AllBtn className="whitelist-btn-buy" text="buy now"/>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="whitelist-empty">
                    <h2>Your wishlist is empty</h2>
                    <p>Explore more and shortlist some items.</p>
                </div>
            )}
        </div>
    )
}
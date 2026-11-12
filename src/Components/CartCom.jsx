import React, { useEffect,useState } from "react";
import UseMyCart from "../Hooks/UseCart";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { Link, useNavigate } from "react-router-dom";
import AllBtn from "./AllBtn";
import "../AllCss/CartCom.css";
import { useDispatch, useSelector } from "react-redux";
import { AddCart, ClearCart, DecCart, IncCart, RemoveCart } from "../Features/CartSlice";
import { AddLst } from "../Features/WhiteListSlice";
import { AddBuy } from "../Features/BuySlice";

export default function CartCom(){
const {loading,error,cart:apicart,GetMyCart}=UseMyCart()
const id=useSelector((state)=>state.User.UserData?.id)
const navigate = useNavigate();
const dispatch=useDispatch()
const address=useSelector((state)=>state.Info.UserInfo?.address)
const cart=useSelector((state)=>state.Cart?.items)
const total=cart?.reduce((sum,item)=>sum+(item?.price*item?.quantity),0).toFixed(2)
const fees=cart?.reduce((sum,item)=>sum+(3*item?.quantity),0).toFixed(2)
const discount=cart?.reduce((sum,item)=>sum+(item?.price*item?.quantity)*(item?.discountPercentage/100),0).toFixed(2)
const grandTotal=(Number(total)-Number(discount)+Number(fees)).toFixed(2)



useEffect(()=>{
    if (cart && cart.length > 0) {
        return;}
    if(id){
       
    GetMyCart(id);}
    if(!id){
        return navigate('/login') 
    }
},[id,navigate])

useEffect(()=>{
    
    if(apicart){
        
        apicart?.forEach(
            (cart)=>{
                cart?.products?.forEach(
                (product)=>{
                    dispatch(AddCart({item:product,Qty:product.quantity}))
                })
            }
        )
    }
},[apicart])

if(loading){
    return <LoadingPage/>
}

if(error){
    return <ErrorPage/>
}
if(!cart|| cart.length === 0){
    return(
<div className="cart-empty">
    <h1>Your cart is empty</h1>
    <AllBtn text="Go to Products" className="go-to-products-btn" onClick={()=>navigate('/products')}/>
</div>
    )
   
}

     return(
        
        <div className="cart-container">
            <div className="cart-content">
                <div className="cart-item-container">
                    <div className="cart-product-list">
                    {cart?.map((item)=>(
                        <div key={item?.id} className="cart-product-card">
                            <div className="cart-product-card-top">
                                <div className="cart-image-section">
                                    <Link to={`/products/info/${item?.id}`}>
                                        <img src={item?.thumbnail} alt={item?.title} className="cart-product-image" />
                                    </Link>
                                    <div className="quantity-controls">
                                        <AllBtn text="-" className="qty-btn" 
                                            onClick={()=> { if(item?.quantity>0)dispatch(DecCart(item?.id)) }}
                                           />
                                        <span className="qty-label">{item?.quantity}</span>
                                        <AllBtn text="+" className="qty-btn" 
                                            onClick={()=>{dispatch(IncCart(item?.id)) }}
                                            />
                                    </div>
                                </div>
                                
                                <div className="cart-info-section">
                                    <Link to={`/products/info/${item?.id}`} className="cart-product-details" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <h2 className="cart-product-title">{item?.title}</h2>
                                        <h2 className="cart-product-price">${item?.price}</h2>
                                        <div className="cart-product-meta">
                                            <span>Qty: {item?.quantity}</span>
                                            <span>Discount: {item?.discountPercentage}%</span>
                                            <span>Total: ${(item?.price*item?.quantity*(1-item?.discountPercentage/100)).toFixed(2)}</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="cart-item-actions">
                                <button className="cart-action-text-btn" onClick={()=>dispatch(AddLst(item))}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                                    Save for whitelist
                                </button>
                                <div className="action-divider"></div>
                                <button className="cart-action-text-btn" onClick={()=>dispatch(RemoveCart(item?.id))}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    Remove
                                </button>
                                <div className="action-divider"></div>
                                <button className="cart-action-text-btn">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                                    Buy this now
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="cart-side-panel">
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="cart-summary-grid">
                            <div className="cart-summary-item">
                                <span className="cart-summary-label">Total</span>
                                <span className="cart-summary-value">${total}</span>
                            </div>
                            <div className="cart-summary-item">
                                <span className="cart-summary-label">Discount Allowed</span>
                                <span className="cart-summary-value">-${discount}</span>
                            </div>
                            <div className="cart-summary-item">
                                <span className="cart-summary-label">Fees</span>
                                <span className="cart-summary-value">${fees}</span>
                            </div>
                            <div className="cart-summary-item grand-total">
                                <span className="cart-summary-label">Grand Total</span>
                                <span className="cart-summary-value">${grandTotal}</span>
                            </div>
                        </div>

                        <div className="cart-location">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="location-icon">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <div className="cart-location-text">
                                <h4>{address?.address}</h4>
                                <h4>{address?.city}</h4>
                                <h4>{address?.postalCode}</h4>
                            </div>
                        </div>

                        <AllBtn text="buy all " className="cart-buy-now-btn" onClick={()=>{dispatch(AddBuy(cart))
                                                                                            navigate('/checkout')}
            
                        } />
                        <AllBtn text="clear cart" className="clear-cart-btn" onClick={()=>dispatch(ClearCart())} />
                    </div>
                </div>
            </div>
        </div>
           
            
        )
        }          
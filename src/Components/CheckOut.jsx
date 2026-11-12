import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllBtn from "./AllBtn";
import "../AllCss/CheckOut.css";

export default function CheckOut() {
    const status = useSelector((state) => state.User?.Status);
    const items = useSelector((state) => state.Buy?.items);
    const address = useSelector((state) => state.Info.UserInfo?.address);
    const total = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0).toFixed(2);
    const fees = items?.reduce((sum, item) => sum + (3 * item?.quantity), 0).toFixed(2);
    const discount = items?.reduce((sum, item) => sum + (item?.price * item?.quantity) * (item?.discountPercentage / 100), 0).toFixed(2);
    const grandTotal = (Number(total) - Number(discount) + Number(fees)).toFixed(2);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!status) {
            navigate('/', { replace: true });
        }
    }, [navigate, status]);

    if (!items || items.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <AllBtn text="Shop Now" onClick={() => navigate('/products')} />
            </div>
        );
    }

    

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>
            
            <div className="checkout-items-section">
                {items?.map((item) => (
                    
                    
                    <div className="checkout-item-card" key={item?.id}>
                        <img className="checkout-item-image" src={item?.thumbnail} alt={item?.title} />
                        <div className="checkout-item-details">
                            <h2 className="checkout-item-title">{item?.title}</h2>
                            <div className="checkout-item-meta">
                                <span>Qty: {item?.quantity}</span>
                                <span>${item?.price} </span>
                            </div>
                        </div>
                        <div className="checkout-item-price-block">
                            <div className="checkout-item-total">${item?.total?.toFixed(2) || (item?.price * item?.quantity).toFixed(2)}</div>
                            <div className="checkout-item-discount">{item?.discountPercentage}% Off</div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="checkout-summary-section">
                <div className="checkout-summary-card">
                    <h2 className="checkout-summary-title">Order Summary</h2>
                    
                    <div className="checkout-summary-row">
                        <span className="checkout-summary-label">Items Total</span>
                        <span className="checkout-summary-value">${total}</span>
                    </div>
                    <div className="checkout-summary-row discount">
                        <span className="checkout-summary-label">Discount applied</span>
                        <span className="checkout-summary-value">-${discount}</span>
                    </div>
                    <div className="checkout-summary-row">
                        <span className="checkout-summary-label">Shipping & Fees</span>
                        <span className="checkout-summary-value">${fees}</span>
                    </div>
                    
                    <div className="checkout-summary-divider"></div>
                    
                    <div className="checkout-summary-row grand-total">
                        <span className="checkout-summary-label">Grand Total</span>
                        <span className="checkout-summary-value">${grandTotal}</span>
                    </div>

                    <div className="checkout-shipping-info">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="checkout-shipping-icon">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <div className="checkout-shipping-details">
                            <div className="checkout-shipping-title">Shipping To</div>
                            <p>{address?.address }</p>
                            <p>{address?.city} {address?.postalCode}</p>
                        </div>
                    </div>

                    <AllBtn 
                        text="Place Order" 
                        className="checkout-place-order-btn" 
                        onClick={()=>{navigate('/payment',{state:{from:"cart"}})}}
                    />
                </div>
            </div>
        </div>
    );
}
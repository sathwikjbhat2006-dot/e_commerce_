import React from "react";
import { useState,useEffect } from "react";
import "../AllCss/ProductsInfo.css";
import AllBtn from "./AllBtn";
import { useSelector,useDispatch } from "react-redux";
import { AddCart } from "../Features/CartSlice";
import { useNavigate } from "react-router-dom";
import { AddLst } from "../Features/WhiteListSlice";
import { AddBuy } from "../Features/BuySlice";

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 22a8 8 0 1116 0H4z"/>
    </svg>
);

const DropdownArrow = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
        <path d="M7 10l5 5 5-5H7z"/>
    </svg>
);

export default function Products({products=products,...props}){
    const [activeImg, setActiveImg] = useState("");
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const[Qty,SetQty]=useState(1)
    const address=useSelector((state)=>state.Info.UserInfo?.address)
    const id=useSelector((state)=>state.User.UserData?.id)
    const dispatch=useDispatch()
    const navigate =useNavigate()
    const addtocart=()=>{
        if(!id){
            return navigate('/login')
        }
        dispatch(AddCart({item:products,Qty:Qty}))
        navigate('/cart')
    }
    
    useEffect(() => {
            if(products?.thumbnail) {
                setActiveImg(products.thumbnail);
            }
        }, [products]);


    return(
        <div className="product-info-container">
            {products && (
                <div className="product-info-card">
                    <div className="product-top-section">
                        <div className="product-images">
                            <div className="main-image-container">
                                <img src={activeImg || products?.thumbnail} alt={products?.title} className="main-image" />
                            </div>
                            <div className="thumbnail-slider">
                                <img 
                                    src={products?.thumbnail} 
                                    alt="thumbnail" 
                                    className={`thumbnail ${activeImg === products?.thumbnail ? 'active' : ''}`}
                                    onClick={() => setActiveImg(products?.thumbnail)}
                                />
                                {products?.images?.map((img, key) => (
                                    <img 
                                        key={key} 
                                        src={img} 
                                        alt="img" 
                                        className={`thumbnail ${activeImg === img ? 'active' : ''}`}
                                        onClick={() => setActiveImg(img)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="product-details">
                            
                            <h1 className="product-title">{products?.title}</h1>
                            <h2 className="product-brand">{products?.brand}</h2>
                            <div className="product-rating">
                                <span className="star">★</span> {products?.rating}
                            </div>
                            
                            <div className="product-price-section">
                                <h3 className="product-price">${products?.price}</h3>
                                <span className="product-discount">{products?.discountPercentage}% OFF</span>
                            </div>
                            
                            <p className="product-description">{products?.description}</p>
                            <p className="product-stock">Stock: {products?.stock}</p>
                            
                            <div className="product-tags">
                                {products?.tags?.map((tag, key) => (
                                    <span className="tag" key={key}>#{tag}</span>
                                ))}
                            </div>
                        </div>
                        {/* make a card in side for cart details */}
                        <div className="cart-details-card">
                            <div className="cart-price-container">
                                <h1 className="cart-price">${products?.price}</h1>
                            </div>
                            <div className="cart-location-container">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="location-icon">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <div className="cart-location-text">
                                    <h4>{address?.address}</h4>
                                    <h4>{address?.city}</h4>
                                    <h4>{address?.pin}</h4>
                                </div>
                            </div>
                            <div className="cart-status-container">
                                <span className={`status-badge ${products?.availabilityStatus === 'In Stock' ? 'in-stock' : 'low-stock'}`}>
                                    {products?.availabilityStatus}
                                </span>
                            </div>
                            <div className="cart-action-buttons">
                                <div className="quantity-controls">
                                    <AllBtn text="-" className="qty-btn" 
                                    onClick={()=>
                                    {SetQty((prev)=>prev>1?prev-1:prev) 
                                    onclick={addtocart}}}/>
                                    <span className="qty-label">{Qty}</span>
                                    <AllBtn text="+" className="qty-btn" 
                                    onClick={()=>{
                                    SetQty((prev)=>prev+1)
                                    onclick={addtocart}
                                    }}/>
                                </div>
                                <AllBtn text="add to cart" className="add-to-cart-btn" onClick={addtocart}/>
                                <AllBtn text="move to whitelist" className="whitelist-btn" onClick={()=>{if(!id){return navigate('/login')}
                                dispatch(AddLst(products))}}/>
                                <AllBtn text="buy now" className="buy-now-btn" onClick={()=>{ dispatch(AddBuy({item:products,Qty:Qty})) 
                                                                                              navigate('/checkout')}}/>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-section">
                        <button className="accordion-button" onClick={() => setShowMoreInfo(!showMoreInfo)}>
                            More Information
                            <DropdownArrow isOpen={showMoreInfo} />
                        </button>
                        
                        {showMoreInfo && (
                            <div className="more-info-dropdown">
                                <div className="info-left">
                                    <div className="info-item"><strong>Warranty:</strong> {products?.warrantyInformation}</div>
                                    <div className="info-item"><strong>Shipping:</strong> {products?.shippingInformation}</div>
                                    <div className="info-item"><strong>Return Policy:</strong> {products?.returnPolicy}</div>
                                    <div className="info-item"><strong>Min Order Qty:</strong> {products?.minimumOrderQuantity}</div>
                                    <div className="info-item"><strong>Weight:</strong> {products?.weight}</div>
                                    <div className="info-item"><strong>Dimensions:</strong> {products?.dimensions?.width} x {products?.dimensions?.height} x {products?.dimensions?.depth}</div>
                                    <div className="info-item"><strong>Created At:</strong> {new Date(products?.meta?.createdAt).toLocaleDateString()}</div>
                                    <div className="info-item"><strong>Updated At:</strong> {new Date(products?.meta?.updatedAt).toLocaleDateString()}</div>
                                </div>
                                <div className="info-right">
                                    <img src={products?.meta?.qrCode} alt="qr code" className="qr-code" />
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="accordion-section">
                        <button className="accordion-button" onClick={() => setShowReviews(!showReviews)}>
                            Reviews ({products?.reviews?.length || 0})
                            <DropdownArrow isOpen={showReviews} />
                        </button>
                        
                        {showReviews && (
                            <div className="reviews-dropdown">
                                {products?.reviews?.map((rev, key) => (
                                    <div className="review-card" key={key}>
                                        <div className="reviewer-info">
                                            <div className="reviewer-icon">
                                                <UserIcon />
                                            </div>
                                            <div>
                                                <h3 className="reviewer-name">{rev.reviewerName}</h3>
                                                <h4 className="reviewer-email">{rev.reviewerEmail}</h4>
                                            </div>
                                        </div>
                                        <div className="review-rating">
                                            <span className="star">★</span> {rev.rating}
                                        </div>
                                        <p className="review-comment">{rev.comment}</p>
                                        <h4 className="review-date">{new Date(rev.date).toLocaleDateString()}</h4>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
            
                </div>
            
            )
            
            }
        </div>
    )
}
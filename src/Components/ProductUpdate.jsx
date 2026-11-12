import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseProducts from "../Hooks/UseProducts";
import AllBtn from "./AllBtn";
import { AddProducts,RemProduct } from "../Features/ProductSlice";
import "../AllCss/ProductDelete.css"
import { useNavigate } from "react-router";

export default function ProductUpdate(){
const admin=useSelector((state)=>state.Info.Admin)
const products=useSelector(state=>state.Product.Items)
const dispatch=useDispatch()
const navigate=useNavigate()
const{error,loading,products:apiProducts,GetProducstByCat,GetAllProducts,GetProductsById,Search,CreateProducts,UpdateProdcts,DeleteProduct}=UseProducts()
useEffect(()=>{
    const load=async()=>{
    if(products.length===0){
                const data=await GetAllProducts()
                if(data){
                    dispatch(AddProducts(data))
                }
            }}
            load();
},[])
const HandelUpdate=(product)=>{
    navigate(`/profile/admin/update-product/${product?.id}`,{state:{product:product,mode:"update"}})
}
    return admin && (
            <div className="delete-page-container">
                        <h1 className="delete-page-title">update products</h1>
                        <section>
                        {products?.length ? (
                            <div className="delete-products-grid">
                                {products.map((product) => {
                                
                                    const rating = Number(product.rating) || 0;
            
                                    return (
                                        <article className="delete-product-card" key={product.id}>
                                            
                                            <div className="delete-product-image-wrap">
                                                <img
                                                    className="delete-product-image"
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                />
                                            </div>
                                            <div className="delete-product-details">
                                                <p className="delete-product-brand">{product.brand || product.category}</p>
                                                <h2 className="delete-product-title">{product.title}</h2>
                                                <div className="delete-product-rating">
                                                    <span className="stars">
                                                        {"★★★★★".split("").map((star, index) => (
                                                            <span className={index < Math.round(rating) ? "star-filled" : "star-empty"} key={index}>
                                                                {star}
                                                            </span>
                                                        ))}
                                                    </span>
                                                    <span className="rating-value">{rating.toFixed(1)}</span>
                                                </div>
                                                <div className="delete-product-pricing">
                                                    <span className="delete-product-price">${product.price.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="delete-btn-wrap">
                                              <AllBtn text="update" onClick={()=>HandelUpdate(product)}/>  
                                                
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="delete-products-empty">No products found....</p>
                        )}
                    </section>
                    </div>
                )    
    
}
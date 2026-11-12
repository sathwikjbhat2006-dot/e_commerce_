import React, { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import UseProducts from "../Hooks/UseProducts";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { AddProducts } from "../Features/ProductSlice";


export default function ProductsCom(){
    const{error,loading,products:apiProducts,GetProducstByCat,GetAllProducts,Search}=UseProducts()
    const {catagory}=useParams()
    const[searchParams]=useSearchParams()
    const query=searchParams.get("search")
    const ReduxProducts=useSelector((state)=>state.Product.Items)
    const dispatch=useDispatch()
    useEffect(()=>{
        const load=async()=>{
        if (catagory) {
           await GetProducstByCat(catagory)
        } 
        if(query){
           await Search(query)
        }
        if(ReduxProducts.length===0){
            const data=await GetAllProducts()
            if(data){
                dispatch(AddProducts(data))
            }
        }
    }
    load();
    },[catagory,query])
    const products=catagory||query?apiProducts : ReduxProducts
    
   
    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <ErrorPage/>
    }
    
    return(
        <section className="products-section">
            {products?.length ? (
                <div className="products-grid">
                    {products.map((product) => {
                    
                        const rating = Number(product.rating) || 0;

                        return (
                            <article className="product-card" key={product.id}>
                                <Link to={`/products/info/${product?.id}`}>
                                <div className="product-image-wrap">
                                    <img
                                        className="product-image"
                                        src={product.thumbnail}
                                        alt={product.title}
                                    />
                                </div>
                                <div className="product-details">
                                    <p className="product-brand">{product.brand || product.category}</p>
                                    <h2 className="product-title">{product.title}</h2>
                                    <div className="product-rating">
                                        <span className="stars">
                                            {"★★★★★".split("").map((star, index) => (
                                                <span className={index < Math.round(rating) ? "star-filled" : "star-empty"} key={index}>
                                                    {star}
                                                </span>
                                            ))}
                                        </span>
                                        <span className="rating-value">{rating.toFixed(1)}</span>
                                    </div>
                                    <div className="product-pricing">
                                        <span className="product-price">${product.price.toFixed(2)}</span>
                                    </div>
                                </div></Link>
                                <div>
                                    
                                    
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <p className="products-message">No products found....</p>
            )}
        </section>
    )
}
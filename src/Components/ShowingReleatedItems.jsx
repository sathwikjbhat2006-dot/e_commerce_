import React, { useEffect } from "react";
import UseProducts from "../Hooks/UseProducts";
import "../AllCss/ShowingReleatedItems.css";
import { Link } from "react-router-dom";

export default function ShowingReleatedItems({ category, productid }) {
    const { error, loading, products, GetProducstByCat, GetAllProducts, GetProductsById, Search, CreateProducts, UpdateProdcts, DeleteProduct } = UseProducts()
    useEffect(() => {
        GetProducstByCat(category)
    }, [])
    return (
        <>
            <h1>Releated items</h1>
            <div>
                <div className="delete-products-grid">
                    {products.filter((itm) => itm.id !== productid)
                        .map((product) => {

                            const rating = Number(product.rating) || 0;

                            return (
                                <article className="delete-product-card" key={product.id}>
                                    <Link to={`/products/info/${product?.id}`}>
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
                                    </Link>
                                </article>
                            );
                        })}
                </div>

            </div>
        </>
    )
}
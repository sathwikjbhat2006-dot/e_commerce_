import React, { useEffect } from "react";
import UseCatagory from "../Hooks/UseCatagory";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";
import "../AllCss/CatagoryCom.css";

export default function CatagoryCom(){
    const{error,loading,Catagory,GetCatagory}=UseCatagory()
    
    useEffect(()=>{
        GetCatagory();
    },[])
    
    if(loading){
        return <LoadingPage/>
    }
    if(error){
        return <ErrorPage msg={error}/>
    }

    return(
        <div className="category-section">
            <h2 className="category-title">Shop by Category</h2>
            <div className="category-grid">
            {
                Catagory?.map((cat)=>(
                    <Link to={`/products/catagory/${cat?.slug}`} key={cat?.slug} className="category-card">
                        <div className="category-content">
                            <h4 className="category-name">{cat?.name}</h4>
                            <span className="category-arrow">→</span>
                        </div>
                    </Link>
                ))
            }
            </div>
        </div>
    )
}
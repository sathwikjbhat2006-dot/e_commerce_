import React, { useEffect,useState } from "react"
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import UseCatagory from "../Hooks/UseCatagory";
import UseHome from "../Hooks/UseHome";
import "../AllCss/HomeCom.css";

export default function HomeCom(){
const [skip, setSkip] = useState(0);
const{error,loading,Catagory,GetCatagory}=UseCatagory()
const{Loading,Error,products,GetHomeProducts}=UseHome()
useEffect(()=>{GetCatagory();GetHomeProducts(skip);},[])
useEffect(()=>{if(skip>=12){GetHomeProducts(skip);}},[skip])
useEffect(()=>{
   
    const HandleScroll=()=>{
    const scroll=window.innerHeight+window.scrollY
    const maxScroll=document.documentElement.scrollHeight
    if(scroll>maxScroll-100&&!Loading){
            setSkip(prev=>prev+12)
    }};
    window.addEventListener("scroll",HandleScroll)
return ()=>{
    window.removeEventListener("scroll",HandleScroll)
}

},[window.scrollY])

if(error||Error){
    return <ErrorPage/>
}

if(loading||Loading){
    return <LoadingPage/>
}
    return(
        <div className="home-container">
            <div className="categories-container">
            {
                Catagory?.map((cat)=>(
                        <div key={cat?.slug} className="category-item">
                            <Link to={`/products/catagory/${cat?.slug}`} className="category-link">
                                <div>
                                    <h1>{cat?.name}</h1>    
                                </div>
                            </Link>
                        </div>
                ))
            }
            </div>
            <div className="products-container">
            {
                products?.map((product)=>(
                    <Link to={`/products/info/${product?.id}`} className="product-link" key={product.id}><div className="product-item">
                        <img src={product?.thumbnail} alt="pic" className="product-image" />
                        <div className="product-details">
                            <h3>{product?.title}</h3>
                            <h3>{product?.price}</h3>
                        </div>
                    </div></Link>
                ))
            }
            </div>
        </div>
    )

}
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Allinput from "./AllInput";
import AllBtn from "./AllBtn";
import "../AllCss/ProductCreate.css";
import UseProducts from "../Hooks/UseProducts";
import UseProfile from "../Hooks/UseProfile";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import { useDispatch } from "react-redux";
import { AddProducts,UpdateProduct } from "../Features/ProductSlice";
import { useLocation } from "react-router";
export default function ({mode}){
    const{error,loading,products,GetProducstByCat,GetAllProducts,GetProductsById,Search,CreateProducts,UpdateProdcts,DeleteProduct}=UseProducts()
    const dispatch=useDispatch()
    const location=useLocation()
    const product=location.state?.product
    const navmode = location.state?.mode;
    const { register, handleSubmit,reset } = useForm({
    defaultValues: {
        "title": product?.title || "",
        "brand": product?.brand ||"",
         description:product?.description || "",
        "category": product?.category ||"",
        "price": product?.price || "",
        "discountPercentage": product?.discountPercentage || "",
        "stock":product?.stock || ""
    }
    })
    const submitProducts=async(data)=>{
        const file = data.thumbnail?.[0];
        if(mode==="create"||navmode==="create"){
            const newProduct = {
                                    ...data,
                                    thumbnail: file
                                    ? URL.createObjectURL(file)
                                    : "https://placehold.co/300x300?text=Product" }
            const res=await CreateProducts(newProduct)
            dispatch(AddProducts(res))
        }
        if(mode==="update"||navmode==="update"){
            const UpdatedProduct={
                ...product,
                ...data,
                thumbnail:file?
                    URL.createObjectURL(file):
                    product?.thumbnail,
                id:product.id
            }
            const res=await UpdateProdcts(product.id,UpdatedProduct)

            if(res){
                dispatch(UpdateProduct({
                    ...UpdatedProduct,
                    ...res,
                    id:product.id
            }))
            }
        }
    }
    useEffect(()=>{
            if (product) {
        reset({
            title: product.title,
            brand: product.brand,
            description: product.description,
            category: product.category,
            price: product.price,
            discountPercentage: product.discountPercentage,
            stock: product.stock
        });
    }
    },[product,reset])
    if(error){
      return  <ErrorPage/>
    }

    if(loading){
       return <LoadingPage/>
    }
    return(
        <>
        <form className="product-form" onSubmit={handleSubmit(submitProducts)}>
            {(mode==="update"||navmode==="update") && (<h1>update products</h1>)}
            
            <div className="form-group">
                <Allinput text="title" type="text" label="product title" {...register("title",{required:true})}/>
            </div>
            <div className="form-group">
                <Allinput text="brand" type="text" label="product brand" {...register("brand",{required:true})}/>
            </div>
            <div className="form-group form-group-desc">
                <label className="form-label">descrption</label>
                <textarea className="form-textarea" rows={5} placeholder="descrption" {...register("description",{required:true})}></textarea>
            </div>
            <div className="form-group">
                <Allinput text="catagory" type="text" label="product category" {...register("category",{required:true})}/>
            </div>
            <div className="form-group">
                <Allinput text="price" type="number" label="product price" min="0" step="any" {...register("price",{required:true,valueAsNumber: true})}/>
            </div>
            <div className="form-group">
                <Allinput text="discount" type="number" label="product discount" min="0" step="any" {...register("discountPercentage",{required:true})}/>
            </div>
            <div className="form-group">
                <Allinput text="stock" type="number" label="product stock" min="0" step="any" {...register("stock",{required:true})}/>
            </div>
            <div className="form-group form-group-thumbnail">
                <Allinput className="thumbnail-input" text="thumbnail" label="product-thumbnail" type="file" accept="image/*" {...register("thumbnail",)}/>
            </div>
            <div className="form-btn-container">
                <AllBtn className="product-submit-btn" type="submit" text="submit"/>
            </div>
        </form>
        </>
    )
}
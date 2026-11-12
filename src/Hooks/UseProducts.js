import { useState } from "react";
import ProductsApi from "../Api/ProductsApi";
import { useDispatch } from "react-redux";


 function UseProducts(){
    const dispatch=useDispatch()
    const[error,SetError]=useState(null)
    const[loading,setLoading]=useState(false)
    const[products,setProducts]=useState([])
    const GetProducstByCat=async(Catid)=>{
        try {
        setLoading(true)
        const res=await ProductsApi.GetByCat(Catid)
        setProducts(res.data.products)
        SetError(false)
    
    } catch (error) {
        SetError(error.response?.data?.message||"something went wrong")
    }
    finally{
        setLoading(false)
    }
    }
    
    const GetAllProducts=async()=>{
        try {            
        setLoading(true)
        const res=await ProductsApi.GetAllProductsApi()
        setProducts(res.data.products)
       
        SetError(false)
            return res.data.products
    } catch (error) {
        
        SetError(error.response?.data?.message||"something went wrong")
    }
    finally{
        setLoading(false)
    }
    }

    const GetProductsById= async(id)=>{
        try {
            setLoading(true)
            const res = await ProductsApi.GetById(id)
            setProducts(res.data)
            SetError(false)
        } catch (error) {
            SetError(error.response?.data?.message||"something went wrong")
        }
        finally{
            setLoading(false)
        }
    }
    const Search=async(query)=>{
        try {
            setLoading(true)
            const res=await ProductsApi.Search(query)
            setProducts(res.data.products)
            SetError(false)
        } catch (error) {
            SetError(error.response?.data?.message||"something went wrong")
        }finally{
            setLoading(false)
        }
    }
    const CreateProducts= async(post)=>{
        try {
            setLoading(true)
            const res = await ProductsApi.Create(post)
            setProducts(res.data)
            SetError(false)
            return res.data
        } catch (error) {
            SetError(error.response?.data?.message||"something went wrong")
        }
        finally{
            setLoading(false)
        }
    }
    const UpdateProdcts=async(id,post)=>{
        try {
            setLoading(true)
            const res = await ProductsApi.Update(id,post)
            setProducts(res.data)
            SetError(false)
            return res.data
        } catch (error) {
            SetError(error.response?.data?.message||"something went wrong")
        }
        finally{
            setLoading(false)
        }
    }

    const DeleteProduct=async(id)=>{
        try {
            setLoading(true)
            const res = await ProductsApi.Dlelte(id)
            setProducts(res.data)
            SetError(false)
            return res.data
        } catch (error) {
            SetError(error.response?.data?.message||"something went wrong")
        }
        finally{
            setLoading(false)
        }
    }
    return{error,loading,products,GetProducstByCat,GetAllProducts,GetProductsById,Search,CreateProducts,UpdateProdcts,DeleteProduct}
}

export default UseProducts
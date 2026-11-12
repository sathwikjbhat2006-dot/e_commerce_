import { useState } from "react";
import MyCartApi from "../Api/CartApi";

function UseMyCart(){
    const[loading,setLoading]=useState(false)
    const[error,SetError]=useState(null)
    const[cart,Setcart]=useState(null)
    const GetMyCart=async(id)=>{
    try {
        setLoading(true)
        const res=await MyCartApi.Get(id)
        Setcart(res.data.carts)
        SetError(false)    
        
    } catch (error) {
        SetError(error.response?.data?.message||"something went wrong") 
    }finally{
        setLoading(false)
    }
}
    return{loading,error,cart,GetMyCart}

}
export default UseMyCart
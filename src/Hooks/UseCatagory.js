import React from "react";
import { useState } from "react";
import CatagoryApi from "../Api/CatagoryApi";

function UseCatagory(){
    const[error,SetError]=useState(null)
    const[loading,setLoading]= useState(false)
    const[Catagory,SetCatagory]=useState(null)
    const GetCatagory=async()=>{
        try {
            setLoading(true)
            const res=await CatagoryApi.Get()
            SetCatagory(res.data)
            SetError(null)
    
        } catch (error) {
            SetError(error.response?.data?.message||"something went wrong")
        }
        finally{
            setLoading(false)
        }
    }
    return{error,loading,Catagory,GetCatagory}
}

export default UseCatagory
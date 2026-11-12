import ProfileApi from "../Api/ProfileApi";
import { useState } from "react";

function UseProfile(){
    const [loading,setLoading]=useState(false)
    const [error,SetError]=useState(null)
    const[profile,SetProfile]=useState(null)
    const getProfile= async (id)=>{
        try {
          
            setLoading(true)
            const res=await ProfileApi.Get(id)
            SetProfile(res.data)
            SetError(null)
     
        } catch (error) {
            SetError(error.response?.data?.message||"something went wrong")
            
        }
        finally{
            setLoading(false)
        }
    }

    const UpdateProfile=async()=>{}

    return{loading,error,profile,getProfile,UpdateProfile}
}


export default UseProfile
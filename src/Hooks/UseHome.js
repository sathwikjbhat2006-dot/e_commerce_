import HomeApi from "../Api/HomeApi"
import {   useState } from "react"

function UseHome(){
    const[Error,SetError]=useState(null)
    const[products,SetProducts]=useState([])
    const[Loading,setLoading]=useState(false)
    const[has,SetHas]=useState(true)
    
   
    const GetHomeProducts =async (skip)=>{
        try {
            if(has){
            setLoading(true)
            const res=await HomeApi.Get(skip)
            SetProducts(prev=>[...prev,...res.data.products])
            SetError(false)
            SetHas(products.length<res.data.total)
                      
        }
        } catch (Error) {
         SetError(Error.response?.data?.message||"something went wrong")   
        }
        finally{
            setLoading(false)
        }
    }
    return{Loading,Error,products,GetHomeProducts}
}

export default UseHome

import { createSlice } from "@reduxjs/toolkit";


const initialState={
    Items:[]
}

const ProductSlice=createSlice({
    name:"ProductServices",
    initialState,
    reducers:{
    AddProducts:(state,action)=>{
        
        const data=action.payload
        if(Array.isArray(data)){
            state.Items=data
        }
        else{
            const ext=state.Items.find((itm)=>itm.id===data.id)
            if(!ext){
            state.Items.push(data)
        }
    }
    },
   
    RemProduct:(state,action)=>{
        state.Items=state.Items.filter((itm)=>itm.id !== action.payload.id)
    },

    UpdateProduct:(state,action)=>{
        const UpdateProduct=action.payload

        const index=state.Items.findIndex((itm)=>itm.id === UpdateProduct.id)

        if(index !== -1){
            state.Items[index]=UpdateProduct
        }
    }
}})

export const{AddProducts,RemProduct,UpdateProduct}=ProductSlice.actions
export default ProductSlice.reducer
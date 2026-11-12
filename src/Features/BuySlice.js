import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[]
}

const BuySlice=createSlice({
    name:"buyservices",
    initialState,
    reducers:{
        AddBuy:(state,action)=>{
            const payload=action.payload
            if(Array.isArray(payload)){
                state.items=payload.map((itm)=>({...itm, quantity:itm.quantity}))
            }
            else{
                const {item,Qty}=action.payload
                state.items=[{...item,quantity:Qty}]
            }
        }
    }
})

export const{AddBuy}=BuySlice.actions
export default BuySlice.reducer
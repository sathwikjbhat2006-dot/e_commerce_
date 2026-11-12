import { createSlice } from "@reduxjs/toolkit";
import { customAlphabet } from "nanoid";

const initialState={
    Oders:[]
}

const genid=customAlphabet('1223455678980',7)

const OrderSlice=createSlice({
    name:"OrderServices",
    initialState,
    reducers:{
        AddItems:(state,action)=>{
           const data =action.payload
           if(data && data.items && data.items.length > 0){
            const newOrder={
                OrderId:genid(),
                Items:data.items,
                status:false
            }
            state.Oders.push(newOrder)
           }
        },
        UpdateDelivered:(state,actions)=>{
            const id =actions.payload
            const order=state.Oders.find((itm)=>itm.OrderId===id)
            if(order){
                order.status=true
            }
        },
        DeleteOrderItems:(state)=>{
            state.Oders=[]
        }
    }
})

export const{AddItems,UpdateDelivered,DeleteOrderItems}=OrderSlice.actions
export default OrderSlice.reducer
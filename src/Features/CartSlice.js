import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[]
}

const CartSlice=createSlice({
    name:"CartServices",
    initialState,
    reducers:{
        AddCart:(state,action)=>{
           const item=action.payload.item
           const Qty=action.payload.Qty
           const extItem=state.items.find((itm)=>itm.id === item.id)
    
           if(extItem){
            if(Qty){
               extItem.quantity=Qty
            }
            
            }
           else{
            {
            state.items.push({...item,quantity:Qty||1})
            }}

        
        },

        IncCart:(state,action)=>{
            const id=action.payload
            const extItem=state.items.find((itm)=>itm.id===id)
            if(extItem){
                extItem.quantity+=1
            }



        },

        DecCart:(state,action)=>{
            const id=action.payload
            const extItem=state.items.find((itm)=>itm.id===id)
            if(extItem){
                extItem.quantity-=1
            }
        },

        RemoveCart:(state,action)=>{
            const id=action.payload
            state.items=state.items.filter((itm)=>itm.id !== id)
        },


        ClearCart:(state)=>{
            state.items=[]
        }
    }
})

export const{AddCart,RemoveCart,IncCart,DecCart,ClearCart}=CartSlice.actions
export default CartSlice.reducer
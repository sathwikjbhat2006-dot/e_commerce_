import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[]
}

const WhiteListSlice=createSlice({
    name:"WhiteList",
    initialState,
    reducers:{
        AddLst:(state,action)=>{
            const item=action.payload
            const extItem=state.items.find((itm)=>itm.id===item.id)
            if(!extItem){
                state.items.push(item)
            }
        },
        RemLst:(state,action)=>{
            const id=action.payload
            state.items=state.items.filter((itm)=>itm.id!==id)
        },
        ClearLst:(state)=>{
            state.items=[]
        }
    }
})

export const{AddLst,RemLst,ClearLst} =WhiteListSlice.actions
export default WhiteListSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    UserInfo:null,
    Admin:false
   
}

const UserInfoSlice=createSlice({
    name:"InfoServices",
    initialState,
    reducers:{
    UpdateInfo:(state,action)=>{
        state.UserInfo=action.payload.UserInfo
        state.Admin=action.payload.UserInfo.role==="admin"?true:false
    },
    DeleteInfo:(state)=>{
        state.UserInfo=null
        state.Admin=false
    }}
})

export const{UpdateInfo,DeleteInfo}=UserInfoSlice.actions
export default UserInfoSlice.reducer
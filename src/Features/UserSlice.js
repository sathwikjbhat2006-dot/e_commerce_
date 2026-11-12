import { createSlice } from "@reduxjs/toolkit";


const initialState=
{
    Status:false,
    UserData:null
}

const UserSlice=createSlice({
   name:"UserServices",
   initialState,
   reducers:{
    LogIn:(state,action)=>{
        state.Status=true
        state.UserData=action.payload.UserData
    },
    LogOut:(state)=>{
        state.Status=false
        state.UserData=null
    },
    UpdateUser:(state,action)=>{
        state.UserData=action.payload.UserData
    }
   }
})


export const{LogIn,LogOut,UpdateUser}= UserSlice.actions
export default UserSlice.reducer

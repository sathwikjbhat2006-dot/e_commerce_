import React, { useEffect } from "react";
import { useForm } from 'react-hook-form'
import Logo from "./Logo";
import Allinput from "./AllInput";
import AllBtn from './AllBtn'
import '../AllCss/Login.css'
import AuthApi from "../Api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import {LogIn} from '../Features/UserSlice'
import { useNavigate,useLocation } from "react-router";
import ErrorPage from "./ErrorPage";
import UseProfile from "../Hooks/UseProfile";
import { UpdateInfo } from "../Features/UserInfoSlice";
export default function Login() {

    const { register, handleSubmit } = useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    const {profile,getProfile}=UseProfile()
    const id=useSelector(state=>state.User?.UserData?.id)
    const from=location.state?.from || '/'
    useEffect(()=>{
        if(id){
           getProfile(id)
        }
    },[id])
    useEffect(()=>{
        if(profile){
           dispatch(UpdateInfo({UserInfo:profile}))
           navigate(from)
        }
    },[profile])
    const login = async(data)=>{
    try {
        const res=await AuthApi.Login(data)
        dispatch(LogIn({UserData:res?.data}))
        
    } catch (error) {
        <ErrorPage/>
    }
    }

    return (
        <div className="login-wrapper">
            <form className="login-form" onSubmit={handleSubmit(login)}>
                <Logo />
                <h2 className="login-heading">Login</h2>
                <div className="login-fields">
                    <Allinput className="login-input" placeholder="username" label="username" type="text" {...register("username", { required: true })} />
                    <Allinput className="login-input" placeholder="password" label="password" type="password" {...register("password", { required: true })} />
                    <AllBtn className="login-submit-btn" text="login" type="submit" />
                </div>
            </form>
        </div>
    )
}
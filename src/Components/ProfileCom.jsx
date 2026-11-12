import React, { useEffect, useState } from "react";
import UseProfile from "../Hooks/UseProfile";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import AllBtn from "./AllBtn"
import "../AllCss/ProfileCom.css";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useNavigate } from "react-router";
import { UpdateInfo,DeleteInfo } from "../Features/UserInfoSlice";
import { LogOut } from "../Features/UserSlice";
import { ClearCart } from "../Features/CartSlice";
import { ClearLst } from "../Features/WhiteListSlice";
import { DeleteOrderItems } from "../Features/OrderSlice";
export default function ProfileCom(){
    
    const navigate =useNavigate()
    const dispatch=useDispatch()
    const UserData=useSelector((state)=>state.User.UserData)
    const id=UserData?.id
    const info=useSelector((state)=>state.Info.UserInfo)
    const profile=useSelector((state)=>state.Info.UserInfo)
    const {loading,error,profile:apiprofile,getProfile,UpdateProfile}=UseProfile()
    const admin=useSelector((state)=>state.Info.Admin)
    console.log(info);
    

    const logout=()=>{
        localStorage.clear()
            dispatch(LogOut())
            dispatch(DeleteInfo())
            dispatch(ClearCart())
            dispatch(ClearLst())
            dispatch(DeleteOrderItems())
            navigate('/')
    }

    useEffect(()=>{
        if(!info){
            getProfile(id)
            return}
       
        
       if(!id){
         navigate('/login')
         return
       }
    },[id,info])
    useEffect(()=>{
         if(apiprofile){
         dispatch(UpdateInfo({UserInfo:apiprofile}))}
    },[apiprofile])
    if (loading) {
    return <LoadingPage />;
    }

    if (error) {
    return <ErrorPage msg={error} />;
    }

    return(
    
       <div className="profile-container">
            <div className="profile-header">
                <img src={profile?.image} alt="profile pic" className="profile-pic" />
                <div className="profile-info">
                    <div className="profile-name-container">
                        <h2 className="profile-name">
                            {profile?.firstName} {profile?.lastName}
                        </h2>
                        {admin && (
                            <Link to={'/profile/admin'}><span className="admin-badge">
                                <svg
                                    className="admin-badge-icon"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    width="13"
                                    height="13"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Admin
                            </span></Link>
                        )}
                    </div>
                    <p className="profile-email">{profile?.email}</p>
                </div>
            </div>
            
            <div className="profile-details">
                <div className="detail-group">
                    <span className="detail-label">Phone</span>
                    <p className="detail-value">{profile?.phone}</p>
                </div>
                <div className="detail-group">
                    <span className="detail-label">Address</span>
                    <p className="detail-value">{profile?.address?.address}, {profile?.address?.city} {profile?.address?.postalCode}</p>
                </div>
            </div>

            <div className="profile-actions">
                <AllBtn text="white list"  onClick={()=>navigate('/profile/whitelist')}/>
                <AllBtn text="my orders"  onClick={()=>navigate('/profile/my-ordes')}/>
                <AllBtn text="update profile" className="update-btn" onClick={()=>UpdateProfile()}/>
                <AllBtn text="log out" className="logout-btn" onClick={logout}/>
            </div>
       </div>
    )
    

}
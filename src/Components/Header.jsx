import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Logo from "./Logo";
import Allinput from "./AllInput";
import AllBtn from "./AllBtn"
import "../AllCss/Header.css";
import { useDispatch, useSelector } from "react-redux";
import UseProfile from "../Hooks/UseProfile";
import { UpdateInfo,DeleteInfo } from "../Features/UserInfoSlice";
import{LogOut} from '../Features/UserSlice'
import { ClearCart } from "../Features/CartSlice";
import { ClearLst } from "../Features/WhiteListSlice";
import { DeleteOrderItems } from "../Features/OrderSlice";

function Header({ className = "" }){
 const reduxprofile=useSelector((state)=>state.Info.UserInfo)
 
 const [theme, setTheme] = useState(() => {
   try {
     return localStorage.getItem("theme") || "dark";
   } catch (e) {
     return "dark";
   }
 });

 const [query,SetQuery]=useState("")   
 const navigate = useNavigate();
 const id=useSelector((state)=>state.User.UserData?.id)
 const {profile,getProfile}=UseProfile()
 const dispatch=useDispatch()

 useEffect(() => {
   document.documentElement.setAttribute("data-theme", theme);
   try {
     localStorage.setItem("theme", theme);
   } catch (e) {
     console.error("Theme storage error:", e);
   }
 }, [theme]);

 const toggleTheme = () => {
   setTheme((prev) => (prev === "dark" ? "light" : "dark"));
 };

 const UpdateAdd=()=>{
    if(reduxprofile){
        return
    }
    if(id){
        getProfile(id)
        
    }
 }
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
    if(profile){
    dispatch(UpdateInfo({UserInfo:profile}))}
 },[profile])
    return(
        <header className={`header ${className}`}>
            <div className="header-logo-container">
                <Link to={"/"} className="header-logo"><Logo/></Link>
            </div>
            <AllBtn text={!reduxprofile?.address?"update":""} className="header-location-btn" onClick={UpdateAdd}>
            <div className="header-location">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div className="header-location-text">
                    <h4>{reduxprofile?.address?.address}</h4>
                    <h4>{reduxprofile?.address?.city}</h4>
                    <h4>{reduxprofile?.address?.postalCode}</h4>
                </div>
            </div></AllBtn >
            
            <div className="header-search">
                <Allinput 
                    placeholder="Search for items..."
                    className="header-input"
                    type="text"
                    value={query}
                    onChange={(e)=>SetQuery(e.target.value)}
                />
                <AllBtn 
                    text="Search" 
                    className="search-btn"
                    onClick={()=>navigate(`/products?search=${query}`)}
                />
            </div>

            <nav className="header-nav">
                <Link to={"/products"} className="nav-link">Products</Link>
                <Link to={"/cart"} className="nav-link">My Cart</Link>
                <Link to={"/catagory"} className="nav-link">Categories</Link>
                <Link to={"/profile"} className="nav-link">My Profile</Link>
            </nav>
            
            <div className="header-actions">
              <button 
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
              >
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
              <AllBtn text="log out" className="logout-btn" onClick={logout}/>
            </div>
        </header>
    )
}

export default Header
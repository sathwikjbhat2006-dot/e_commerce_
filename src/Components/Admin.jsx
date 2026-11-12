import React from "react";
import AllBtn from "./AllBtn";
import { useSelector } from "react-redux";
import "../AllCss/Admin.css";
import { useNavigate } from "react-router";
export default function Admin() {
    const admin = useSelector((state) => state.Info.Admin);
    const navigate=useNavigate()
    return admin && (
        <div className="admin-container">
            <div className="admin-header">
                <div className="admin-header-badge">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                        <path
                            fillRule="evenodd"
                            d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Admin Panel
                </div>
                <h1 className="admin-title">Welcome Admin</h1>
                <p className="admin-subtitle">Manage products, inventory, and order delivery status</p>
            </div>

            <div className="admin-cards-grid">
                {/* Card 1: Product Management */}
                <div className="admin-card admin-card-products">
                    <div className="admin-card-header">
                        <div className="admin-card-icon">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                        </div>
                        <div className="admin-card-title-group">
                            <h2 className="admin-card-title">Product Management</h2>
                            <p className="admin-card-desc">Create, delete, and update products in the catalog.</p>
                        </div>
                    </div>
                    <div className="admin-card-actions">
                        <AllBtn text="create" className="admin-btn admin-btn-create" onClick={()=>{navigate('/profile/admin/create-product')}} />
                        <AllBtn text="update" className="admin-btn admin-btn-update" onClick={()=>{navigate('/profile/admin/update-product')}}/>
                        <AllBtn text="delete" className="admin-btn admin-btn-delete" onClick={()=>{navigate('/profile/admin/delete-product')}}/>
                    </div>
                </div>

                {/* Card 2: Order Management */}
                <div className="admin-card admin-card-orders">
                    <div className="admin-card-header">
                        <div className="admin-card-icon">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V4.5A2.25 2.25 0 0012 2.25H4.5A2.25 2.25 0 002.25 4.5v9.75" />
                            </svg>
                        </div>
                        <div className="admin-card-title-group">
                            <h2 className="admin-card-title">Order Section</h2>
                            <p className="admin-card-desc">Track and manage customer orders and delivery status.</p>
                        </div>
                    </div>
                    <div className="admin-card-actions">
                        <AllBtn text="delivery status" className="admin-btn admin-btn-delivery" onClick={()=>navigate('/profile/admin/delivery-status')} />
                    </div>
                </div>
            </div>
        </div>
    );
}
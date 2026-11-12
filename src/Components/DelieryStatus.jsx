import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AllBtn from "./AllBtn";
import { UpdateDelivered } from "../Features/OrderSlice";
import "../AllCss/DeliveryStatus.css";

export default function DeliveryStatus() {
    const orders = useSelector((state) => state?.Order?.Oders);
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.Info.Admin);

    return admin && (
        <div className="delivery-container">
            <div className="delivery-header">
                <div className="delivery-header-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V4.5A2.25 2.25 0 0012 2.25H4.5A2.25 2.25 0 002.25 4.5v9.75" />
                    </svg>
                    Admin Delivery Portal
                </div>
                <h1 className="delivery-title">Order Delivery Status</h1>
                <p className="delivery-subtitle">Review active shipments and update order fulfillment status</p>
            </div>

            {!orders || orders.length === 0 ? (
                <div className="delivery-empty-state">
                    <div className="empty-icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                    </div>
                    <h3>No Customer Orders Found</h3>
                    <p>There are no customer orders in the system right now.</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders?.map((order) => (
                        <div key={order?.OrderId} id={order?.OrderId} className="order-card">
                            <div className="order-card-header">
                                <div className="order-id-group">
                                    <span className="order-id-label">Order no</span>
                                    <h1 className="order-id-value">#{order?.OrderId}</h1>
                                </div>
                                <h2 className={`order-status-badge ${order.status ? "delivered" : "pending"}`}>
                                    <span className="status-dot"></span>
                                    order status :{order.status ? "delivered" : "pending"}
                                </h2>
                            </div>

                            <div className="order-items-list">
                                {order?.Items?.map((item) => (
                                    <div key={item?.id} className="order-item-row">
                                        <img className="checkout-item-image" src={item?.thumbnail} alt={item?.title} />
                                        <div className="order-item-details">
                                            <h1 className="order-item-title">{item?.title}</h1>
                                            <div className="checkout-item-meta">
                                                <span>Qty: {item?.quantity}</span>
                                                <span>${item?.price} </span>
                                            </div>
                                        </div>
                                        <div className="checkout-item-price-block">
                                            <div className="checkout-item-total">
                                                ${item?.total?.toFixed(2) || (item?.price * item?.quantity).toFixed(2)}
                                            </div>
                                            <div className="checkout-item-discount">{item?.discountPercentage}% Off</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="order-card-actions">
                                <div className="order-action-meta">
                                    <span className="order-action-label">Fulfillment Status</span>
                                    <span className={`order-action-status ${order.status ? "text-delivered" : "text-pending"}`}>
                                        {order.status ? "Completed / Delivered" : "Awaiting Delivery"}
                                    </span>
                                </div>
                                <AllBtn
                                    text="delivered"
                                    className={`delivery-btn ${order.status ? "delivery-btn-completed" : "delivery-btn-pending"}`}
                                    onClick={() => dispatch(UpdateDelivered(order.OrderId))}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
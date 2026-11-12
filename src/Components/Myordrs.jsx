import React from "react";
import { useSelector } from "react-redux";
import "../AllCss/MyOrders.css";

export default function MyOrders() {
    const orders = useSelector((state) => state?.Order?.Oders);

    return (
        <div className="myorders-container">
            <div className="myorders-header">
                <h1 className="myorders-main-title">My Orders</h1>
                <p className="myorders-subtitle">Track and review your placed orders</p>
            </div>

            {!orders || orders.length === 0 ? (
                <div className="myorders-empty">
                    <div className="empty-icon-box">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                    </div>
                    <h3>No Orders Placed Yet</h3>
                    <p>When you purchase items, your order history will be shown here.</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders?.map((order) => (
                        <div key={order?.OrderId} id={order?.OrderId} className="order-card">
                            <div className="order-card-header">
                                <div className="order-id-group">
                                    <span className="order-id-label">Order</span>
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
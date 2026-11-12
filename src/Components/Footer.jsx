import React from "react";
import "../AllCss/Footer.css";

function Footer({ className = "" }) {
  return (
    <footer className={`modern-footer ${className}`}>
      <div className="footer-container">
        <div className="footer-section brand-section">
          <h2 className="footer-logo">ShopPrime</h2>
          <p className="footer-description">
            Your one-stop destination for premium quality products. We deliver the best shopping experience right to your doorstep.
          </p>
        </div>
        
        <div className="footer-section links-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
       
        
        <div className="footer-section newsletter-section">
          <h3 className="footer-heading">Stay Connected</h3>
          <p>Subscribe to our newsletter for updates and exclusive offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShopPrime. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
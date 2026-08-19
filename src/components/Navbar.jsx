import React from "react";
import "../css/Auth.css";


const Navbar = () => {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        Shop<span>Hub</span>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
        />
        <button>⌕</button>
      </div>

      {/* Right Actions */}
      <div className="nav-actions">

        {/* Offers */}
        <a href="#" className="nav-item offer">
          🔥 <span>Offers</span>
        </a>

        {/* Location */}
        <a href="#" className="nav-item">
          📍 <span>Location</span>
        </a>

        {/* Notification */}
        <a href="#" className="nav-item">
          🔔
        </a>

        {/* Cart */}
        <a href="#" className="nav-item cart">
          🛒
          <span className="cart-count">2</span>
        </a>

        {/* Profile */}
        <a href="#" className="profile">
          <div className="profile-avatar">U</div>
          <span>Account</span>
        </a>

      </div>

    </nav>
  );
};

export default Navbar;
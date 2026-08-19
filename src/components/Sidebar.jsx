import React from "react";
import { Link } from "react-router-dom";

import "../css/Auth.css";


function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="sidebar-logo">
        E-Shop Admin
      </h2>

      <ul className="sidebar-menu">

        <li>
          <Link to="/dashbord">
            🏠 Dashbord
          </Link>
        </li>

        <li>
          <Link to="/products">
            📦 Products
          </Link>
        </li>

        <li>
          <Link to="/add-product">
            ➕ Add Product
          </Link>
        </li>

        <li>
          <Link to="/category">
            🗂 Category
          </Link>
        </li>

        <li>
          <Link to="/orders">
            🛒 Orders
          </Link>
        </li>

        <li>
          <Link to="/customers">
            👥 Customers
          </Link>
        </li>

        <li>
          <Link to="/settings">
            ⚙ Settings
          </Link>
        </li>

        <li>
          <Link to="/login">
            🚪 Logout
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="logo"> BCCP </h1>
      </Link>
      <nav className="navigation">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>

        <Link to="/login" style={{ textDecoration: "none" }}>
          <button class="btnLogin">Login</button>
        </Link>
      </nav>
    </div>
  );
}

export default Header;

import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <nav className="navbar navbar-default navcolor">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            TODO
          </Link>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

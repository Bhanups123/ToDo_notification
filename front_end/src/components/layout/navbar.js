import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import setCurrentUser from "../../authActions";
import logout from "../../utils/logout";

class Navbar_c extends Component {
  render() {
    const guestLinks = (
      <div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    );
    // className="nav-item"

    const authLinks = (
      <div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="#" onClick={logout} className="nav-link">
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                TODO
              </Link>
              {console.log("efkefd", this.props)}

              {this.props.isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setCurrentUser })(Navbar_c);

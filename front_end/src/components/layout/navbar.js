import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../authActions";

class Navbar_c extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/"); //why not working without using withRouter.
  }
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
            <a
              href="#"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
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

              {this.props.isAuthenticated ? guestLinks : authLinks}
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

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar_c));

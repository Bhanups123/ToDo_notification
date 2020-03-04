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
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );
    // className="nav-item"

    const authLinks = (
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
    );

    const dashLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/todo">Dashboard</Link>
        </li>
        <li className="nav color_p">
          Signed In as <p>{this.props.auth.user.name}</p>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                TODO
              </Link>
              {this.props.auth.isAuthenticated ? authLinks : guestLinks}
              {this.props.auth.isAuthenticated ? dashLinks : undefined}
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

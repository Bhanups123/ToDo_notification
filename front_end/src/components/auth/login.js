import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import authHeader from "../../utils/authheader";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../../authActions";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleOnSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/todo/login", user)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        authHeader(token);
        const decoded = jwt_decode(token);
        this.props.setCurrentUser(decoded);
        this.props.history.push("/todo");
      })
      .catch();
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="container">
        <h1>Login </h1>
        <form onSubmit={this.handleOnSubmit}>
          {/* does form a post request */}
          <div className="form-group">
            <input
              name="email"
              placeholder="email"
              className="form-control form-control-lg"
              value={this.state.email}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              placeholder="password"
              className="form-control form-control-lg"
              type="password"
              value={this.state.password}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-success btn-block mt-4">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.authReducer
});
export default connect(mapStateToProps, { setCurrentUser })(Login);

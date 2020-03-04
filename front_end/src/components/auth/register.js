import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password_confirm: ""
  };
  handleOnSubmit = e => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };

    axios.post("/todo/register", user).then(res => {
      this.props.history.push("/login");
    });
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="container">
        <img
          src="https://static.raymondcamden.com/images/banners/todo.jpg"
          className="todo_back"
        ></img>
        <h1>SignUp </h1>
        <form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <input
              name="name"
              placeholder="name"
              className="form-control"
              value={this.state.name}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              placeholder="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              placeholder="password"
              className="form-control"
              type="password"
              value={this.state.password}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              name="password_confirm"
              placeholder="confirm password"
              className="form-control"
              type="password"
              value={this.state.password_confirm}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <button className="btn btn-success btn-block mt-4">Submit</button>{" "}
            {/*use of mt-4 class ????*/}
          </div>
        </form>
      </div>
    );
  }
}

export default Register;

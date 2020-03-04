import React, { Component } from "react";
import AddTodo from "./addtodo";
import GetTodo from "./gettodo";
import axios from "axios";
import authHeader from "../utils/authheader";
import { connect } from "react-redux";

class ToDo extends Component {
  state = {
    todos: [],
    change: false
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
    }
    const token = localStorage.getItem("jwtToken");
    authHeader(token);

    axios
      .get("/todo/mytodos")
      .then(res => {
        this.setState({
          todos: res.data.todos
        });
      })
      .catch();
  }
  componentWillUnmount() {
    axios
      .post("/todo/mytodos", { todos: this.state.todos })
      .then()
      .catch();
  }
  handleAddTodo = todo => {
    if (!todo) {
      return "add a valid todo";
    } else if (this.state.todos.indexOf(todo) > -1) {
      return "todo already exist";
    }
    this.setState(prevState => ({
      todos: prevState.todos.concat(todo),
      change: true
    }));
  };
  handleDeleteTodo = delete_todo => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo !== delete_todo),
      change: true
    }));
  };
  handleDeleteTodos = () => {
    this.setState(prevState => ({ todos: [], change: true }));
  };
  handleSaveTodos = () => {
    axios
      .post("/todo/mytodos", { todos: this.state.todos, change: false })
      .then()
      .catch();
  };
  render() {
    return (
      <div>
        <img
          src="https://cdn.hipwallpaper.com/i/60/22/LeAXGm.jpg"
          className="todo_back"
        ></img>
        <AddTodo handleAddTodo={this.handleAddTodo} />
        <GetTodo
          todos={this.state.todos}
          change={this.state.change}
          handleDeleteTodo={this.handleDeleteTodo}
          handleDeleteTodos={this.handleDeleteTodos}
          handleSaveTodos={this.handleSaveTodos}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ToDo);

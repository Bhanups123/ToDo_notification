import React, { Component } from "react";
import AddTodo from "./addtodo";
import GetTodo from "./gettodo";
import axios from "axios";
import authHeader from "../utils/authheader";

class ToDo extends Component {
  state = {
    todos: []
  };
  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    authHeader(token);

    axios
      .get("/todo/mytodos")
      .then(res => {
        console.log(res.data);
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
    this.setState(prevState => ({ todos: prevState.todos.concat(todo) }));
  };
  handleDeleteTodo = delete_todo => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo !== delete_todo)
    }));
  };
  handleDeleteTodos = () => {
    this.setState(prevState => ({ todos: [] }));
  };
  render() {
    return (
      <div>
        <AddTodo handleAddTodo={this.handleAddTodo} />
        <GetTodo
          todos={this.state.todos}
          handleDeleteTodo={this.handleDeleteTodo}
          handleDeleteTodos={this.handleDeleteTodos}
        />
      </div>
    );
  }
}

export default ToDo;

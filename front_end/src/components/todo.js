import React, { Component } from "react";
import AddTodo from "./addtodo";
import GetTodo from "./gettodo";

class ToDo extends Component {
  state = {
    todos: []
  };
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

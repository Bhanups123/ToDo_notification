import React, { Component } from "react";

class AddTodo extends Component {
  state = {
    error: undefined
  };
  handleAddTodo = e => {
    e.preventDefault();

    const inputToDo = e.target.elements.todo.value.trim();
    e.target.elements.todo.value = "";

    const error = this.props.handleAddTodo(inputToDo);

    this.setState(() => ({ error }));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddTodo}>
          <input
            className="input"
            type="text"
            name="todo"
            placeholder="add a todo"
          />
          <button className="btn btn-primary btn-lg">Add</button>
        </form>
        {/*this.state.error && <p>{this.state.error}</p>*/}
      </div>
    );
  }
}

//use form instead
// <input name="todo" placeholder="add a todo" />
// <button onClick={this.handleAddTodo}>add</button>

export default AddTodo;

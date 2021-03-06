import React from "react";
import "./styles/todo.css";

const GetTodo = props => (
  <div>
    <div>
      <button
        className="btn btn-danger btn-lg"
        onClick={props.handleDeleteTodos}
        disabled={props.todos.length === 0}
      >
        Remove All
      </button>
      <button
        className="btn btn-success btn-lg"
        onClick={props.handleSaveTodos}
        disabled={!props.change}
      >
        Save
      </button>
    </div>

    <div className="todolist">
      {props.todos.map((todo, index) => (
        <div key={index} className="block">
          <div>
            {/*index + 1*/}
            {todo}
            <button
              className="btn btn-info sidebtn"
              onClick={e => props.handleDeleteTodo(todo)}
            >
              {" "}
              ♦{" "}
            </button>
            <button
              className="btn btn-info sidebtn"
              onClick={e => props.handleDeleteTodo(todo)}
            >
              {" "}
              -{" "}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GetTodo;

import React from "react";
import "../styles/todo.css";

const GetTodo = props => (
  <div>
    <div>
      <button
        className="btn btn-danger btn-lg"
        onClick={props.handleDeleteTodos}
      >
        Remove All
      </button>
    </div>

    <div className="todolist">
      {props.todos.map((todo, index) => (
        <div className="block">
          <p>
            <div>
              {index + 1}. {todo}
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
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default GetTodo;

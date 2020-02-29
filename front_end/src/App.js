import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import ToDo from "./components/todo";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Home from "./components/layout/home";
import Navbar from "./components/layout/navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Home} />
        <div>
          <Route exact path="/todo" component={ToDo} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

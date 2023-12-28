import React from "react";
import "./styles.css";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Login} exact />
        <Route path="/signup" Component={SignUp} />
      </Routes>
    </div>
  );
}

export default App;

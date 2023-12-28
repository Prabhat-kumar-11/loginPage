import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const URL = "https://vast-tan-pike-vest.cyclic.app/";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/users/login`, {
        email,
        password,
      });

      console.log(response.data.msg);
      setLogin(response.data.msg);
    } catch (err) {
      setLogin(err.response.data.msg);
    }
  };

  return (
    <div className="wrapper signIn">
      <div className="illustration">
        <img src="https://source.unsplash.com/random" alt="illustration" />
      </div>
      <div className="form">
        <div className="heading">LOGIN</div>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {login && (
          <p style={{ color: login === "Login Successful" ? "green" : "red" }}>
            {login}
          </p>
        )}
        <p>
          Don't have an account?{" "}
          <Link style={{ fontSize: "1rem" }} to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

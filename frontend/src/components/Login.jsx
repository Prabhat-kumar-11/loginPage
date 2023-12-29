import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../AuthContext";

const URL = "https://vast-tan-pike-vest.cyclic.app/";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const { isAuth, setUserToken, removeUserToken } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/users/login`, {
        email,
        password,
      });

      console.log(response.data.msg);
      setUserToken(response.data.token);
      setLogin(response.data.msg);
    } catch (err) {
      setLogin(err.response.data.msg);
    }
  };

  return isAuth ? (
    <div
      style={{
        width: "300px",
        marginTop: "20%",
        placeItems: "center",
        alignItems: "center",
        border: "1px solid #ccc",
        padding: "20px",
        textAlign: "center",
        backgroundColor:" #6b97bd",
        borderRadius:"8px"
      }}
    >
      <h2>Welcome User</h2>
      <button
        style={{
          backgroundColor: " #80c7e0", // light blue color
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {
          removeUserToken();
          setEmail("");
          setPassword("");
          setLogin("");
        }}
      >
        Sign Out
      </button>
    </div>
  ) : (
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

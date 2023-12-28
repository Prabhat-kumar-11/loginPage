import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const URL = "https://vast-tan-pike-vest.cyclic.app/";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/users/register`, {
        name,
        email,
        phoneNumber,
        password,
      });

      console.log(response.data);
      setError(response.data.msg);
    } catch (err) {
      setError(err.response.data.msg);
    }
    setName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };

  return (
    <div className="wrapper signUp">
      <div className="illustration">
        <img src="https://source.unsplash.com/random" alt="illustration" />
      </div>
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
          {error && <p style={{ color: error === "New user has been registered" ? "green" : "red"}}>{error}</p>}
          <h2 align="center" className="or">
            OR
          </h2>
        </form>
        <p>
          Have an account?{" "}
          <Link style={{ fontSize: "1rem" }} to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

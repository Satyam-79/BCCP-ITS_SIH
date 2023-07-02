import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Create the submit method.
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: email,
      password: password,
    };

    // const register = (e) => {
    //   e.preventDefault();

    //   auth
    //     .createUserWithEmailAndPassword(email, password)
    //     .then((auth) => {
    //       // it successfully created a new user with email and password
    //       if (auth) {
    //         navigate("/");
    //       }
    //     })
    //     .catch((error) => alert(error.message));
    // };
    const { data } = await axios.post(
      "http://localhost:8000/login/",
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );

    // Initialize the access & refresh token in localstorage.
    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
    window.location.href = "/";
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://imagetolink.com/ib/Tt3IykHqrb.jpg"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button
            type="submit"
            onClick={submit}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>

        <button onClick={submit} className="login__registerButton">
          Create your BCCP Account
        </button>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [data, saveData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState();

  const handleChange = ({ currentTarget: input }) => {
    saveData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://ddauto.up.railway.app/api/user/login";
      const res = await axios.post(url, data).then((res) => {
          sessionStorage.setItem("username", res.data.username);
          sessionStorage.setItem("token", res.data.token);
          console.log(res)
          setTimeout(() => {
            if (sessionStorage.getItem("token")) {
              navigate("/admin/dashboard");
              window.location.reload();
          }
        }, 3000);
      })
      console.log(res)
    } catch (error) {
      console.log(error.response);
      if (
        error.response &&
        error.response.status >= 402 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
        return setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="alpha">
    <div className="login">
      <a href="/" className="home">Home</a>
      <form onSubmit={handleSubmit}>
        <login>
          <h2>login</h2>
          <inputHolder>
            <input
              required
              placeholder="Username"
              name="username"
              value={data.username}
              onChange={handleChange}
              type="text"
            />
            <input
              required
              placeholder="Password"
              name="password"
              value={data.password}
              type="password"
              onChange={handleChange}
            />
          </inputHolder>
          {error && <div className="errorMessage">{error}</div>}
          <button type="submit">Login</button>
          <a href="/">Forgot Password?</a>
        </login>
      </form>
    </div>
      <h2 className="err">Login is only avalible on Desktop/Laptop</h2>
    </div>
  );
}

export default Login;
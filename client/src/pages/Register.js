import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const APIURL = "http://localhost:6060/api";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  //處理input 改變後的state
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //註冊
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${APIURL}/auth/register`, inputs);
      window.alert("註冊成功");
      Navigate("/login");
    } catch (err) {
      setError(err.response.data._message);
    }
  };

  return (
    <>
      <div className="auth">
        <h1>Login</h1>
        <form>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            required
          />
          <button onClick={handleRegister}>Register</button>
          {error && <p>{error}</p>}
          <span>
            Don you have an account?
            <Link to="/login" className="link">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Register;

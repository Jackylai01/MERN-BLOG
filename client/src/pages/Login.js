import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [, setError] = useState(null);

  //導回某個路由
  const navigate = useNavigate();

  //引入登入邏輯
  const { login } = useContext(AuthContext);

  //處理input 改變後的state
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //處理登入的邏輯
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      window.alert("登入成功");
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <div className="auth">
        <h1>Login</h1>
        <form>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button onClick={handleLogin}>Login</button>

          <span>
            Don't you have an account?
            <Link to="/register" className="link">
              Register
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;

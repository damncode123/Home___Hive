import React, { useState } from "react";
import "../styles/Login.css";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://home-hive-1.onrender.com/Home-Hive/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      // if the response of 200 is there then only we will proceed
      if (response.ok) {
        const loggedIn = await response.json();
        // here we are updating the value of state in store.
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        );
        navigate("/");
      } else {
        const errorMessage = await response.json();
        console.log("Login failed:", errorMessage.message);
        // Handle error, display error message to user or perform other actions
      }
    } catch (err) {
      console.error("Login failed:", err.message);
      // Handle error, display error message to user or perform other actions
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <div className="flex flex-row gap-2">
          <div className="text-white mt-2">Already have an account?</div>
          <a href="/Register">
            <div className="text-red-400 font-semibold text-base underline mt-2">
              Sign Up
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

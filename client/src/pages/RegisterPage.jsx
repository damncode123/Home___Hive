import React, { useState ,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import "../styles/Register.css";
const RegisterPage = () => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [passwordMatch, setPasswordMatch] = useState(true)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setformData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };
  // console.log(formData);
  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  },)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("https://home-hive-1.onrender.com/Home-Hive/auth/register", {
        method: "POST",
        body: register_form
      })
 
      if (response.ok) {
        console.log("hello");
        navigate("/login")
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }

  return (
    <div className="register">
      <div className="register_content">
      <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}
          <input
            id="Profileimage"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            name="profileImage"
            required
          />
          <label htmlFor="Profileimage">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>
          {formData.profileImage && (
            <img
            src={URL.createObjectURL(formData.profileImage)}
            alt=""
            style={{ maxWidth: "80px" }}
          />
          
          )}
           <button type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <div class="flex flex-row gap-2">
          <div className="text-white mt-2">Already have an account?</div>
          <a href="/login">
            <div className="text-red-400 font-semibold text-base  underline">
              login
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useState } from "react";
import "../css/Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {

  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Submit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:3003/admin/auth/resetPassword",
        {
          mobile,
          password,
          confirmPassword,
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message || "Something went wrong"
      );

    }
  };


  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Reset Password</h2>

        <p className="forgot-text">
          Enter your mobile number and create new password
        </p>


        <form onSubmit={Submit}>


          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobile}
            maxLength={10}
            required
            onChange={(e) => setMobile(e.target.value)}
          />


          <input
            type="password"
            placeholder="Enter New Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />


          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />


          <button type="submit">
            Reset Password
          </button>


        </form>


      </div>

    </div>

  );
}

export default ResetPassword;
import React, { useState } from "react";
import "../css/Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function VerifyOtp() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const Submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/admin/auth/forgotVerifyOTP`,
        {
          mobile,
          otp,
        }
      );

      alert(res.data.message || "OTP verified successfully");

      navigate("/ResetPassword", {
        state: {
          mobile,
          otp,
        },
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Invalid OTP"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Verify OTP</h2>

        <p className="forgot-text">
          Enter your mobile number and OTP
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
            type="text"
            placeholder="Enter OTP"
            value={otp}
            maxLength={6}
            required
            onChange={(e) => setOtp(e.target.value)}
          />

          <button type="submit">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;

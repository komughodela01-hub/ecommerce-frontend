import React, { useState } from "react";
import "../css/Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgot() {

  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");

  const Submit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3003/admin/auth/forgot",
        {
          mobile
        }
      );

      alert(res.data.message);

      navigate("/VerifyOtp");

    } catch (error) {

      alert(error.response?.data.message);

    }
  };


  return (

    <div className="login-container">


      <div className="login-box">


        <h2>Forgot Password</h2>


        <p className="forgot-text">
          Enter your email to reset your password
        </p>



        <form onSubmit={Submit}>


         <input
  type="tel"
  placeholder="Enter Mobile Number"
  value={mobile}
  required
  maxLength={10}
  onChange={(e) => setMobile(e.target.value)}
/>

          <button type="submit">

            Send otp

          </button>


        </form>



        <div className="links">

          <a href="/login">
            Back To Login
          </a>


          <a href="/register">
            Register
          </a>


        </div>



      </div>


    </div>

  );

}


export default Forgot;
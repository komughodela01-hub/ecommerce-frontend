
import React, { useState } from "react";
import "../css/Auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 
function Login() {
  const navigate =useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const  Submit = async (e) => {
    e.preventDefault();
 try {
      const res = await axios.post(
        "http://localhost:3003/admin/auth/login",
        {
          email,
          password
        }
      );


      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.data));
      
      navigate("/Dashbord")
 
    //  console.log(res.data)

      alert("Login Successfully");

    } catch (error) {
    alert(error.response?.data.message);
    }
  }
  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Login</h2>

        <form onSubmit={Submit}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            required
            onChange={(e)=>setEmail(e.target.value)}
          />


          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            required
            onChange={(e)=>setPassword(e.target.value)}
          />


       <button type="submit">Login
      </button>

        </form>


        <div className="links">
          <a href="/forgot">
            Forgot Password?
          </a>

          <a href="/register">
            Register
          </a>
        </div>


      </div>

    </div>
  );
}

export default Login;
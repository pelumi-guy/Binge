// import React, {Component} from "react";
import React, { useState } from "react";
import axios from "axios";
import "./Forgot.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ForgotPassword.js
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://binge-api.azurewebsites.net/api/v1/Authentication/forgot-password?email=${email}`
      );
      if (response.data.succeeded) {
        navigate(`/resetsuccessful?email=${email}`);
        toast.success("Password reset email sent. Please check your inbox.");

        // alert('Password reset email sent. Please check your inbox.');
      } else {
        // setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      // setError('There was an error sending the password reset email.');
      toast.error("There was an error sending the password reset email.");
    }
  };

  return (
    // <div className="static">
    <div className="contain">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="">
            <div className="binge">
              <h1 className="black-text auth-h1">
                Bin<span>ge</span>
              </h1>
            </div>

            <div>
              <h3 className="Reset-Password-title">Reset your Password</h3>
            </div>

            <p className="note">
              Enter your email below and we'll send you instruction on how to
              reset your password
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="email-label" className="emaillabel">
            Email Address
          </label>
        </div>

        <div className="form">
          <input
            className="input"
            type="email"
            id="email-label"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btnn" type="submit">
          Send Reset Instruction
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
    // </div>
  );
};

export default ForgotPassword;

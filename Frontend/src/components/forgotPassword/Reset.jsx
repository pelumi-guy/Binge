import React, { useState } from "react";
import "./Forgot.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import * as Yup from "yup";
import { toast } from "react-toastify";


// const ResetPasswordSchema = Yup.object().shape({
//   NewPassword: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .required("Password is required"),
//   ConfirmPassword: Yup.string()
//     .oneOf([Yup.ref("NewPassword"), null], "Passwords must match")
//     .required("Confirm Password is required")
// });

const Reset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchValue = location.search;

  const urlParams = new URLSearchParams(searchValue);
  const Email = urlParams.get('email');
  const Token = urlParams.get('token');

  // console.log({ Email, Token })

  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");



  const handleSubmit = async e => {
    e.preventDefault();
    if (NewPassword !== ConfirmPassword) {
      alert("Passwords do not match");
    } else {
      const requestbody = {
        NewPassword,
        ConfirmPassword,
        Email,
        Token
      }

      const response = await axios.post(
        'https://binge-api.azurewebsites.net/api/v1/Authentication/reset-password',
        JSON.stringify(requestbody),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log({ response });
      if (response.data.succeeded) {
        toast.success('Password reset successful');
        navigate(`/resetsuccessful?email=${Email}`);
        // Redirect to the login page or any other page you want
      } else {
        toast.error('Failed to reset password');
      }
    }
  };

  // const handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };


  return (
    // <div className="static">
      <div className="contain">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <div className="binge">
              <h1 className="black-text">
                Bin<span>ge</span>
              </h1>
            </div>

            <div>
              <h3 className="Reset-Password-title">Reset your Password</h3>
            </div>
          </div>

          <div className="password-input">
            <label style={{color:'black'}}>Password</label>
            <div className="form">
              <input
                type="password"
                className="input"
                placeholder="xxxxxxx"
                name="NewPassword"
                value={NewPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="New-Password"
              />
            </div>
          </div>


          <label style={{color:'black'}}>Confirm Password</label>
          <div className="form">
            <input
              type="password"
              className="input"
              placeholder="********"
              name="ConfirmPassword"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="Confirm-Password"
            />
          </div>

          <button className="btnn" type="submit">
            Send Reset Instruction
          </button>
          <div className="text-center">
            <p>Go back to <Link className="signin" to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    // </div>
  );
}

export default Reset;

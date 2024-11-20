import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Signup.css";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosSettings/httpSetup";
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
} from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setphoneError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const isPasswordValid = passwordRegex.test(password);
  const isEmailValid = emailRegex.test(email);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phoneNumber) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phoneNumber));
    } catch (error) {
      return false;
    }
  };
  const isValid = isPhoneValid(phoneNumber);

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ["ng"].includes(iso2);
  });

  const handlePasswordCheck = (e) => {
    const confirm = e.target.value;
    setconfirmPassword(e.target.value);
    if (confirm !== password) {
      setpasswordError("Passwords do not match");
    } else {
      setpasswordError("");
    }
  };



  useEffect(() => {
    setError("");
  }, [email, firstName, lastName, phoneNumber]);


  const SIGNUP_URL =
    "/api/v1/Authentication/register";

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isEmailValid) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      if (!isPasswordValid) {
        setError(
          "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character. "
        );
        setLoading(false);
        return;
      }
      if (!isValid) {
        setphoneError("Phone Number is invalid");
        return;
      }
      if (isValid) {
        setphoneError("");
      }
      setError("");


      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          confirmPassword,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.data.succeeded) {
        setError("");
        localStorage.setItem("userEmail", response.data.data.email);
        setfirstName("");
        setlastName("");
        setEmail("");
        setPassword("");
        setconfirmPassword("");
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        setError(response.data.message);
        console.log(error);
      }
      setError("User with email already exists");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        setError("No server response");
      }
    }
    finally {
      setLoading(false);
    }

  };

  return (

    <>
      <div className="background shadow"
        style={{ color: "black" }}
      >
        <form className="folder">
          <h1 className="auth-h1">
            Bin<span>ge</span>
          </h1>
          <h3 className="text">Create an Account</h3>
          <div className="input-div">
            <label htmlFor="fName-label">First Name</label>
            <input
              className="input"
              id="fName-label"
              placeholder="Enter first name"
              type="text"
              autoComplete="off"
              onChange={(e) => setfirstName(e.target.value)}
              name="firstName"
              value={firstName}
              required
            />
          </div>
          <div className="input-div">
            <label htmlFor="lastName-label">Last Name</label>
            <input
              className="input"
              id="lastName-label"
              placeholder="Enter last name"
              type="text"
              autoComplete="off"
              onChange={(e) => setlastName(e.target.value)}
              name="lastName"
              value={lastName}
              required
            />
          </div>

          <div className="input-div">
            <label htmlFor="phone-label">Phone Number</label>
            <PhoneInput
              id="phone-label"
              defaultCountry="ng"
              countries={countries}
              onChange={(phoneNumber) => setphoneNumber(phoneNumber)}
              name="phone"
              value={phoneNumber}
              required
              inputStyle={{
                height: "48px",
                width: "100%",
                border: "1px solid",
                
              }}
            />
          </div>
          {phoneError && (
            <div style={{ color: "red" }}> {phoneError} </div>
          )}

          <div className="input-div">
            <label htmlFor="email-label">Email Address</label>
            <input
              className="input"
              id="email-label"
              type="email"
              autoComplete="off"
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              required
            />
          </div>

          <div className="input-div">
            <label htmlFor="pword-label">Password</label>
            <div className="password-container">
              <input
                className="input"
                id="pword-label"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
                required
              />
              {(navigator.userAgent.indexOf("Edg") != -1) ? null : 
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
              }
            </div>
          </div>
          <div className="confirm-password-container input-div">
            <label htmlFor="confirmPword-label">Confirm Password</label>
            <div className="password-container">
              <input
                className="input"
                id="confirmPword-label"
                placeholder="Re-enter password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="off"
                onChange={handlePasswordCheck}
                name="confirmPassword"
                value={confirmPassword}
                required
              />
              {(navigator.userAgent.indexOf("Edg") != -1) ? null : 
              <span
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
              }
            </div>
            {passwordError && (
              <div className="col-md-12" style={{ color: "red" }}>
                {passwordError}
              </div>
            )}
          </div>
          <p className="or">
            <span className="line"></span>OR<span className="line"></span>
          </p>
          <button className="Google-container" disabled>
            <FcGoogle />
            Sign in with Google
          </button>

          {loading && (
            <div
              className="col-md-12"
              style={{ textAlign: "center", color: "rgba(155, 81, 224, 1)" }}
            >
              <i
                className="pi pi-spin pi-spinner"
                style={{ fontSize: "2.5rem" }}
              ></i>
            </div>
          )}
          {error && (
            <div
              className="col-md-12"
              style={{ textAlign: "center", color: "red" }}
            >
              <b>{error}</b>
              {console.log({ error })}
            </div>
          )}
          <button
            className="submit-container"
            id="submitting"
            onFocus={submitForm}
            disabled={
              !firstName ||
              !lastName ||
              !email ||
              !password ||
              !confirmPassword ||
              !phoneNumber
            }
          >
            Sign Up
          </button>
          <p className="account">
            Already have an account?&nbsp;
            <Link to="/login" className="underline">
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </>

  );
};

export default Signup;

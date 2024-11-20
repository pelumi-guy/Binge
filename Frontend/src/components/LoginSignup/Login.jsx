import React, { useEffect, useState, useContext } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosSettings/httpSetup";
import AuthContext from "../../context/AuthProvider";
import "primeicons/primeicons.css";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const isPasswordValid = passwordRegex.test(password);
  const isEmailValid = emailRegex.test(email);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    setError("");
  }, [email, password]);

  const LOGIN_URL = "/api/v1/Authentication/Login";
  // "https://binge-backend.onrender.com/api/v1/Authentication/Login";

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isEmailValid) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      if (!isPasswordValid) {
        setError(
          "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
        );
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          // timeout: 50000,
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
          "Access-Control-Allow-Origin": "*",
        }
      );
      console.log(JSON.stringify(response.data));

      if (response.data.succeeded) {
        //what would response.data.succeeded do here
        // localStorage.setItem("firstname", response.data.data.firstName);
        // localStorage.setItem("email", response.data.data.email);
        // localStorage.setItem("id", response.data.data.id);

        const token = response.data.data.token;
        const userId = response.data.data.id;
        const planId = response.data.data.planId;
        const firstName = response.data.data.firstName;
        // const favouriteMovies = response.data.data.favoriteMovies;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("userId", userId);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("planId", planId);

        setAuth({ isAuthenticated: true, user: response.data.data });
        setEmail("");
        setPassword("");
        toast.success("Logged in successfully");

        if (planId) {
          navigate("/home");
        } else {
          navigate("/subscription");
        }
      } else {
        setError(response.data.message);
        // console.log({ error });
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("No Server Response");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="second" style={{ color: "black" }}>
        <h1 className="auth-h1">
          Bin<span>ge</span>
        </h1>

        <div className="third">
          <h3 className="third-text">Welcome back to Binge</h3>
        </div>
        <form className="form-body">
          <div className="fourth">
            <label htmlFor="email-label">Email Address</label>
            <input
              className="input"
              id="email-label"
              placeholder="Enter email "
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              required
            />
          </div>

          <div className="fifth">
            <label htmlFor="password-label">Password</label>
            <div className="password-container">
              <input
                className="input"
                id="passsword-label"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                // onFocus={(e) => { e.target.type = "password" }}
                name="password"
                value={password}
                required
              />
              {(navigator.userAgent.indexOf("Edg")!= -1) ? null :
              <div
                className="login-password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
              }
            </div>
          </div>
          <div className="forgot">
            <Link to="/forgot" className="forgot-passsword">
              Forgot Password?
            </Link>
          </div>

          <p className="or-word">
            <span className="or-line"></span> OR
            <span className="or-line"></span>
          </p>
          <button className="google-signin">
            <FcGoogle
              style={{
                width: "24px",
                height: "24px",
                marginRight: "8px",
                top: "2px",
              }}
            />
            Sign in with Google
          </button>

          {error && (
            <div
              className="error-message col-md-12"
              style={{ textAlign: "center", color: "red" }}
            >
              <b>{error}</b>
              {console.log({ error })}
            </div>
          )}

          {loading && (
            <div
              className="col-md-12"
              style={{
                textAlign: "center",
                color: "rgba(155, 81, 224, 1)",
              }}
            >
              <i
                className="pi pi-spin pi-spinner"
                style={{ fontSize: "2.5rem" }}
              ></i>
            </div>
          )}
          <button className="login" onClick={submitForm}>
            Log in
          </button>
        </form>
        <p className="get-account">
          Don't have an account?&nbsp;
          <Link to="/signup" className="signup-here">
            Sign up here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Successful.css';
import bgSuccess from "../../assets/images/bg_success.svg"


const PasswordResetSuccess = () => {
  const location = useLocation();
  const searchValue = location.search;

  const urlParams = new URLSearchParams(searchValue);
  const email = urlParams.get('email');

  return (

    <>
      <div className='con container'>
        <div className="password-reset-success-container">
          <h1 className="success-title">Successful Password Reset!</h1>


          <div className='arrowborder' >
            <img src={bgSuccess} alt="success" />
          </div>

          <p className="email-message mb-5">
            You will get an email confirmation at <strong>{email}</strong>
          </p>
          <div className="login-button">
            <Link to="/login"
            style={{ marginTop: "0px" }}
            >
              <button className='btn custom-btn return-to-login fw-bold'
                type="submit"
                style={{ color: "#FFFFFF", fontSize: "16px" }}
              >
                Return to Login</button>
            </Link>
          </div>
        </div>
      </div>
    </>

  );
};

export default PasswordResetSuccess;
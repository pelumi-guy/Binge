import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./PaymentSuccess.css";
import bgSuccess from "../../assets/images/payment/bg_success.svg";

const PaymentSuccess = () => {

  const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {}, 10000);
  // });

  return (
    <>
      <div className="con">
        <div className="password-reset-success-container">
          <h1 className="success-title">Successful Payment</h1>

          <div className="arrowborder">
            <img src={bgSuccess} alt="payment success" />
          </div>

          <p className="email-message mb-5">Your Payment has been made successfully</p>
          <div className="login-button">

            <button
              className="btn to-login-btn"
              type="submit"
              style={{ color: "#FFFFFF", width: "100%", height: "100%" }}
            //onClick={() => navigate("/home")}
            >
              <Link to="/home"
                style={{ textDecoration: "none", marginTop: "0px", width: "100%" }}
              >
                <span className="text-white fw-bold"
                  style={{ fontSize: "16px" }}
                >Return to Home</span>
              </Link>
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;

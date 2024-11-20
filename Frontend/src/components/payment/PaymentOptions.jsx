import React, { useContext } from "react";
import "./PaymentOptions.css";
import lock from "../../assets/images/payment/lock.svg";
import paystack_logo from "../../assets/images/payment/paystack_logo.svg";
import Flutterwave_Logo from "../../assets/images/payment/Flutterwave_Logo.svg";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";
import axiosInstance from "../../axiosSettings/httpSetup";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const PaymentURL = "/api/v1/Plan/Subscribe";
  const { auth } = useContext(AuthContext);

  //We won't be using context because it doesn't persist data on reload
  // const { token, id: userId, planId } = auth.user;

  const tokenFromLocalStorage = localStorage.getItem("token");
  const userIdFromLocalStorage = localStorage.getItem("userId");
  const planIdFromLocalStorage = localStorage.getItem("planId");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenFromLocalStorage}`,
  };

  const handlePaystackClick = async () => {
    try {
      const response = await axiosInstance.post(
        PaymentURL,
        {
          UserId: userIdFromLocalStorage,
          PlanId: planIdFromLocalStorage,
          Months: 1,
        },
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        // Redirect to the Paystack payment page
          localStorage.setItem("paymentRef", response.data.data.data.reference);
          console.log(response.data.data.data.reference);
        window.location.href = response.data.data.data.authorizationUrl;
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate payment");
    }
  };

  return (
    <>
      <div className="payment-page ">
        <div className=" text-center choose-payment">
          <h1>Choose how to pay</h1>
          <p>
            Your Payment is Encrypted and you can cancel change how you pay at
            any time
          </p>
          {/* <p >Cancel at Anytime</p> */}
          <div className="can ">
            <p>Cancel at Anytime</p>
          </div>
        </div>

        <div className="encrypted">
          <p>
            End-to-end encrypted{" "}
            <img className="lock" src={lock} alt="e2e encrypted" />
          </p>
        </div>

        <div className="btn paystack-button-container">
          <div>
            <button className="paystack-button" onClick={handlePaystackClick}>
              Paystack{" "}
              <img
                className="paystack_icon1"
                src={paystack_logo}
                alt="paystack-icon"
              />
            </button>
          </div>
          <div>
            <button
              className="flutterwave-button"
              // onClick={handleFlutterwaveClick}
            >
              Flutterwave{" "}
              <img
                className="Flutterwave_Logo"
                src={Flutterwave_Logo}
                alt="flutterwave logo"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;

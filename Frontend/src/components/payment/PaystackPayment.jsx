import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosSettings/httpSetup";
import { toast } from "react-toastify";
import "./PaymentOptions.css";
// import lock from "../../assets/images/payment/lock.svg";
// import paystack_logo from "../../assets/images/payment/paystack_logo.svg";
// import Flutterwave_Logo from "../../assets/images/payment/Flutterwave_Logo.svg";
// import { useDispatch } from "react-redux";

const Payment = () => {
  // Get the current location (URL parameters)
  const location = useLocation();

  // Hook to navigate to different pages
  const navigate = useNavigate();
  // Redux dispatch function if needed
  // const dispatch = useDispatch();

  // Extracting the transaction reference (trxref) from the URL query string
  const searchValue = location.search;
  const urlParams = new URLSearchParams(searchValue);
  const paystackPaymentRef = urlParams.get("trxref");
  const paymentRef = localStorage.getItem("paymentRef");

  // const handlePaystackClick = () => {
  // Effect hook to run once when the component mounts
  useEffect(() => {
    //  Define an async function to verify the payment with the backend
    async function verifyPayment() {
      try {
        console.log({ paymentRef });
        // Send a GET request to the backend API to verify the payment
        const verification = await axiosInstance.patch(
          `/api/v1/Plan/VerifySubscription/${paymentRef}`
        );

        // Check if the payment verification was successful
        if (!verification.data.succeeded) {
          // If payment verification failed, redirect the user back to the checkout page
          navigate("/paymentoption");
          return;
        }
        // If payment verification was successful, redirect the user to the order success page
        navigate("/paymentsuccess");
      } catch (error) {
        // Handle any errors that occur during payment verification

        toast.error(error.message);
        // Optionally dispatch an action to handle payment failure in Redux
        // dispatch({ type: PAYMENT_FAILED, payload: error.message });
        // Redirect the user back to the checkout page
        navigate("/paymentoption");
      }
    }

    // Call the verifyPayment function when the component mounts

    verifyPayment();
  }, []);

  return null;
  // <>
  //   <div className="illusion"></div>
  // <div className="static">
  //   <div className="payment-page">
  //     <div className="text-center">
  //       <h1>Choose how to pay</h1>
  //       <p>
  //         Your Payment is Encrypted and you can cancel change how you pay at
  //         any time
  //       </p>
  //       {/* <p >Cancel at Anytime</p> */}
  //       <div className="can">
  //         <p>Cancel at Anytime</p>
  //       </div>
  //     </div>

  //     <div className="encrypted">
  //       <p>
  //         End-to-end encrypted <img className="lock" src={lock} />
  //       </p>
  //     </div>

  //     <div className="btn">
  //       <div>
  //         <button className="paystack-button" onClick={handlePaystackClick} >
  //           Paystack <img className="paystack_icon1" src={paystack_logo} />
  //         </button>
  //       </div>
  //       <div>
  //         <button
  //           className="flutterwave-button"
  //         //   onClick={handleFlutterwaveClick}
  //         >
  //           Flutterwave <img className="Flutterwave_Logo" src={Flutterwave_Logo} />
  //         </button>
  //       </div>
  //     </div>
  //   </div>

  // </div>
  // );
};

export default Payment;

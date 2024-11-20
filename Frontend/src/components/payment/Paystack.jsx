import React, { useState } from "react";
import countries from "./Countries.jsx";
import "./Paystack.css";
import paystack_logo from "../../assets/images/payment/paystack_logo.svg";
import featured_icon from "../../assets/images/payment/featured_icon.svg";
import Payment_method_icon from "../../assets/images/payment/Payment_method_icon.svg";

const PaymentForm = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCVV] = useState("");
  const [country, setCountry] = useState("");
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);

  const handleSavePaymentInfoChange = (e) => {
    setSavePaymentInfo(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission
  };

  return (
    <>
      <div className="illusion"></div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <h3 className="payment-form-header">
          Pay with <img className="paystack_logo" src={paystack_logo} />{" "}
          Paystack
        </h3>

        <div className="country">
          <label className="label">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="country-selector"
          >
            <option value="">Select</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-sec">
          <img className="featured_icon" src={featured_icon} />
          <div className="add-payment">
            <h4>Add payment method</h4>
            <p>Add your card details.</p>
          </div>

          <div className="input-container">
            <div className="name-input">
              <div className="name-label">
                <label className="labell">Name on card</label>
                <div className="">
                  <input
                    type="text"
                    placeholder="John Leo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="expiry">
                <label className="expiry-label">Expiry</label>
                <input
                  type="text"
                  placeholder="06 / 2024"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="text-input"
                />
              </div>
            </div>

            <div className="card-container">
              <div className="">
                <label className="card_label">Card Number</label>
                <div className="input-number">
                  <img
                    className="Payment_method_icon"
                    src={Payment_method_icon}
                  />
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="card-input"
                  />
                </div>
              </div>

              <div className="cvv-container">
              <label className="card_label">CVV</label>
              <input
                type="text"
                placeholder="***"
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
                className="cvv-input"
              />
              </div>

            </div>
          </div>
        </div>

        <div className="payment-div">
          <button type="submit" className="payment-button">
            Pay with Card
          </button>
        </div>
      </form>
      <div className="illusion"></div>
    </>
  );
};

export default PaymentForm;

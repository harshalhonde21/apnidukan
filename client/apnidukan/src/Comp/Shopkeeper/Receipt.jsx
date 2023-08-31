import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"

export default function Receipt() {
  const location = useLocation();
  const { state } = location;
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const [currentBalance, setCurrentBalance] = useState('');
  const [payingAmount, setPayingAmount] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.phoneNumber && state.cusitem && state.tots) {
      setCurrentBalance(state.tots);
      setIsDataAvailable(true);
    } else {
      setIsDataAvailable(false);
    }
  }, [state]);

  useEffect(() => {
    if (isDataAvailable) {
      const payingAmt = parseInt(payingAmount);
      const currentAmt = parseInt(currentBalance);
      const remainingAmt = currentAmt - payingAmt;
      setRemainingAmount(remainingAmt);
    }
  }, [isDataAvailable, payingAmount, currentBalance]);

  const handlePayingAmountChange = (e) => {
    setPayingAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const formData = {
      phoneNumber: state.phoneNumber,
      currentBalance: currentBalance,
      payingAmount: payingAmount,
      remainingAmount: remainingAmount,
    };

    // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend API endpoint
    const backendURL = 'http://localhost:5500/api/receipt';

    // Send the form data to the backend using Axios POST request
    axios.post(backendURL, formData)
      .then((response) => {
        // Handle successful response (if needed)
        alert('Receipt data submitted successfully!', response.data);
      })
      .catch((error) => {
        // Handle error (if needed)
        console.error('Error submitting receipt data:', error);
      });

      navigate('/navdash/showreceipt');
  };

  const handleBackToDashboard = () => {
    navigate('/navdash'); 
  };

  if (!isDataAvailable) {
    return <h2>you can't go directly to receipt section firstly you have submit the bill and then only you can take out the receipt </h2>;
  }

  return (
    <>
      <div className="receipt" style={{ width: '130%' }}>
        <h3 style={{ fontSize: '1.52rem', marginBottom: '2rem' }}>
          Receipt Generator
        </h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="productCustomer phonenumber">
            Customer phonenumber:
          </label>
          <input
            type="text"
            name="productCustomer phone number"
            id="productCustomer Namet"
            placeholder="Enter Customer phone number"
            value={state.phoneNumber}
            readOnly
            required
          />
          <label htmlFor="Current Balance Amt">Current Balance Amt: </label>
          <input
            type="text"
            name="Current Balance Amt"
            id="Current Balance Amt"
            placeholder="Enter Current Balance Amt"
            value={currentBalance}
            readOnly
            required
          />
          <label htmlFor="Paying Amount">Paying Amount: </label>
          <input
            type="text"
            name="mrp"
            id="Paying Amount"
            placeholder="Enter Paying Amt"
            value={payingAmount}
            onChange={handlePayingAmountChange}
            required
          />
          <label htmlFor="Remaining Amount">Remaining Amount: </label>
          <input
            type="text"
            name="costRemaining Amount"
            id="costRemaining Amount"
            placeholder="Enter Remaining Amt"
            value={remainingAmount}
            readOnly
            required
          />
          <button type="submit" className="cbtn">
            Submit
          </button>
          <button type="reset" className="rbtn" onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>
        </form>
      </div>
    </>
  );
}

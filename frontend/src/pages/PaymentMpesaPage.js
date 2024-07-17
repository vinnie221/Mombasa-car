import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import displayKESCurrency from '../helpers/displayCurrency';
import { LiaMoneyCheckSolid } from "react-icons/lia";

const PaymentMpesaPage = ({ totalPrice }) => {
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    phone: '',
    amount: totalPrice ? totalPrice : '', // Initialize amount with totalPrice if available
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setDbData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const pollPaymentStatus = async (checkoutRequestID) => {
    const startTime = Date.now();
    const timeout = 60000; // 1 minute

    const poll = async () => {
      try {
        const response = await fetch(`/payment-status?checkoutRequestID=${checkoutRequestID}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
        });

        const result = await response.json();

        if (response.ok) {
          console.log('Payment status:', result);

          if (result.Body.stkCallback.ResultDesc === "The service request is processed successfully.") {
            navigate('/success');
            return;
          } else if (Date.now() - startTime >= timeout) {
            navigate('/failed');
            return;
          } else {
            setTimeout(poll, 5000); // Poll every 5 seconds
          }
        } else {
          console.error('Error checking payment status:', response.statusText);
          if (Date.now() - startTime >= timeout) {
            navigate('/failed');
            return;
          } else {
            setTimeout(poll, 5000); // Poll every 5 seconds
          }
        }
      } catch (error) {
        console.error('Error:', error);
        if (Date.now() - startTime >= timeout) {
          navigate('/failed');
          return;
        } else {
          setTimeout(poll, 5000); // Poll every 5 seconds
        }
      }
    };

    poll();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.mpesaPayment.url, {
        method: SummaryApi.mpesaPayment.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Payment initiated:', result);
        const checkoutRequestID = result.CheckoutRequestID; // Capture the CheckoutRequestID
        pollPaymentStatus(checkoutRequestID); // Start polling for payment status
      } else {
        console.error('Payment initiation failed:', response.statusText);
        navigate('/failed');
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/failed');
    }
  };

  return (
    <div>
      <h2 className='text-center text-green-600 text-lg font-bold mb-4 flex justify-center gap-3 items-center'>
        Mpesa Payment <LiaMoneyCheckSolid /> <LiaMoneyCheckSolid />
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <input
            name='phone'
            placeholder='Enter Phone Number.'
            onChange={handleInputChange}
            type='text'
            className='border bg-slate-100 text-center rounded-xl w-full p-2'
            value={data.phone}
            required
          />
        </div>
        <div className='mb-4'>
          <input
            name='amount'
            placeholder='Enter Amount.'
            onChange={handleInputChange}
            type='number'
            className='border bg-slate-100 text-center rounded-xl w-full p-2'
            value={data.amount}
            required
            readOnly={true}
          />
        </div>
        <button type='submit' className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded w-full'>
          Pay {displayKESCurrency(data.amount)}
        </button>
      </form>
    </div>
  );
};

export default PaymentMpesaPage;

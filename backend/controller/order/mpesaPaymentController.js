// controller/mpesaPaymentController.js

const axios = require("axios");

let token = ""; // To store the access token

// Middleware to generate and set the access token
const createToken = async (req, res, next) => {
    const secret = process.env.MPESA_SECRET_KEY;
    const customer = process.env.MPESA_CUSTOMER_KEY;
    const auth = Buffer.from(`${customer}:${secret}`).toString('base64');

    try {
        const response = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: {
                    authorization: `Basic ${auth}`,
                },
            }
        );
        token = response.data.access_token;
        console.log("Generated Token: ", token);
        next();
    } catch (err) {
        console.error("Error generating token:", err.response ? err.response.data : err.message);
        res.status(400).json({ error: err.message });
    }
};

// Handler to perform the STK Push
const stkPush = async (req, res) => {
    const shortCode = "174379";
    const { phone, amount } = req.body;
    const passKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const date = new Date();
    const timestamp =
        date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2) +
        ('0' + date.getHours()).slice(-2) +
        ('0' + date.getMinutes()).slice(-2) +
        ('0' + date.getSeconds()).slice(-2);

    const password = Buffer.from(shortCode + passKey + timestamp).toString('base64');

    // Ensure phone number is in the correct format
    const formattedPhone = phone.replace(/^0/, '254');

    const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone, // The phone number should be in the format 2547XXXXXXXX
        PartyB: shortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: "https://d9e9-41-79-169-14.ngrok-free.app", // Replace with your valid callback URL
        AccountReference: "Test", // Make sure this is less than or equal to 12 characters
        TransactionDesc: "Test" // Make sure this is less than or equal to 13 characters
    };

    try {
        console.log('Request Data:', data);
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("STK Push Response:", response.data);
        res.status(200).json(response.data);
    } catch (err) {
        console.error("Error during STK Push:", err.response ? err.response.data : err.message);
        res.status(400).json({ error: err.message });
    }
};

module.exports = { createToken, stkPush };




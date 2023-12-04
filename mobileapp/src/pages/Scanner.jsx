import React, { useState, useEffect } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Scanner.css';
import BackArrow from "../components/BackArrow";

const Scanner = () => {
  const proxy = "https://happytummy-backend-production.up.railway.app"
  const navigate = useNavigate();
  const [scannedCode, setScannedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [productId, setProductId] = useState(null);

  const [barcode, setIdUser] = useState({
    barcode: ''
  });

  const handleScan = async (code) => {
    console.log(code);
    barcode.barcode = code
    console.log(barcode.barcode)

    try {
      axios.get(proxy + "/products/frombarcode/" + barcode.barcode)
        .then(response => {
          if (response && response.data && response.data.length > 0) {
            const productId = response.data[0].id;
            navigate("/app/products/" + productId);
          } else {
            console.log("No data found for the barcode");
            // Handle the case when response is empty or data doesn't exist
          }
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          // Handle errors, like network issues or server problems
        });
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle any synchronous errors
    }
  };

  const handleSearch = async () => {
    console.log('Searching for:', searchQuery);

    try {
      // Make an API call to the specified endpoint
      const response = await axios.get(proxy + `/products/frombarcode/${searchQuery}`);
      console.log(response);

      // Assuming the response contains an 'id' field
      const productId = response.data[0].id;
      setProductId(productId);

      console.log('Product ID:', productId);

      // Show notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`Product ID: ${productId}`, {
          body: 'Redirecting to product page...',
        });
      }

      // Redirect to the "/product/{id}" route
      window.location.href = `/app/products/${productId}`;
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  return (
    <div className="barcode-scanner-app-container">

      <BackArrow />

      <h1 className="barcode-title">Find your product!</h1>
      <p className="barcode-text"> Use the barcode scanner to find your product.</p>

      {/* {scannedCode && <p className="scan-info">Scanned Code: {scannedCode}</p>}
      {productId && <p className="product-info">Product ID: {productId}</p>} */}

      <div className="scanner-wrapper">
        <BarcodeScanner onScan={handleScan} />
      </div>

      <h5 className="barcode-minititle">Unable to use the barscanner?</h5>
      <p className="barcode-text">Enter the barcode manually</p>

      <div className="search-bar-container">
        <div className="search-input">
          <input
            type="text"
            className="form-control search-query-input"
            placeholder="Enter barcode"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="search-button">
          <button className="btn btn-primary search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scanner;

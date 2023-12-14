import React, { useState, useEffect } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Scanner.css';
import BackArrow from "../components/BackArrow";
import ProductCard from "../components/ProductCard";

const Scanner = () => {
  const proxy = "https://happytummy-backend-production.up.railway.app"
  const navigate = useNavigate();
  const [scannedCode, setScannedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState(null);

  // Barcode scanner event handler
  const [barcode, setIdUser] = useState({
    barcode: ''
  });

  // Set the barcode value
  const handleScan = async (code) => {
    try {
      const response = await axios.get(proxy + "/products/frombarcode/" + code);

      if (response && response.data && response.data.length > 0) {
        setProductData(response.data[0]);
      } else {
        console.log("No data found for the barcode");
        setProductData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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

      // Show notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`Product ID: ${productId}`, {
          body: 'Redirecting to product page...',
        });
      }

      // Redirect to the "/product/{id}" route
      // window.location.href = `/app/products/${productId}`;
      setProductData(response.data[0]);
    } catch (error) {
      setProductData(null);
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
          <button className="" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {productData ? (
        <div className="product-card-container-2">
          <ProductCard
            image={productData.image_url}
            title={productData.product_name}
            desc={productData.product_description}
            id={productData.id}
            likes={productData.likes}
          />
          <div className="just-white"></div>
        </div>
      ) : (
        <div className="just-white">Product not found 😥</div>)}

    </div>
  );
};

// Export the Scanner component
export default Scanner;

import React, { useState } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';
import axios from 'axios';

const Scanner = () => {
  const [scannedCode, setScannedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [productId, setProductId] = useState(null);

  const handleScan = (code) => {
    setScannedCode(code);
    console.log(code);
  };

  const handleSearch = async () => {
    console.log('Searching for:', searchQuery);

    try {
      // Make an API call to the specified endpoint
      const response = await axios.get(`/products/frombarcode/${searchQuery}`);
      console.log(response);

      // Assuming the response contains an 'id' field
      const productId = response.data[0].id;
      setProductId(productId);

      console.log('Product ID:', productId);

      // Redirect to the "/product/{id}" route
      window.location.href = `/app/products/${productId}`;
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Barcode Scanner App</h1>
      {scannedCode && <p>Scanned Code: {scannedCode}</p>}
      {productId && <p>Product ID: {productId}</p>}
      <BarcodeScanner onScan={handleScan} />

      {/* Text input and search button */}
      <div className="row mt-3 justify-content-center">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-2 mb-2">
          <button className="btn btn-primary btn-block" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scanner;

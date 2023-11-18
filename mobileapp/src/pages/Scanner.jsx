import React, { useState } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';

const Scanner = () => {
  const [scannedCode, setScannedCode] = useState(null);

  const handleScan = (code) => {
    setScannedCode(code);
    <p>{code}</p>
    console.log(code)
  };

  return (
    <div>
      <h1>Barcode Scanner App</h1>
      {scannedCode && <p>Scanned Code: {scannedCode}</p>}
      <BarcodeScanner onScan={handleScan} />
      <div></div>
    </div>
  );
};

export default Scanner;
import React, { Component, useEffect } from 'react'
import BarcodeReader from 'react-barcode-reader'
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState } from 'react';
 
function Scanner() {

    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 300,
                height: 150
            },
            fps: 5,
        });
    
        scanner.render(success, error);
    
        function success(result) {
            scanner.clear();
            setScanResult(result);
        }
    
        function error(err) {
            console.warn(err);
        }
    },[]);

    return(
      <div className='scanner'>
        <h1>QR code scanning in React</h1>
        { scanResult
        ? <div>Success: <a href={scanResult} target='_blank'>{scanResult}</a></div>
        : <div id="reader"></div>
        }
        <div id='reader'></div>
      </div>
    );
}

export default Scanner;
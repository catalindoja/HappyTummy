import React, { useEffect } from 'react';
import Quagga from 'quagga';
import './BarcodeScanner.css';

const BarcodeScanner = ({ onScan }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#barcode-scanner'), // The container for the video element
          constraints: {
            width: 890,
          }
        },
        decoder: {
          readers: ['ean_reader'], // Specify the barcode format you want to decode (EAN-13 in this example)
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      onScan(result.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, [onScan]);

  return <div id="barcode-scanner"></div>;
};

export default BarcodeScanner;
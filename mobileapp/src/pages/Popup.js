// Popup.js
import React from "react";
import "./Popup.css"; // Import the CSS file for styling

const Popup = ({ onClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <h6 className="popup-title">Publish a New Product</h6>
                {/* Content of the popup */}
                {/* You can place your PublishNewProduct component or any other content here */}
                <div className="popup-buttons">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Close
                    </button>
                    {/* You can add more buttons as needed */}
                </div>
            </div>
        </div>
    );
};

export default Popup;

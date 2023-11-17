import React, { useState } from "react";
import "./PublishNewProduct.css";

const PublishNewProduct = () => {
    const [activeSection, setActiveSection] = useState("publishnewproduct");

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="container">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"></link>
            
        </div>
    );
};

export default PublishNewProduct;
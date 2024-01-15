import React, { useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../context/authContext";
import "./Menu.css";

// Menu component
const Menu = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const hidePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-100 sticky-bottom">
      <div className="d-flex justify-content-around w-100" style={{ backgroundColor: '#C9FFFF', border: '3.5px solid #acf9f9' }}>

        <Link to="/app/home" style={{ color: location.pathname === '/app/home' ? 'teal' : '#555' }}>
          <FontAwesomeIcon icon={faHome} className="p-2" style={{ width: '26px', height: '26px' }} />
        </Link>
        <div onClick={togglePopup}>
          <FontAwesomeIcon icon={faPlus} className="p-2" style={{ color: (location.pathname === '/app/postproduct' || location.pathname === '/app/postrecipe') ? 'teal' : '#555', width: '26px', height: '26px' }} />
        </div>
        <Link to="/app/search" style={{ color: location.pathname === '/app/search' ? 'teal' : '#555' }}>
          <FontAwesomeIcon icon={faSearch} className="p-2" style={{ width: '26px', height: '26px' }} />
        </Link>
        <Link to="/app/profile" style={{ color: location.pathname === '/app/profile' ? 'teal' : '#555' }}>
          <FontAwesomeIcon icon={faUser} className="p-2" style={{ width: '26px', height: '26px' }} />
        </Link>
      </div>

      <Modal show={showPopup} onHide={hidePopup} centered animation="slide-up">
        <Modal.Header closeButton>
          <h4 style={{ marginBottom: '-10px', marginLeft: '30px', marginTop: '10px', textAlign: 'center', fontSize: '30px' }}
            classname="post-popup-text">What do you want to post?</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around">
            <Link to="/app/postproduct">
              <Button style={{ padding: '15px 15px', fontSize: '20px', backgroundColor: 'teal', color: 'white', border: 'none' }}
                variant="primary" onClick={hidePopup}>New product</Button>
            </Link>
            {currentUser && currentUser.premium === 1 ? (
              <Link to="/app/postrecipe">
                <Button style={{ padding: '15px 15px', fontSize: '20px', backgroundColor: 'teal', color: 'white', border: 'none' }}
                  variant="primary" onClick={hidePopup}>New recipe</Button>
              </Link>
            ) : (
              <div>
                <Button style={{ padding: '15px 15px', fontSize: '20px', backgroundColor: 'lightgray', color: 'white', border: 'none' }}
                  variant="primary" disabled>New recipe</Button>
                <p style={{ textAlign: 'center', fontSize: '16px', color: 'red', marginTop: '5px' }}>Requires Premium account</p>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
      
    </div>
  );
};

// Exporting Menu component
export default Menu;

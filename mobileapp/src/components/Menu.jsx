import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import "./Menu.css";

const Menu = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const hidePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-100 sticky-bottom">
      <div className="d-flex justify-content-around w-100" style={{ backgroundColor: '#C9FFFF', border: '1px solid #acf9f9' }}>
        <Link to="/app/home">
          <FontAwesomeIcon icon={faHome} className="p-2" style={{ color: '#555', width: '26px', height: '26px' }} />
        </Link>
        <div onClick={togglePopup}>
          <FontAwesomeIcon icon={faPlus} className="p-2" style={{ color: '#555', width: '26px', height: '26px' }} />
        </div>
        <Link to="/app/search">
          <FontAwesomeIcon icon={faSearch} className="p-2" style={{ color: '#555', width: '26px', height: '26px' }} />
        </Link>
        <Link to="/app/profile">
          <FontAwesomeIcon icon={faUser} className="p-2" style={{ color: '#555', width: '26px', height: '26px' }} />
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
            <Link to="/app/postrecipe">
              <Button style={{ padding: '15px 15px', fontSize: '20px', backgroundColor: 'teal', color: 'white', border: 'none' }}
                      variant="primary" onClick={hidePopup}>New recipe</Button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Menu;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./EditPerfil.css";
import User from "../img/user.jpeg";

const EditPerfil = () => {

    return (
        <div className="container">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />
            <div className="box_arrow">
                <button className="btn1 bg-dark">
                    <span className="go_back">Go Back</span>
                    <span className="arrow"><FontAwesomeIcon icon={faArrowLeft} /></span>
                </button>
            </div>
            <div>
                <img className="img_user" src={User} alt="User" />
            </div>
            <div className="form1">
                <form>
                    <div class="form-group mb-3">
                        <label for="username">Username </label>
                        <input type="text" class="form-control" id="username" placeholder="Enter Your Username" />

                    </div>
                    <div class="form-group mb-3">
                        <label for="email">Email Address</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter Your Email Address" />
                            
                    </div>
                    <div class="form-group mb-3">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter Your Name" />
                    </div>
                    <div class="form-group mb-3">
                        <label for="pass">Password</label>
                        <input type="password" class="form-control" id="pass" placeholder="Enter Your Password" />
                    </div>
                    <div class="form-group form-check mb-3">
                        <input type="checkbox" class="form-check-input" id="check" />
                        <label class="form-check-label" for="check">Check me out</label>
                    </div>

                    <button type="submit" class="btn btn-success">Send</button>
                </form>
            </div>
            

        </div>
    
    );
};

export default EditPerfil;

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
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            

        </div>
    
    );
};

export default EditPerfil;

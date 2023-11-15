import React from "react";
import Logo from "../img/logo.png";
import { Link } from 'react-router-dom';
import BackgroundImg from "../img/clearbackground.png";

const SplashScreen = () => {
    return (
        <div className="container" style={{ backgroundImage: `url(${BackgroundImg})` }}>
            <div className="d-flex flex-column justify-content-center">
                <div className="p-2 bd-highlight align-self-center"><h1>Welcome to Happy Tummy</h1></div>
                <div className="p-2 bd-highlight align-self-center"><img src={Logo} className="img-fluid"/></div>
                <div className="p-2 bd-highlight align-self-center">
                    <p>
                        Scan your product to find out if it contains any allergens that you may
                        be allergic to.
                    </p>
                </div>
            </div>

            <div>
                {/* do a div with 2 buttons for register and login with navigation to those pages */}
                <div className="d-flex flex-column justify-content-center ht-bg-color">
                    <div className="p-2 bd-highlight align-self-center">
                        <Link to={"/login"}>
                            <button className="btn btn-primary">Login</button>
                        </Link>  
                    </div>
                    <div className="p-2 bd-highlight align-self-center">
                        <Link to={"/register"}>
                            <button className="btn btn-primary">Register</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
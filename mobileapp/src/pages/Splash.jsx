import React from "react";
import Logo from "../img/logo.png";

const SplashScreen = () => {
    return (
        <div className="container">
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
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <div className="p-2 bd-highlight align-self-center">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
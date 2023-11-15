import React from "react";
import Teal from "../img/teal.png";
import Profilepic from "../img/profile.png";
import Edit from "../img/edit.png";
import './Profile.css';
import backgroundImage from "../img/clearbackground.png";

function Profile() {


    return (
        <div className="profile_content">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>

            <div className="profile_card">
                <img className="profilepic" src={Profilepic} alt="" />
                <h4 className="username">Ruben24</h4>
                <div class="alert alert-warning" role="alert">
                    Go premium!
                </div>
                <img className="edit" src={Edit} alt="" />
            </div>

            <h4 className="maintitles">My products</h4>
            <div class="card-deck">
                <div class="card">
                    <img class="card-img-top" src=".../100px200/" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src=".../100px200/" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>

            <h4 className="maintitles">My recipes</h4>
            <div class="card-deck">
                <div class="card">
                    <img class="card-img-top" src=".../100px200/" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src=".../100px200/" alt="Card image cap" />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;

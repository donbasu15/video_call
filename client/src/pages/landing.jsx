import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Apna Video Call</h2>
        </div>
        <div className="navlist">
          <p>Join as Guest</p>
          <p>Register</p>
          <div role="button">
            <p>Login</p>
          </div>
        </div>
      </nav>
      <div className="landingMainContainer">
        <div className="main-message">
          <h1>
            <span style={{ color: "#FF9" }}>Connect</span> with your loved ones.
          </h1>
          <p>Cover a distance by apna video call.</p>
          <button>
            <Link to={"/auth"}>Get Started</Link>
          </button>
        </div>
        <div className="mobile-img">
          <img src="/mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
}

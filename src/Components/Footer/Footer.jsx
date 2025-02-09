import React from 'react'
import './Footer.css'
import carTradeTech from "../../assets/cartrade_tech.svg";
import olx from "../../assets/olx.svg";
import carWale from "../../assets/carwale.svg";
import bikeWale from "../../assets/bikewale.svg";
import carTrade from "../../assets/cartrade.svg";
import mobility from "../../assets/mobility.svg";
import googleplay from "../../assets/googleplay.jpg";
import appstore from "../../assets/appstore.jpg";


const Footer = () => {
  return (
    <div className="footer">
            <div className="footer-top">
                <div className="footer-column">
                    <h3 className="footer-heading">POPULAR LOCATIONS</h3>
                    <ul className="footer-list">
                        <li>Kolkata</li>
                        <li>Mumbai</li>
                        <li>Chennai</li>
                        <li>Pune</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-heading">TRENDING LOCATIONS</h3>
                    <ul className="footer-list">
                        <li>Bhubaneshwar</li>
                        <li>Hyderabad</li>
                        <li>Chandigarh</li>
                        <li>Nashik</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-heading">ABOUT US</h3>
                    <ul className="footer-list">
                        <li>Tech@OLX</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-heading">OLX</h3>
                    <ul className="footer-list">
                        <li>Blog</li>
                        <li>Help</li>
                        <li>Sitemap</li>
                        <li>Legal & Privacy information</li>
                        <li>Vulnerability Disclosure Program</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-heading">FOLLOW US</h3>
                    <div className="social-icons">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fas fa-play-circle"></i>
                    </div>
                    <div className="app-buttons">
                        <img src={googleplay} alt="Google Play" />
                        <img src={appstore} alt="App Store" />
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-brands">
                    <img className="car-trade-tech" src={carTradeTech} alt="CarTradeTech" />
                    <img src={olx} alt="OLX" />
                    <img src={carWale} alt="CarWale" />
                    <img src={bikeWale} alt="BikeWale" />
                    <img src={carTrade} alt="CarTrade" />
                    <img src={mobility} alt="Mobility Outlook" />
                </div>
                <div className="footer-info">
                    <p>Help - Sitemap</p>
                    <p>All rights reserved © 2006-2024 OLX</p>
                </div>
            </div>
        </div>
  );
};

export default Footer

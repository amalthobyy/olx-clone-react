import React from 'react'
import './Detail.css';
import { FaShareAlt, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Detail = ({ ad }) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
      };

  return (
    <div className="item-detail-container">
         <button className="back-button-inside-image" onClick={handleBack}>
                ← Back
            </button>
        
      <div className="item-detail-wrapper">
      <div className="item-image-container">
            {/* Back Button */}
           
            
            {/* Image */}
            <img
                src={ad.imageUrl || "https://via.placeholder.com/600x400"}
                alt={ad.title || "Product"}
                className="item-image"
            />
            </div>


        {/* Right: Item Info */}
        <div className="item-info-container">
          {/* Price and Share Icons */}
          <div className="item-price-share">
            <h1 className="item-price">₹ {ad.price || "N/A"}</h1>
            <div className="icons-container">
              <FaShareAlt className="icon" title="Share" />
              <FaHeart className="icon" title="Like" />
            </div>
          </div>

          {/* Item Details */}
          <div className="item-details">
            <div className="item-title">
              {<h2 className="title">{ad.title} </h2>|| "N/A"} - {ad.description || "N/A"}
            </div>
            <p className="item-category">
              <strong>Category:</strong> {ad.category || "N/A"}
            </p>
            <p className="item-location">
              <strong>Location:</strong> {ad.city || "N/A"}
            </p>
          </div>

          {/* Seller Information */}
          <div className="seller-details">
            <h2>Seller Information</h2>
            <p className="seller-name">
                <strong>Name:</strong> {ad.name || "N/A"} <br />
            </p>
            <p className="seller-phone">
                <strong>Phone:</strong> {ad.phone || "N/A"} <br />
            </p>
            </div>



          {/* Action Button */}
          <button className="make-deal-button">MAKE THE DEAL</button>
        </div>
      </div>
    </div>
  );
};

export default Detail

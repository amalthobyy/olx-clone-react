import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Regular heart
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Solid heart

const AdCard = ({ id, imageUrl, price, title, city, createdAt }) => {
  return (
    <div className="card">
      <Link to={`/detail-page/${id}`}>
        <img
          src={imageUrl || 'https://via.placeholder.com/300x200'}
          alt={title}
          className="card-image"
        />
      </Link>
      <div className="like-icon">
        <FontAwesomeIcon icon={regularHeart} size="lg" />  {/* Regular (outlined) heart */}
      </div>
      <div className="card-content">
        <h2 className="card-price">₹ {price}</h2>
        <h3 className="card-title">{title}</h3>
        <div className="card-details">
          <p>
            <strong>Location:</strong> {city}
          </p>
        </div>
        <div className="card-footer">
          <p>
            <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdCard;

import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search from '../../assets/search-button.jpg';
import comment from '../../assets/comment-1.png';
import bell from '../../assets/bellicon.png';
import profile from '../../assets/profile-1.png';
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../useAuth';

const Navbar = () => {
  const { user, loading } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  // Fix: Ensure the function is properly declared and used
  const handleAddItem = () => { 
    navigate("/add-item"); 
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="location">
          <input className="black-border" type="text" placeholder="India" />
        </div>
        <div className="search">
          <input
            className="black-border"
            type="text"
            placeholder="Find Cars, Mobile Phones and more..."
          />
          <button className="btn">
            <img src={search} alt="Search" />
          </button>
        </div>
        <div className="nav-right">
          <h3>English</h3>
          <img className="comment" src={comment} alt="Comment" />
          <img className="bell" src={bell} alt="Bell" />
          <div className="profile-container">
            <img className="profile" src={profile} alt="Profile" />
            <div className="dropdown">
                {user ? (
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
                ) : (
                <button onClick={() => navigate("/login")} className="logout-btn">
                  Login
                </button>
              )}
            </div>
          </div>
          <div className="sell">
            <div className="selbtn">
              {/* Fix: Use the correctly named function */}
              <p onClick={handleAddItem}>
                <i className="fa-solid fa-plus"></i>SELL
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="under"></div>
    </div>
  );
};

export default Navbar;


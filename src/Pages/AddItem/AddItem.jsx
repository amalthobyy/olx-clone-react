import React ,{ useEffect }from 'react';
import AdDetails from '../../Components/AdDetails/AdDetails';
import './AddItem.css'
import useAuth from '../../useAuth.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const AddItem = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Login to Sell Product");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleAdSubmit = (adDetails, imageUrl) => {
    if (!adDetails || !imageUrl) {
      toast.error("Ad details or image URL is missing.");
      return;
    }

    console.log("Ad Submitted:", adDetails);
    console.log("Image URL:", imageUrl);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  

  if (!user) {
    return null;
  }

  return (
    <div className="post-ad-page">
      <h1 className="post-ad-title">POST YOUR AD</h1>
      <AdDetails onSubmit={handleAdSubmit} />
    </div>
  );
};

export default AddItem;

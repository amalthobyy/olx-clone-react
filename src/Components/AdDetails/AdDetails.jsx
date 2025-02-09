import React,{useState} from 'react'
import './AdDetails.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { addDataToCollection } from '../../firebase';
import { toast } from 'react-toastify';

const AdDetails = ({onSubmit}) => {

    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false); // Track upload state  
    const [errors, setErrors] = useState({});
    const [adDetails, setAdDetails] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        city: '',
        name: '',
        phone: '',
    });
  console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  console.log(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);


  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true); 
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      try {
        const url = await uploadImageToCloudinary(file);
        setImageUrl(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      throw new Error('Image upload failed');
    }
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    if (!adDetails.title) validationErrors.title = "Title is required";
    if (!adDetails.category) validationErrors.category = "Category is required";
    if (!adDetails.price) validationErrors.price = "Price is required";
    if (!adDetails.name) validationErrors.name = "Name is required";
    if (!adDetails.phone) validationErrors.phone = "Phone number is required";
    if (!imageUrl && !uploading) validationErrors.imageUrl = "Image is required";
    
  
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (uploading) {
      setErrors({ ...errors, imageUrl: "Image upload in progress, please wait." });
      return;
    }
  
    if (validateForm()) {
      try {
        // Combine ad details with the image URL
        const adData = {
          ...adDetails,
          imageUrl,
          createdAt: new Date().toISOString(),
        };
  
        // Save to Firebase
        await addDataToCollection('ads', adData);
  
        // Redirect or show success message
        toast.success('Ad successfully submitted!');
        navigate("/");
      } catch (error) {
        console.error('Error submitting ad:', error);
        toast.error('Failed to submit ad.');
      }
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };






  return (
    <div className="ad-details-wrapper">
      <button className="back-button-inside-image" onClick={handleBack}>
                ← Back
            </button>
      <div className="ad-details-container">
        <form onSubmit={handleSubmit}>
          {/* Category */}
          <div className="ad-form-section">
            <label>Category</label>
            <select
              className="ad-form-select half-width"
              value={adDetails.category}
              onChange={(e) => setAdDetails({ ...adDetails, category: e.target.value })}
            >
              <option value="">Select a Category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="real-estate">Real Estate</option>
              <option value="vehicles">Vehicles</option>
            </select>
            {errors.category && <p className="error">{errors.category}</p>}
          </div>

          {/* Ad Title */}
          <div className="ad-form-section">
            <label>Ad Title</label>
            <input
              type="text"
              value={adDetails.title}
              onChange={(e) => setAdDetails({ ...adDetails, title: e.target.value })}
              placeholder="Enter your ad title"
              className="ad-form-input half-width"
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="ad-form-section">
            <label>Description</label>
            <textarea
              value={adDetails.description}
              onChange={(e) => setAdDetails({ ...adDetails, description: e.target.value })}
              placeholder="Enter a detailed description"
              className="ad-form-textarea full-width"
            />
            {errors.description && <p className="error">{errors.description}</p>}
          </div>

          {/* Price */}
          <div className="ad-form-section">
            <label>Price</label>
            <input
              type="number"
              value={adDetails.price}
              onChange={(e) => setAdDetails({ ...adDetails, price: e.target.value })}
              placeholder="Enter price"
              className="ad-form-input half-width"
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>

          {/* City */}
          <div className="ad-form-section">
            <label>City</label>
            <input
              type="text"
              value={adDetails.city}
              onChange={(e) => setAdDetails({ ...adDetails, city: e.target.value })}
              placeholder="Enter your city"
              className="ad-form-input half-width"
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>

          {/* Name */}
          <div className="ad-form-section">
            <label>Name</label>
            <input
              type="text"
              value={adDetails.name}
              onChange={(e) => setAdDetails({ ...adDetails, name: e.target.value })}
              placeholder="Enter your name"
              className="ad-form-input half-width"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="ad-form-section">
            <label>Phone</label>
            <input
              type="text"
              value={adDetails.phone}
              onChange={(e) => setAdDetails({ ...adDetails, phone: e.target.value })}
              placeholder="Enter your phone number"
              className="ad-form-input half-width"
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          {/* Image Upload */}
          <div className="ad-form-section">
            <label>Upload Photo</label>
            <div className="image-upload-wrapper">
              <label htmlFor="imageInput" className="image-upload-icon">
                +
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="hidden-file-input"
                onChange={handleImageChange}
              />
            </div>
            {uploading && <p>Uploading...</p>}
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                />
              </div>
            )}
            {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
            
          </div>
          <button type="submit" className="submit" disabled={uploading}>
            {uploading ? "Uploading Image..." : "Submit Ad"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdDetails;

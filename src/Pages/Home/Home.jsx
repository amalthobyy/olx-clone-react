import React,{useState, useEffect} from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { getAdsFromCollection } from '../../firebase'
import AdCard from '../../Components/Card/Card'

const Home = () => {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsData = await getAdsFromCollection();
        setAds(adsData);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []); 

  return (
    <div className="home">
      <Navbar />
      <div className="body">
        <div className="recommendations-container">
          <h2 className="recommendations-title">Fresh Recommendations</h2>
          <div className="card-wrapper">
            {ads.length === 0 ? (
              <p>Loading ads...</p> // Show loading text or spinner if no ads
            ) : (
              ads.map((ad) => (
                <AdCard
                  key={ad.id}
                  id={ad.id}
                  imageUrl={ad.imageUrl}
                  price={ad.price}
                  title={ad.title}
                  city={ad.city}
                  createdAt={ad.createdAt}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

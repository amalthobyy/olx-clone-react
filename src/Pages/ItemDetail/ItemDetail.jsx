import React,{useEffect,useState} from 'react'
import './ItemDetail.css';
import { useNavigate,useParams } from 'react-router-dom';
import { getAdById } from '../../firebase';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Detail from '../../Components/Detail/Detail';


const ItemDetail = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [ad, setAd] = useState(null)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const productData = await getAdById(id); 
          setProduct(productData);
          setAd(productData);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProduct();
    }, [id]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!product) {
      return <div>Product not found!</div>;
    }
     






  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-grow">
    {ad ? <Detail ad={ad} /> : <p>Ad not found!</p>}
    </div>
    <Footer />
</div>
  );
};

export default ItemDetail;

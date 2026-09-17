import { FaLeaf } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bg from "../assets/background.jpg";
import rice from "../assets/riceImg.jpg";
import wheat from "../assets/wheat.jpg";
import corn from  "../assets/cornImg.jpg";
import seeds from  "../assets/seeds.jpg";
import vegetables from  "../assets/vegetables.jpg";
import about from  "../assets/about.png";


export default function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <div
        className="hero"
        style={{
          backgroundImage: `url(${bg})`,
          
        }}
      >

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span>AgriTradeHub</span>
          </h1>
          
           <p>
            A platform where farmers sell crops directly to merchants
            without middlemen.
          </p>

          <Link to="/posts">
            <button className="hero-btn">View Products</button>
          </Link>
           
           <div className="glass-cards">

  <div className="glass-card">
    <div className="card-row">
      <div className="icon-circle">
        <FaLeaf />
      </div>
      <div className="text">
        <h3>Direct Selling</h3>
        <p>Farmers sell directly without middlemen</p>
      </div>
    </div>
  </div>

  <div className="glass-card">
    <div className="card-row">
      <div className="icon-circle">
        <FaRupeeSign />
      </div>
      <div className="text">
        <h3>Fair Pricing</h3>
        <p>Transparent and best price system</p>
      </div>
    </div>
  </div>

  <div className="glass-card">
    <div className="card-row">
      <div className="icon-circle">
        <FaCheckCircle />
      </div>
      <div className="text">
        <h3>Quality</h3>
        <p>Fresh and high quality crops</p>
      </div>
    </div>
  </div>

  <div className="glass-card">
    <div className="card-row">
      <div className="icon-circle">
        <FaChartLine />
      </div>
      <div className="text">
        <h3>Growth</h3>
        <p>Better growth for farmers & merchants</p>
      </div>
    </div>
  </div>

</div>
        </div>
      </div>

      <section className="features">
        <div className="feature-box">
          <span className="icon">🚜</span>
          <h3>Direct from Farmers</h3>
          <p>No middlemen, pure farm produce</p>
        </div>

        <div className="feature-box">
          <span className="icon">💰</span>
          <h3>Best Prices</h3>
           <p>Fair pricing for farmers and buyers</p>
        </div>

        <div className="feature-box">
          <span className="icon">🚚</span>
          <h3>Fast Delivery</h3>
          <p>Quick and reliable transport</p>
        </div>
      </section>

      <section className="agri-card-section">
        <h2>Featured Crops</h2>

        <div className="agri-card-container">
          
          <Link to="/crops/rice">
          <div className="agri-card">
            <img src={rice} alt="Rice" className="agri-card-image"/>
            <h3>Rice</h3>
            <p>From farm to your home - pure & fresh</p>
          </div>
          </Link>

          <Link to="/crops/wheat">
          <div className="agri-card">
            <img src={wheat} alt="Wheat" className="agri-card-image"/>
            <h3>Wheat</h3>
            <p>High yeild wheat,best for every season</p>
          </div>
          </Link>

          <Link to="/crops/corn">
          <div className="agri-card">
            <img src={corn} alt="Wheat" className="agri-card-image"/>
            <h3>Corn</h3>
            <p>Healthy Grain</p>
          </div>
          </Link>

          <Link to="/crops/seeds">
          <div className="agri-card">
            <img src={seeds} alt="Wheat" className="agri-card-image"/>
            <h3>Seeds</h3>
            <p>Start strong with High quality seeds</p>
          </div>
          </Link>

          <Link to="/crops/vegetables">
          <div className="agri-card">
            <img src={vegetables} alt="Wheat" className="agri-card-image"/>
            <h3>Vegetables</h3>
            <p>Healthy,organic & full of nutrition</p>
          </div>
          </Link>
        </div>
      </section>

      <section className="about">
        <div className="about-container">
          <div className="about-image">
            <img src={about} alt="Farmer and Merchant"/>
          </div>
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              AgriTradeHub is a platform that connects farmers directly with buyers, eliminating middlemen and ensuring fair prices. 
              <br></br>
              <br></br>
              We aim to empower farmers by giving them better market access while providing buyers with fresh and high-quality crops. Our goal is to build a transparent, efficient, and reliable agricultural marketplace.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Start Trading Today</h2>
        <Link to="/posts">
            <button className="hero-btn">Explore Products</button>
        </Link>
      </section>

    
      
    </div>
  );
}
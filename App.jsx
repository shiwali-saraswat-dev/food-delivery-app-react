// Importing React from node-modules (installed via npm) instead of using a CDN <script> link
import React from "react";

// Importing ReactDOM from node-modules (installed via npm) instead of using a CDN <script> link
// ReactDOM is responsible for rendering React components into the actual DOM
import ReactDOM from "react-dom/client";

// Import component-specific styles for the Header component
import "./Style.css";

// Import the user icon image as a module; 
// bundlers(Parcel/Vite) resolve this to a usable URL pointing to the final bundled asset
import userIcon from "./assets/user-icon.png";

/**
 * 
 * Header
 * - Logo
 * // - Search Bar
 * - Nav Items
 * //- User Icon
 * 
 * Body
 * - Search
 * - Restaurant Container
 *  - Restaurant Card
 *  - Dish Name
 *  - Image
 *  - Restaurant Name
 *  - Rating
 *  - Cuisines
 *  - Time to Deliver
 * - Adds

 * Footer
 * - Copyright
 * - Links
 * - Address
 * - Contact 
 *
 */

const Header = () => {
    return(
        <div className="header">
            <div className="logo-container">
                <img className="logo" src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png" height="100" style={{ marginBottom: 20 }} />
            </div>

            {/* <div className="search-bar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Search..." />
            </div> */}

            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
            </div>

            {/* <div className="user">
                <img src={userIcon} alt="User" className="user-icon" />
            </div> */}
        </div>
    )
};

const styleCard = {
    backgroundColor: "#fff"
};

const RestaurantCard = (props) => {
    console.log("props: ", props);
    return (
        <div className="res-card" style={styleCard}>
            <img className="res-logo" src="https://b.zmtcdn.com/data/o2_assets/bf2d0e73add1c206aeeb9fec762438111727708719.png" alt="res-logo" />
            <h3>Punjabi Angithi</h3>
            <p>Dum Biryani</p>
            <h4>₹250 for one</h4>
            <h4><span>4.7</span> Stars</h4>
            <h4>45 minutes</h4>
        </div>
    )
};

const Body = () => {
    return (
        <div className="body">
            <div className="search"></div>
            <div className="res-container">
                <h1>Restaurants</h1>
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
            </div>
            <div className="adds"></div>
        </div>
    );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h4>Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Cart</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Address</h4>
          <p>
            123 Food Street, <br />
            Connaught Place, <br />
            New Delhi, India - 110001
          </p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            Email: support@fooddelivery.com <br />
            Phone: +91 98765 43210
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; 2026 Food Delivery App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Body />
            <Footer />
        </div>
    );
};

// Create a React root attached to the DOM element with id "root".
// This root serves as the entry point where the React component tree will be rendered into the actual DOM.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the parent component: AppLayout, which internally renders everything
root.render(<AppLayout />);
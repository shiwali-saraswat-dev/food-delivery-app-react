// Importing React from node-modules (installed via npm) instead of using a CDN <script> link
import React from "react";

// Importing ReactDOM from node-modules (installed via npm) instead of using a CDN <script> link
// ReactDOM is responsible for rendering React components into the actual DOM
import ReactDOM from "react-dom/client";

// Import component-specific styles for the Header component
import "./Style.css";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

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
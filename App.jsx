// Importing React from node_modules (installed via npm) instead of using a CDN <script> link
import React from "react";

// Importing ReactDOM from node_modules (installed via npm) instead of using a CDN <script> link
// ReactDOM is responsible for rendering React components into the actual DOM
import ReactDOM from "react-dom/client";

// Import component-specific styles for the Header component
import "./Style.css";

/**
 * 
 * Header
 * - Logo
 * - Nav Items
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

 * Footer
 * - Copyright
 * - Links
 * - Address
 * - Contact 
 *
 */

const AppComponent = () => (
  <header>
    <h1 id="app_heading">Food Delivery App</h1>
  </header>
);

// Create a React root attached to the DOM element with id "root".
// This root serves as the entry point where the React component tree will be rendered into the actual DOM.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the parent component: AppComponent, which internally renders everything
root.render(<AppComponent />);
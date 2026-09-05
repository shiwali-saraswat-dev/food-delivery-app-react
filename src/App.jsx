// Importing React from node-modules (installed via npm) instead of using a CDN <script> link
import React from "react";

// Importing ReactDOM from node-modules (installed via npm) instead of using a CDN <script> link
// ReactDOM is responsible for rendering React components into the actual DOM
import ReactDOM from "react-dom/client";

// createBrowserRouter  — creates the route config using the HTML5 History API (clean URLs, no hash)
// RouterProvider       — renders the router into the React tree, replaces the old <BrowserRouter> wrapper
// Outlet               — placeholder that renders the matched child route's component in the parent layout
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

// Import component-specific styles for the Header component
import "./Style.css";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";

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

// AppLayout — shared layout component that wraps every page
// Header and Footer render on all routes; Outlet swaps in the matched child route
const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet /> {/* matched child route renders here — Body / About / Contact */}
            <Footer />
        </div>
    );
};

// Define all application routes using the HTML5 History API
// AppLayout is the root layout — all child routes render inside its <Outlet />
// errorElement catches any unmatched route or render error and shows the Error page
// basename scopes all routes under the /food-delivery-app-react subdirectory (GitHub Pages)
const appRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <AppLayout />,   // persistent shell: Header + Outlet + Footer
            children: [
                {
                    path: "/",        // home — renders Body inside Outlet
                    element: <Body />,
                },
                {
                    path: "/about",   // /food-delivery-app-react/about
                    element: <About />,
                },
                {
                    path: "/contact", // /food-delivery-app-react/contact
                    element: <Contact />,
                }
            ],
            errorElement: <Error />,  // shown on 404 or any route-level error
        },
        
    ],
    { basename: "/food-delivery-app-react" } // base path for GitHub Pages deployment
);

// Create a React root attached to the DOM element with id "root".
// This root serves as the entry point where the React component tree will be rendered into the actual DOM.
// Mount the React app — find the #root div in index.html and hand it to React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the parent component: AppLayout, which internally renders everything
// root.render(<AppLayout />);

// RouterProvider replaces the old root.render(<AppLayout />) approach —
// it injects the router context so every component in the tree can access 
// navigation, params, and location via React Router hooks
root.render(<RouterProvider router={appRouter} />);
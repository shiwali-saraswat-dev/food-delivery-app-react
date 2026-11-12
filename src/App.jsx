// Importing React from node-modules (installed via npm) instead of using a CDN <script> link
// lazy -> React.lazy: loads a component's code only when it is first rendered
import React, { lazy, Suspense } from "react";

// Importing ReactDOM from node-modules (installed via npm) instead of using a CDN <script> link
// ReactDOM is responsible for rendering React components into the actual DOM
import ReactDOM from "react-dom/client";

// createBrowserRouter  — creates the route config using the HTML5 History API (clean URLs, no hash)
// RouterProvider       — renders the router into the React tree, replaces the old <BrowserRouter> wrapper
// Outlet               — placeholder that renders the matched child route's component in the parent layout
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

// Import component-specific styles for the Header component
import "./Style.css";

/*
 * NOT lazy on purpose: Body (home), Header, Footer, ErrorPage, Shimmer.
 * The user sees them on first load, so lazy loading them would only add
 * an extra request and a loading flash.
 */
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Error from "./components/Error";
import { OfflineBanner } from "./components/OfflineIndicator";
import Cart from "./components/Cart";

// Provider: makes the Redux store available to every component in the app
import { Provider } from "react-redux";
// appStore: the configured Redux store (holds the cart state)
import appStore from "./utils/appStore";

// Profile page: rarely visited -> separate chunk
const Profile = lazy(() => import('./components/Profile'));
// About page: rarely visited -> separate chunk, downloaded on first visit to /about
const About = lazy(() => import('./components/About'));
// Contact page: rarely visited -> separate chunk, downloaded on first visit to /contact
const Contact = lazy(() => import('./components/Contact'));
// Category page: reached only after clicking a category chip -> separate chunk
const CategoryRestaurant = lazy(() => import('./components/CategoryRestaurant'));
// Restaurant detail page: the largest page (menu, accordions) -> biggest saving
const RestaurantMenu = lazy(() => import('./components/RestaurantMenu'));

/**
 * 
 * Header
 * - Logo
 * - Offline Badge
 * - Nav Items
 * - Cart
 * - Login / Logout - user_email
 * 
 * Body
 * - Search
 * - Offline Banner
 * - Category Listing
 *   - Categorywise Restaurants Listing
 * - Restaurant Container
 *  - Restaurant Card
 *  - Dish Name
 *  - Image
 *  - Restaurant Name
 *  - Rating
 *  - Cuisines
 *  - Time to Deliver
 *  - Promoted label
 * - Restaurant Detail Page
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
        <Provider store={ appStore }>
            <div className="app">
                <Header />
                <OfflineBanner />
                <Outlet /> {/* matched child route renders here — Body / About / Contact */}
                <Footer />
            </div>
        </Provider>
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
                    // Home page: /food-delivery-app-react/
                    // Body is imported normally (eager) because it is the first thing the user sees, so lazy loading it would only add a loading flash.
                    path: "/",        // home — renders Body inside Outlet
                    element: <Body />,
                },
                {
                    // Profile page: /food-delivery-app-react/profile
                    path: "/profile",
                    element:  (
                        <Suspense fallback={<div>Loading data...</div>}>
                            <Profile />
                        </Suspense>
                    ),
                },
                {
                    // About page: /food-delivery-app-react/about
                    // About is a lazy component (React.lazy), so its JS chunk downloads on the first visit. 
                    // <Suspense> is REQUIRED around every lazy component: while the chunk downloads it shows `fallback`, then swaps in <About />.
                    path: "/about",
                    element: (
                        <Suspense fallback={<div>Loading data...</div>}>
                            <About />
                        </Suspense>
                    ),
                },
                {
                    // Contact page: /food-delivery-app-react/contact
                    // Same pattern: lazy chunk + Suspense fallback.
                    path: "/contact",
                    element:  (
                        <Suspense fallback={<div>Loading data...</div>}>
                            <Contact />
                        </Suspense>
                    ),
                },
                {
                    // Category page: /food-delivery-app-react/category/123
                    // ":catId" is a DYNAMIC segment: any value is captured and the page
                    // reads it with useParams() -> { catId: "123" }.
                    path: "/category/:catId",
                    element: (
                        <Suspense fallback={<div>Loading data...</div>}>
                            <CategoryRestaurant />
                        </Suspense>
                    ),
                },
                {
                    // Restaurant detail page: /food-delivery-app-react/restaurant/123
                    // ":resId" is a dynamic segment too, read with useParams() -> { resId: "123" }.
                    // Largest page (menu, accordions), so it benefits most from lazy loading.
                    path: "/restaurant/:resId",
                    element: (
                        <Suspense fallback={<div>Loading data...</div>}>
                            <RestaurantMenu />
                        </Suspense>
                    ),
                },
                {
                    // Cart page: /food-delivery-app-react/cart
                    path: "/cart",
                    element: <Cart />,
                }
            ],
            // errorElement is shown when:
            //   - the URL matches no route (404), or
            //   - a component under this route throws an error while rendering.
            // It replaces the whole AppLayout, so the Error page appears without Header/Footer.
            errorElement: <Error />,
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
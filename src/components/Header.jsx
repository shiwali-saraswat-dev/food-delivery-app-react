import { useState, useEffect, useContext } from "react";
import { LOGO_URL } from "../utils/constants.js"; // Import the app logo URL from the centralized constants file
// NavLink — like <Link> but adds "active" class automatically when its route matches the current URL
import { NavLink } from "react-router";
import { OfflineBadge } from "./OfflineIndicator";
import UserContext from "../utils/UserContext.js";
// useSelector: subscribes this component to the Redux store and re-renders it when the selected data changes
import { useSelector } from "react-redux";

const Header = () => {
    // One boolean decides everything: false = Login button, true = username + dropdown.
    // (Later, move this into Context/Redux so other components can read it too.)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // LoggedIn User
    const userInfo = useContext(UserContext);

    // Subscribing to the store using a Selector
    const cartItems = useSelector((store) => store.cart.items);
    // console.log("header - cartItems: ", cartItems);

    // Total quantity across all rows (items without qty count as 1)
    const totalQty = cartItems.reduce((sum, item) => sum + (item.qty ?? 1), 0);

    // Only listens for Escape while the menu is actually open.
    // (This uses useEffect, not useRef — if you haven't covered
    // useEffect yet either, you can safely delete this whole block;
    // the backdrop click below is enough to close the menu.)
    useEffect(() => {
        if (!isUserMenuOpen) return;

        const closeOnEscape = (e) => {
            if (e.key === "Escape") setIsUserMenuOpen(false);
        };

        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [isUserMenuOpen]);

    // Login: hide the Login button, show the username
    const handleLogin = () => {
        // TODO: replace with a real login call (API, token, context update)
        setIsLoggedIn(true);
    };

    // Logout: hide the username dropdown, show the Login button
    const handleLogout = () => {
        // TODO: replace with a real logout call (clear token, context update)
        setIsUserMenuOpen(false);   // IMPORTANT: close the menu too, or it reopens on next login
        setIsLoggedIn(false);
    };

    return (
        <div className="header">
            <div className="logo-container">
                <NavLink to="/">
                    <img className="logo" src={LOGO_URL} height="100" style={{ marginBottom: 20 }} />
                </NavLink>
            </div>

            <div className="nav-items">
                <ul>
                    <li><NavLink to="/">Home</NavLink ></li>
                    <li><NavLink to="/about">About Us</NavLink ></li>
                    <li><NavLink to="/contact">Contact Us</NavLink ></li>
                    <li><OfflineBadge /></li>

                    <div className="cart">
                        <div className="cart-badge">{totalQty}</div>
                        <span><NavLink to="/cart">Cart</NavLink ></span>
                    </div>

                    {/* Logged OUT -> show the Login button */}
                    {!isLoggedIn && (
                        <li>
                            <button className="login-new" onClick={handleLogin}>
                                Login
                            </button>
                        </li>
                    )}

                    {/* Logged IN -> show username with dropdown */}
                    {isLoggedIn && (
                        <li className="user-menu">
                            <button
                                className="user-trigger"
                                aria-haspopup="true"
                                aria-expanded={isUserMenuOpen}
                                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    style={{ stroke: "#e6cd26" }}
                                >
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
                                </svg>
                                {/* Plain text now: no extra onClick here, the button already toggles the menu */}
                                <span className="user-name">{ userInfo.user.email }</span>
                            </button>

                            {isUserMenuOpen && (
                                <>
                                    {/* Invisible full-screen layer: clicking outside closes the menu */}
                                    <div
                                        className="dropdown-backdrop"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    />
                                    <div className="dropdown" role="menu" aria-label="Account menu">
                                        <div className="arrow-outer" />
                                        <div className="arrow-inner" />
                                        <NavLink to="/profile" className="dropdown-item" role="menuitem"
                                            onClick={() => setIsUserMenuOpen(false)} // close the dropdown after navigating
                                        >
                                            Profile
                                        </NavLink>
                                        <a href="#" className="dropdown-item" role="menuitem">Orders</a>
                                        <a href="#" className="dropdown-item" role="menuitem"
                                            onClick={(e) => {
                                                e.preventDefault();   // stop "#" from jumping to the page top
                                                handleLogout();
                                            }}
                                        >
                                            Logout
                                        </a>
                                    </div>
                                </>
                            )}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header; // Default export so Header can be imported without curly braces
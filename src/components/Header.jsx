import LOGO_URL from "../utils/constants.js"; // Import the app logo URL from the centralized constants file

const Header = () => {
    return(
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} height="100" style={{ marginBottom: 20 }} />
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

export default Header; // Default export so Header can be imported without curly braces
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

export default Footer; // Default export so Footer can be imported without curly braces
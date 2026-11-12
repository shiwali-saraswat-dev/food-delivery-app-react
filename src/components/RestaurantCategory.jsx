// useDispatch: sends actions to the Redux store
import { useDispatch } from "react-redux";
// addItem: cart action (adds the item, or +1 qty if already in cart)
import { addItem } from "../utils/cartSlice";
// Local fallback images, keyed by item id
import { MOCK_MENU_IMAGES } from "../utils/mockMenuImages.js";

// Base URL for Swiggy menu images (append the item's imageId)
const MENU_IMG_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";

// One accordion category: data = category from API, showItems = open/closed, setShowIndex = toggle from parent
const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const itemCards = data?.itemCards || [];

  const dispatch = useDispatch();

  // Add the clicked item to the Redux cart
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="menu-category">
      {/* Accordion header: click to expand/collapse */}
      <button
        type="button"
        className="menu-category-header"
        onClick={setShowIndex}
        aria-expanded={showItems}
      >
        <span className="menu-category-title">
          {data.title} ({itemCards.length})
        </span>
        <span className={`menu-chevron ${showItems ? "open" : ""}`}>▾</span>
      </button>

      {/* Items are rendered only when the category is open */}
      {showItems && (
        <div className="menu-items">
          {itemCards.map((item) => {
            // Unwrap the Swiggy item shape once; skip malformed items
            const info = item?.card?.info;
            if (!info) return null;

            const price = (info.price ?? info.defaultPrice ?? 0) / 100; // paise -> rupees
            const isVeg = info.isVeg === 1 || info.itemAttribute?.vegClassifier === "VEG";

            // Real Swiggy image first, then the local mock image
            const imgSrc = info.imageId ? MENU_IMG_URL + info.imageId : MOCK_MENU_IMAGES[info.id];

            return (
              <div key={info.id} className="menu-item">
                {/* Left side: veg marker, name, price, description */}
                <div className="menu-item-info">
                  <span className={`veg-mark ${isVeg ? "veg" : "non-veg"}`} />
                  <h3 className="menu-item-name">{info.name}</h3>
                  <p className="menu-item-price">₹{price}</p>
                  {info.description && <p className="menu-item-desc">{info.description}</p>}
                </div>

                {/* Right side: image + ADD button (position: relative lets the button overlap the image) */}
                <div className="menu-item-media">
                  {imgSrc ? (
                    <img className="menu-item-img" src={imgSrc} alt={info.name} />
                  ) : (
                    <div className="menu-item-img menu-item-img--placeholder">🍽️</div> // no image available
                  )}

                  <button type="button" className="add-btn"
                    aria-label={`Add ${info.name} to cart`}
                    onClick={() => handleAddItem(item)}
                  >
                    ADD
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
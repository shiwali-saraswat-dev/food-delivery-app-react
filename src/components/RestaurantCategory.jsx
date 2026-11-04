import { MOCK_MENU_IMAGES } from "../utils/mockMenuImages.js";

const MENU_IMG_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const itemCards = data?.itemCards || [];

  return (
    <div className="menu-category">
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

      {showItems && (
        <div className="menu-items">
          {itemCards.map((item) => {
            const info = item?.card?.info;
            if (!info) return null;

            const price = (info.price ?? info.defaultPrice ?? 0) / 100; // Swiggy sends paise
            const isVeg = info.isVeg === 1 || info.itemAttribute?.vegClassifier === "VEG";

            // real Swiggy image first, then your local mock image
            const imgSrc = info.imageId ? MENU_IMG_URL + info.imageId : MOCK_MENU_IMAGES[info.id];

            return (
              <div key={info.id} className="menu-item">
                <div className="menu-item-info">
                  <span className={`veg-mark ${isVeg ? "veg" : "non-veg"}`} />
                  <h3 className="menu-item-name">{info.name}</h3>
                  <p className="menu-item-price">₹{price}</p>
                  {info.description && <p className="menu-item-desc">{info.description}</p>}
                </div>

                {imgSrc ? (
                  <img className="menu-item-img" src={imgSrc} alt={info.name} />
                ) : (
                  <div className="menu-item-img menu-item-img--placeholder">🍽️</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
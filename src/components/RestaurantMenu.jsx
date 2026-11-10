import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";

const CATEGORY_TYPE =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";

const HERO_IMG_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

const isVegItem = (info) =>
  info?.isVeg === 1 || info?.itemAttribute?.vegClassifier === "VEG";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const navigate = useNavigate();
  const { resInfo, isMock } = useRestaurantMenu(resId);

  // all hooks stay above the early returns
  const [showIndex, setShowIndex] = useState(0); // first category open, like Swiggy
  const [searchText, setSearchText] = useState("");
  const [diet, setDiet] = useState(null); // null | "veg" | "nonveg"
  const [bestsellerOnly, setBestsellerOnly] = useState(false);

  const info = resInfo?.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info;

  const categories = useMemo(() => {
    const regularCards =
      resInfo?.cards?.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
    return regularCards
      .filter((c) => c?.card?.card?.["@type"] === CATEGORY_TYPE)
      .map((c) => c.card.card);
  }, [resInfo]);

  const isFiltering = Boolean(searchText.trim()) || diet !== null || bestsellerOnly;

  // Filter the dishes inside each category, then drop categories left empty
  const visibleCategories = useMemo(() => {
    if (!isFiltering) return categories;
    const query = searchText.trim().toLowerCase();

    return categories
      .map((cat) => ({
        ...cat,
        itemCards: (cat.itemCards || []).filter((item) => {
          const i = item?.card?.info;
          if (!i) return false;
          if (query && !i.name?.toLowerCase().includes(query)) return false;
          if (diet === "veg" && !isVegItem(i)) return false;
          if (diet === "nonveg" && isVegItem(i)) return false;
          if (bestsellerOnly && !i.isBestseller) return false;
          return true;
        }),
      }))
      .filter((cat) => cat.itemCards.length > 0);
  }, [categories, searchText, diet, bestsellerOnly, isFiltering]);

  const handleBack = (e) => {
    if (window.history.state?.idx > 0) {
      e.preventDefault();
      navigate(-1);
    }
  };

  if (resInfo === null) return <Shimmer type="card" count={5} />;

  if (!info) {
    return (
      <div className="rm-page">
        <Link to="/" className="rm-crumb-link" onClick={handleBack}>Back to Home</Link>
        <p className="rm-empty">This restaurant's menu isn't available right now.</p>
      </div>
    );
  }

  const isOpen = info.availability?.opened !== false;
  const deliveryTime = info.sla?.slaString || (info.sla?.deliveryTime && `${info.sla.deliveryTime} mins`);
  const freeDelivery = info.aggregatedDiscountInfo?.descriptionList?.[0]?.meta;

  const clearFilters = () => {
    setSearchText("");
    setDiet(null);
    setBestsellerOnly(false);
  };

  return (
    <div className="rm-page">
      {/* Breadcrumb */}
      <nav className="rm-crumbs" aria-label="Breadcrumb">
        <Link to="/" className="rm-crumb-link" onClick={handleBack}>Home</Link>
        <span>/</span>
        {info.city && (
          <>
            <span>{info.city}</span>
            <span>/</span>
          </>
        )}
        <strong>{info.name}</strong>
      </nav>

      <h1 className="rm-title">{info.name}</h1>

      {/* Hero banner */}
      {info.cloudinaryImageId && (
        <img
          className="rm-hero"
          src={HERO_IMG_URL + info.cloudinaryImageId}
          alt={info.name}
        />
      )}

      {/* Info block */}
      <section className="rm-info">
        <p className="rm-rating-row">
          <span className="rm-rating-badge">★</span>
          <strong>
            {info.avgRating} ({info.totalRatingsString})
          </strong>
          <span className="rm-dot">•</span>
          <strong>{info.costForTwoMessage}</strong>
        </p>

        <p className="rm-cuisines">{(info.cuisines || []).join(", ")}</p>

        <p className="rm-status">
          <span className={isOpen ? "rm-open" : "rm-closed"}>
            {isOpen ? "Open now" : "Closed"}
          </span>
          {info.availability?.nextCloseTime && (
            <span className="rm-muted"> · Closes {info.availability.nextCloseTime}</span>
          )}
        </p>

        <div className="rm-outlet">
          <p>
            <strong>Outlet</strong>
            <span className="rm-muted"> {info.areaName}</span>
          </p>
          {deliveryTime && <p><strong>{deliveryTime}</strong></p>}
        </div>
      </section>

      {freeDelivery && <div className="rm-offer">{freeDelivery}</div>}

      {isMock && (
        <p className="rm-notice">
          Showing a sample menu, because live Swiggy data is unavailable right now.
        </p>
      )}

      {/* Search + filter chips */}
      <div className="rm-search">
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for dishes"
          aria-label="Search for dishes"
        />
      </div>

      <div className="rm-chips">
        <button
          type="button"
          className={`rm-chip ${diet === "veg" ? "active" : ""}`}
          onClick={() => setDiet(diet === "veg" ? null : "veg")}
          aria-pressed={diet === "veg"}
        >
          <span className="veg-mark veg" /> Veg
        </button>
        <button
          type="button"
          className={`rm-chip ${diet === "nonveg" ? "active" : ""}`}
          onClick={() => setDiet(diet === "nonveg" ? null : "nonveg")}
          aria-pressed={diet === "nonveg"}
        >
          <span className="veg-mark non-veg" /> Non-veg
        </button>
        <button
          type="button"
          className={`rm-chip ${bestsellerOnly ? "active" : ""}`}
          onClick={() => setBestsellerOnly(!bestsellerOnly)}
          aria-pressed={bestsellerOnly}
        >
          Bestseller
        </button>
        {isFiltering && (
          <button type="button" className="rm-clear" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>

      {/* Menu categories */}
      <div className="rm-menu">
        {visibleCategories.length === 0 ? (
          <p className="rm-empty">No dishes match your filters. Try clearing them.</p>
        ) : (
          visibleCategories.map((category, index) => (
            <RestaurantCategory
              key={category.title}
              data={category}
              // while filtering, show every matching dish; otherwise accordion
              showItems={isFiltering || index === showIndex}
              setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;

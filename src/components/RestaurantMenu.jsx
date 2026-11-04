import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";

const CATEGORY_TYPE =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const navigate = useNavigate(); // hooks first, before any early return
  const { resInfo, isMock } = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  // If the user came from another page in the app (Home or a Category page),
  // go back to it. If they opened this URL directly there is no history,
  // so the Link's own destination ("/") takes over and sends them Home.
  const handleBack = (e) => {
    if (window.history.state?.idx > 0) {
      e.preventDefault();
      navigate(-1);
    }
  };

  // Same <Link> and class as the Category page, so both pages look identical
  const backLink = (
    <div className="menu-back">
      <Link to="/" className="category-back-link" onClick={handleBack}>
        ← Back to Home
      </Link>
    </div>
  );

  if (resInfo === null) return <Shimmer type="card" count={5} />;

  // Find cards by content instead of fixed positions (cards[0], cards[2]),
  // because Swiggy changes the card order between responses
  const info = resInfo.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info;
  const regularCards =
    resInfo.cards?.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  const categories = regularCards.filter(
    (c) => c?.card?.card?.["@type"] === CATEGORY_TYPE
  );

  if (!info) {
    return (
      <>
        {backLink}
        <p className="text-center my-6">This restaurant's menu isn't available right now.</p>
      </>
    );
  }

  return (
    <>
      {backLink}

      <div className="menu-page">
        <div className="menu-header">
          <h1 className="menu-title">{info.name}</h1>
          <p className="menu-meta">
            {(info.cuisines || []).join(", ")} · {info.costForTwoMessage}
          </p>
          {isMock && (
            <p className="menu-notice">
              Showing a sample menu, because live Swiggy data is unavailable right now.
            </p>
          )}
        </div>

        {categories.map((category, index) => (
          <RestaurantCategory
            key={category.card.card.title}
            data={category.card.card}
            showItems={index === showIndex}
            setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
          />
        ))}
      </div>
    </>
  );
};

export default RestaurantMenu;
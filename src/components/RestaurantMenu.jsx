import { useState } from "react";
import { useParams } from "react-router";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";

const CATEGORY_TYPE =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { resInfo, isMock } = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

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
    return <p className="text-center my-6">This restaurant's menu isn't available right now.</p>;
  }

  return (
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
  );
};

export default RestaurantMenu;
import { useNavigate } from "react-router";
import { REST_IMG_URL } from "../utils/constants.js";

const RestaurantCard = ({ restData }) => {
    const navigate = useNavigate(); // hooks first, before any early return
    if (!restData) return null;

    const handleClick = () => {
        if (restData.id) navigate(`/restaurant/${restData.id}`);
    };

    return (
        <div className="res-card" onClick={handleClick}>
            <img className="res-logo" src={`${REST_IMG_URL}${restData.cloudinaryImageId}`} alt={restData.name} />
            <h3>{restData.name}</h3>
            <p>{restData.cuisines?.join(", ") || "Cuisines not listed"}</p>
            <h4>{restData.costForTwo}</h4>
            <h4>
                <span>{`⭐ ${restData.avgRating}`}</span>
            </h4>
            <h4>{restData.sla?.deliveryTime ? `${restData.sla.deliveryTime} minutes` : "—"}</h4>
        </div>
    );
};

// Higher Order Component (HOC)
// input - Restaurantcard => RestaurantcardPromoted
export const withPromotedLabel = (Restaurantcard) => {
    return (props) => {
        return (
            // wrapper is the positioning anchor for the badge
            <div className="promoted-wrapper">
                <span className="promoted-badge">Promoted</span>
                <Restaurantcard {...props} />
            </div>
        );
    };
};

export default RestaurantCard;
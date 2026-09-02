import { REST_IMG_URL } from "../utils/constants.js";

const RestaurantCard = ({ restData }) => {
    return (
    <div className="res-card">
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

export default RestaurantCard;
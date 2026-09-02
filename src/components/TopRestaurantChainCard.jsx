import { REST_IMG_URL } from "../utils/constants.js";

// TopRestaurantChainCard component — renders one restaurant chain's data, destructured from props
const TopRestaurantChainCard = ({ topChainData }) => {
    return (
        <div className="chain-card">
            <div className="chain-card-img-wrap">
                <img
                    className="chain-card-img"
                    src={`${REST_IMG_URL}${topChainData.cloudinaryImageId}`}
                    alt={topChainData.name}
                />
                <span className="chain-card-offer">{topChainData.offerTag}</span>
            </div>
            <h3 className="chain-card-name">{topChainData.name}</h3>
            <p className="chain-card-meta">
                <span className="chain-card-rating">★ {topChainData.avgRating}</span> •{" "}
                {topChainData.sla?.deliveryTime ? `${topChainData.sla.deliveryTime} minutes` : "—"}
            </p>
            <p className="chain-card-cuisine">
                {topChainData.cuisines?.join(", ") || "Cuisines not listed"}
            </p>
            <p className="chain-card-area">{topChainData.area}</p>
        </div>
    );
};

export default TopRestaurantChainCard;
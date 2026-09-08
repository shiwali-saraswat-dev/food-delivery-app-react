import { useNavigate } from "react-router";
import { REST_IMG_URL } from "../utils/constants.js";

const RestaurantCard = ({ restData }) => {
    if (!restData) return null;

    const navigate = useNavigate();

    const handleClick = () => {
        const resId = restData.id;
        if (!resId) return;

        try{
            // const url = new URL(resId);

            // https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${LAT}&lng=${LNG}&restaurantId=${resId}&catalog_qa=undefined

            navigate(`/restaurant/${resId}`);
        } catch(err) {
            console.error("Error:", resId, err);
        }
        // console.log('restData : ', restData);
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

export default RestaurantCard;
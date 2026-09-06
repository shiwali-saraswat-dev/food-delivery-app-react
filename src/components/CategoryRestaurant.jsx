import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { SWIGGY_CATEGORY_API } from "../utils/constants.js";

const CategoryRestaurant = () => {
    const { catId } = useParams();
    const [searchParams] = useSearchParams();
    const tags = searchParams.get("tags") || "";
    const displayName = searchParams.get("name") || "Category";

    const [isLoading, setIsLoading] = useState(true);
    const [matchedRestaurants, setMatchedRestaurants] = useState([]);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        loadCategoryRestaurants();
    }, [catId, tags]);

    const loadCategoryRestaurants = async () => {
        setIsLoading(true);
        setLoadError(false);

        try {
            // call the function with catId and tags to get the URL string
            const res = await fetch(SWIGGY_CATEGORY_API(catId, tags));

            const json = await res.json();

            if (json?.statusCode !== 0) {
                console.error("Collection API rejected the request:", json?.statusMessage || json);
                setMatchedRestaurants([]);
                setLoadError(true);
                return; // stop processing — no valid data to extract
            }

            // Collection pages give EACH restaurant its own top-level card,
            // mixed in with non-restaurant widgets (banner, filter bar, header).
            // Filtering on "does this card have .info" separates the real
            // restaurants from everything else in a single pass.
            const catRestsData = (json?.data?.cards || [])
                .map((c) => c?.card?.card)
                .filter((r) => r?.info);

            // console.log("Restaurants extracted:", catRestsData.length);
            setMatchedRestaurants(catRestsData);
        } catch (err) {
            // console.error("Failed to load category restaurants:", err);
            setMatchedRestaurants([]);
            setLoadError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="res-container">
            <Link to="/" className="category-back-link">← Back to Home</Link>
            <h1>{displayName} Restaurants</h1>

            {isLoading ? (
                <Shimmer type="card" count={5} />
            ) : loadError ? (
                <p>Couldn't load "{displayName}" restaurants right now — check the console for details.</p>
            ) : matchedRestaurants.length === 0 ? (
                <p>No restaurants found for "{displayName}" right now.</p>
            ) : (
                matchedRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} restData={restaurant.info} />
                ))
            )}
        </div>
    );
};

export default CategoryRestaurant;
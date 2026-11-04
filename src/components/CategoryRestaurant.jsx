import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router";
import Filter from "./Filter";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { SWIGGY_CATEGORY_API } from "../utils/constants.js";
import useRestaurantFilters from "../utils/useRestaurantFilters";

const CategoryRestaurant = () => {
    const { catId } = useParams();
    const [searchParams] = useSearchParams();
    const tags = searchParams.get("tags") || "";
    const displayName = searchParams.get("name") || "Category";

    const [isLoading, setIsLoading] = useState(true);
    const [matchedRestaurants, setMatchedRestaurants] = useState([]);
    const [loadError, setLoadError] = useState(false);

    // Filters apply only to THIS category's restaurants (search within the category)
    const { filteredRestaurants, filterProps } = useRestaurantFilters(matchedRestaurants);

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

            setMatchedRestaurants(catRestsData);
        } catch (err) {
            setMatchedRestaurants([]);
            setLoadError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Filters only make sense once there are restaurants to filter
    const showFilters = !isLoading && !loadError && matchedRestaurants.length > 0;

    return (
        <div className="res-container">
            <Link to="/" className="category-back-link">← Back to Home</Link>
            <h1>{displayName} Restaurants</h1>

            {showFilters && (
                <div className="category-filter">
                    <Filter {...filterProps} />
                </div>
            )}

            {isLoading ? (
                <Shimmer type="card" count={5} />
            ) : loadError ? (
                <p>Couldn't load "{displayName}" restaurants right now — check the console for details.</p>
            ) : matchedRestaurants.length === 0 ? (
                <p>No restaurants found for "{displayName}" right now.</p>
            ) : filteredRestaurants.length === 0 ? (
                <p>No {displayName} restaurants match your search.</p>
            ) : (
                filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} restData={restaurant.info} />
                ))
            )}
        </div>
    );
};

export default CategoryRestaurant;
import { useState, useEffect } from "react";
import { O2_ASSETS, DISH_IMAGES } from "../utils/constants.js";
import Filter from "./Filter";
import CategoryChip from "./CategoryChip";
import RestaurantCard from "./RestaurantCard";
import TopRestaurantChainCard from "./TopRestaurantChainCard";
import Shimmer from "./Shimmer";

const Body = () => {
    // Shimmer UI — true while the initial API call is in flight
    const [isLoading, setIsLoading] = useState(true);

    const [categoriesList, setCategoriesList] = useState([]);

    // Currently displayed restaurant list — can be filtered down by rating
    const [restaurantsList, setRestaurantsList] = useState([]);

    // Untouched copy of the full list — needed to RESTORE after filtering,
    // since restaurantsList itself gets overwritten when filtered
    const [allRestaurantsList, setAllRestaurantsList] = useState([]);

    const [topRestChainsList, setTopRestChainsList] = useState([]);

    // Called by Search when the filter button is toggled.
    // true  -> show only restaurants rated 4.5+
    // false -> restore the full original list (from allRestaurantsList)
    const handleTopRatedFilter = (isFiltered) => {
        if (isFiltered) {
            setRestaurantsList(
                allRestaurantsList.filter((r) => r.info.avgRating >= 4.5)
            );
        } else {
            setRestaurantsList(allRestaurantsList);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.63270&lng=77.21980&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        console.log("json: ", json);

        const categoryCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.id === "whats_on_your_mind"
        );
        const catData = categoryCard?.card?.card?.imageGridCards?.info || [];
        setCategoriesList(catData);

        const restaurantCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        const restData = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setRestaurantsList(restData);
        setAllRestaurantsList(restData); // keep an untouched copy for filter reset

        const topChainCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.id === "top_brands_for_you"
        );
        const topChainData = topChainCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setTopRestChainsList(topChainData);

        // All data has arrived — switch off the shimmer/loading state
        setIsLoading(false);
    };

    return isLoading ? (
    // ---- SHIMMER STATE ----
    <div className="body">
        <Shimmer type="pill" count={6} />
        <div className="cat-container">
            <h1>Inspiration for your first order</h1>
            <Shimmer type="pill" count={8} />
        </div>
        <div className="res-container">
            <h1>Food Delivery Restaurants in Delhi NCR</h1>
            <Shimmer type="card" count={5} />
        </div>
        <div className="chain-carousel">
            <div className="chain-carousel-header">
                <h2>Top restaurant chains in Delhi</h2>
            </div>
            <Shimmer type="chain-card" count={4} />
        </div>
    </div>
    ) : (
        // ---- LOADED STATE ----
        <div className="body">
            <Filter onFilterTopRated={handleTopRatedFilter} />

            <div className="cat-container">
                <h1>Inspiration for your first order</h1>
                <div className="cat-chip-list">
                    {categoriesList.slice(0, 8).map((category) => (
                        <CategoryChip key={category.id} catData={category} />
                    ))}
                </div>
            </div>

            <div className="res-container">
                <h1>Food Delivery Restaurants in Delhi NCR</h1>
                {restaurantsList.slice(0, 10).map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} restData={restaurant.info} />
                ))}
            </div>

            <div className="adds">
                <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/App_download_banner.png"
                    alt="adds"
                />
            </div>

            <div className="chain-carousel">
                <div className="chain-carousel-header">
                    <h2>Top restaurant chains in Delhi</h2>
                </div>
                <div className="chain-carousel-track">
                    {topRestChainsList.slice(0, 4).map((topRestChain) => (
                        <TopRestaurantChainCard
                            key={topRestChain.info.id}
                            topChainData={topRestChain.info}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Body;
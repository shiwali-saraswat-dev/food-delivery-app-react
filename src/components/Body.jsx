import {useState, useEffect} from "react";
import {O2_ASSETS} from "../utils/constants.js"; // Import the app logo URL from the centralized constants file
import {DISH_IMAGES} from "../utils/constants.js"; // Import the app logo URL from the centralized constants file
import Filter from "./Filter";
import CategoryChip from "./CategoryChip";
import RestaurantCard from "./RestaurantCard";
import TopRestaurantChainCard from "./TopRestaurantChainCard";

const Body = () => {
    const [categoriesList, setCategoriesList] = useState([]);

    // Generic Restaurants Listing
    // Holds the currently displayed list — starts as the full mock data,
    // gets replaced with a filtered subset when the top-rated filter is applied
    const [restaurantsList, setRestaurantsList] = useState([]);

    // Top restaurant chains in Delhi
    const [topRestChainsList, setTopRestChainsList] = useState([]);


    // Called by Search when the filter button is toggled.
    // true  -> show only restaurants rated 4.5+
    // false -> restore the full original list
    const handleTopRatedFilter = (isFiltered) => {
        if (isFiltered) {
            setRestaurants(restaurantsList.filter((r) => r.rating >= 4.5));
        } else {
            setRestaurants(restaurantsList);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            // corsproxy.io / proxy.corsfix.com hit rate limits — using direct fetch for now
            // fallback: https://proxy.corsfix.com/?YOUR_API_URL
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.63270&lng=77.21980&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();

        const categoryCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.id === "whats_on_your_mind"
        );
        // Extract from imageGridCards.info
        const catData = categoryCard?.card?.card?.imageGridCards?.info || [];
        setCategoriesList(catData);

        // Find the one Generic Restaurant Card that actually holds a restaurant grid, wherever it happens to sit in the array this time
        const restaurantCard = json?.data?.cards?.find(
        (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        const restData = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setRestaurantsList(restData);

        const topChainCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.id === "top_brands_for_you"
        );
        const topChainData = topChainCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setTopRestChainsList(topChainData);
    };

    return (
        <div className="body">

            <Filter onFilterTopRated={handleTopRatedFilter} />

            <div className="cat-container">
                <h1>Inspiration for your first order</h1>
                <div className="cat-chip-list">
                    {categoriesList
                        .slice(0, 8)       // Only first 8, ignore the rest
                        .map((category) => (
                            <CategoryChip key={category.id} catData={category} />
                        )
                    )}
                </div>
            </div>

            <div className="res-container">
                <h1>Food Delivery Restaurants in Delhi NCR</h1>
                {restaurantsList
                    .slice(0, 10)       // Only first 10, ignore the rest
                    .map((restaurant) => (
                        <RestaurantCard key={restaurant.info.id} restData={restaurant.info} />
                    )
                )}
            </div>

            <div className="adds">
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/App_download_banner.png" alt="adds" />
            </div>

            <div className="chain-carousel">
                <div className="chain-carousel-header">
                    <h2>Top restaurant chains in Delhi</h2>
                </div>

                <div className="chain-carousel-track">
                    {/* Loops over topRestaurantChainList and renders one card per item — 
                    no manual indexing, so the list can grow/shrink safely */}
                    {topRestChainsList
                        .slice(0, 4)       // Only first 4, ignore the rest
                        .map((topRestChain) => (
                            <TopRestaurantChainCard key={topRestChain.info.id} topChainData={topRestChain.info} />
                        )
                    )}
                </div>
            </div>

        </div>
    );
};

export default Body; // Default export so Body can be imported without curly braces
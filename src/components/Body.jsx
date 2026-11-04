import { useState, useEffect } from "react";
import Filter from "./Filter";
import CategoryChip from "./CategoryChip";
import RestaurantCard from "./RestaurantCard";
import TopRestaurantChainCard from "./TopRestaurantChainCard";
import Shimmer from "./Shimmer";
import { SWIGGY_HOME_API } from "../utils/constants.js";
import useOnlineStatus from "../utils/useOnlineStatus";
import useRestaurantFilters from "../utils/useRestaurantFilters";
import Offline from "./Offline";

const Body = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categoriesList, setCategoriesList] = useState([]);

    // The original, untouched restaurants list. Filtering happens inside the hook.
    const [allRestaurantsList, setAllRestaurantsList] = useState([]);
    const [topRestChainsList, setTopRestChainsList] = useState([]);

    const { filteredRestaurants, filterProps } = useRestaurantFilters(allRestaurantsList);
    const onlineStatus = useOnlineStatus();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(SWIGGY_HOME_API);
        const json = await data.json();

        const categoryCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.id === "whats_on_your_mind"
        );
        setCategoriesList(categoryCard?.card?.card?.imageGridCards?.info || []);

        const restaurantCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        setAllRestaurantsList(
            restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
        );

        const topChainCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.id === "top_brands_for_you"
        );
        setTopRestChainsList(
            topChainCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
        );

        setIsLoading(false);
    };

    if (onlineStatus === false) return <Offline />;

    return isLoading ? (
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
        <div className="body">
            <Filter {...filterProps} />

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
                {filteredRestaurants.length === 0 ? (
                    <p>No restaurants match your search.</p>
                ) : (
                    filteredRestaurants
                        .slice(0, 10)
                        .map((restaurant) => (
                            <RestaurantCard key={restaurant.info.id} restData={restaurant.info} />
                        ))
                )}
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
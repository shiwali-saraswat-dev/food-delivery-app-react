import { useState, useEffect } from "react";
import Filter from "./Filter";
import CategoryChip from "./CategoryChip";
import RestaurantCard from "./RestaurantCard";
import TopRestaurantChainCard from "./TopRestaurantChainCard";
import Shimmer from "./Shimmer";

const Body = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categoriesList, setCategoriesList] = useState([]);

    // The ONE untouched source of truth — never filtered/mutated directly
    const [allRestaurantsList, setAllRestaurantsList] = useState([]);

    // The ONE list actually rendered — always derived from allRestaurantsList
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    const [topRestChainsList, setTopRestChainsList] = useState([]);

    // Filter state — lifted here so BOTH the button's active look
    // AND the actual filtering logic share the same source of truth
    const [isTopRatedActive, setIsTopRatedActive] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.63270&lng=77.21980&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();

        const categoryCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.id === "whats_on_your_mind"
        );
        const catData = categoryCard?.card?.card?.imageGridCards?.info || [];
        setCategoriesList(catData);

        const restaurantCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        const restData = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        setAllRestaurantsList(restData);   // untouched original
        setFilteredRestaurants(restData);  // initially, show everything

        const topChainCard = json?.data?.cards?.find(
            (c) => c?.card?.card?.id === "top_brands_for_you"
        );
        const topChainData = topChainCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setTopRestChainsList(topChainData);

        setIsLoading(false);
    };

    /**
     * Recomputes filteredRestaurants from scratch, starting from the
     * ORIGINAL allRestaurantsList every time — never filters on top of
     * a previously filtered list. This is what makes toggling rating
     * filter + typing a search term compose correctly together,
     * instead of compounding or going stale.
     */
    const applyFilters = (topRatedOn, text) => {
        let result = allRestaurantsList;

        if (topRatedOn) {
            result = result.filter((r) => r.info?.avgRating >= 4.5);
        }

        if (text.trim()) {
            const query = text.trim().toLowerCase();
            result = result.filter((r) => r.info?.name?.toLowerCase().includes(query));
        }

        setFilteredRestaurants(result);
    };

    // Toggles the "Top Rated" filter on/off, re-applying search on top
    const handleTopRatedFilter = () => {
        const next = !isTopRatedActive;
        setIsTopRatedActive(next);
        applyFilters(next, searchText);
    };

    // Just updates the input's value as the user types (controlled input)
    const handleSearchChange = (text) => {
        setSearchText(text);
        applyFilters(isTopRatedActive, text); // filter immediately with the fresh value
    };

    // Triggered on search button click / Enter key
    // — re-applies both rating filter + the current search text together
    const handleSearch = () => {
        applyFilters(isTopRatedActive, searchText);
    };

    // Full reset — clears search text, turns off rating filter,
    // restores the displayed list back to the original untouched data
    const resetFilter = () => {
        setSearchText("");
        setIsTopRatedActive(false);
        setFilteredRestaurants(allRestaurantsList);
    };

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
            <Filter
                searchText={searchText}
                onSearchChange={handleSearchChange}
                onSearch={handleSearch}
                isTopRatedActive={isTopRatedActive}
                onToggleTopRated={handleTopRatedFilter}
                onReset={resetFilter}
            />

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
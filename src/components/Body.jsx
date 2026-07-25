import {useState} from "react";
import {O2_ASSETS} from "../utils/constants.js"; // Import the app logo URL from the centralized constants file
import {DISH_IMAGES} from "../utils/constants.js"; // Import the app logo URL from the centralized constants file
import Filter from "./Filter";
import CategoryList from "./CategoryList";
import RestaurantCard from "./RestaurantCard";
import {restaurantsList} from "../utils/mockData";
import TopRestaurantChainCard from "./TopRestaurantChainCard";
import {topRestaurantChainList} from "../utils/mockData";

const Body = () => {
    // Holds the currently displayed list — starts as the full mock data,
    // gets replaced with a filtered subset when the top-rated filter is applied
    const [restaurants, setRestaurants] = useState(restaurantsList);

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

    return (
        <div className="body">

            <Filter onFilterTopRated={handleTopRatedFilter} />

            <div className="cat-container">
                <h1>Inspiration for your first order</h1>
                <CategoryList imgUrl={O2_ASSETS + "bf2d0e73add1c206aeeb9fec762438111727708719.png"} name="Biryani" />
                <CategoryList imgUrl={O2_ASSETS + "d0bd7c9405ac87f6aa65e31fe55800941632716575.png"} name="Pizza" />
                <CategoryList imgUrl={DISH_IMAGES + "ccb7dc2ba2b054419f805da7f05704471634886169.png"} name="Burger" />
                <CategoryList imgUrl={DISH_IMAGES + "d5ab931c8c239271de45e1c159af94311634805744.png"} name="Cake"/>
                <CategoryList imgUrl={DISH_IMAGES + "c2f22c42f7ba90d81440a88449f4e5891634806087.png"} name="Roll"/>
            </div>

            <div className="res-container">
                <h1>Food Delivery Restaurants in Delhi NCR</h1>
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} resData={restaurant} />
                ))}
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
                    {topRestaurantChainList.map((restaurant) => (
                        <TopRestaurantChainCard key={restaurant.id} resData={restaurant} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Body; // Default export so Body can be imported without curly braces
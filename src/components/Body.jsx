import CategoryList from "./CategoryList";
import {O2_ASSETS} from "../utils/constants.js"; // Import the app logo URL from the centralized constants file
import {DISH_IMAGES} from "../utils/constants.js"; // Import the app logo URL from the centralized constants file
import RestaurantCard from "./RestaurantCard";
import {restaurantsList} from "../utils/mockData";

const Body = () => {
    return (
        <div className="body">

            <div className="search"></div>

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
                {restaurantsList.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} resData={restaurant} />
                ))}
            </div>

            <div className="adds"></div>

        </div>
    );
};

export default Body; // Default export so Body can be imported without curly braces
import CategoryList from "./CategoryList";
import {O2_ASSETS} from "../utils/constants.js"; // Import the app logo URL from the centralized constants file
import {DISH_IMAGES} from "../utils/constants.js"; // Import the app logo URL from the centralized constants file

const styleCard = {
    backgroundColor: "#fff"
};

const RestaurantCard = (props) => {
    console.log("props: ", props);
    return (
        <div className="res-card" style={styleCard}>
            <img className="res-logo" src="https://b.zmtcdn.com/data/o2_assets/bf2d0e73add1c206aeeb9fec762438111727708719.png" alt="res-logo" />
            <h3>Punjabi Angithi</h3>
            <p>Dum Biryani</p>
            <h4>₹250 for one</h4>
            <h4><span>4.7</span> Stars</h4>
            <h4>45 minutes</h4>
        </div>
    )
};

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
                <h1>Restaurants</h1>
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
            </div>
            <div className="adds"></div>
        </div>
    );
};

export default Body; // Default export so Body can be imported without curly braces
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
// TopRestaurantChainCard component — renders one restaurant chain's data, destructured from props
const TopRestaurantChainCard = (props) => {
    const { resData } = props;
    return (
        <div className="chain-card">
            <div className="chain-card-img-wrap">
                <img className="chain-card-img" src={resData.imgUrl} alt={resData.name} />
                <span className="chain-card-offer">{resData.offerTag}</span>
            </div>
            <h3 className="chain-card-name">{resData.name}</h3>
            <p className="chain-card-meta">
                <span className="chain-card-rating">★ {resData.rating}</span> • {resData.time}
            </p>
            <p className="chain-card-cuisine">{resData.cuisine}</p>
            <p className="chain-card-area">{resData.area}</p>
        </div>
    );
};

export default TopRestaurantChainCard;
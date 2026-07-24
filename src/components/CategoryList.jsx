const CategoryList = (props) => {
    const {imgUrl, name} = props;
    return (
        <div className="cat-card">
            <img className="cat-logo" src={props.imgUrl} alt="res-logo" />
            <p className="cat-name">{props.name}</p>
        </div>
    )
};

export default CategoryList;
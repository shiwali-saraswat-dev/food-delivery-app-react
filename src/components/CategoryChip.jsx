import {CAT_IMG_URL} from "../utils/constants.js";

const CategoryChip = ({ catData }) => {
    if (!catData) return null;

    // Encode spaces and special chars in imageId
    const imgUrl = CAT_IMG_URL + encodeURIComponent(catData.imageId);

    return (
        <div className="cat-card">
            <img className="cat-logo" src={imgUrl} 
             alt={catData.accessibility?.altText || catData.action.text}
            />
            {/* <p className="cat-name">{catData.action.text}</p> */}
        </div>
    )
};

export default CategoryChip;
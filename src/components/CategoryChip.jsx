// useNavigate — hook that returns a function to navigate programmatically (e.g. navigate("/") or navigate(-1) to go back)
import { useNavigate } from "react-router";

import {CAT_IMG_URL} from "../utils/constants.js";

const CategoryChip = ({ catData }) => {
    if (!catData) return null; // guard — prevent crash if prop is undefined or not yet loaded

    // navigate() lets us redirect to any route programmatically on user action
    const navigate = useNavigate();

    // Encode spaces and special chars in imageId
    const imgUrl = CAT_IMG_URL + encodeURIComponent(catData.imageId);

    // Extract collection_id and tags from Swiggy's action link,
    // then navigate to the internal /category/:id route instead of Swiggy's external URL
    const handleClick = () => {
        const link = catData?.action?.link;
        if (!link) return;

        try {
            const url = new URL(link); // parse the raw Swiggy URL string into a URL object for easy param access
            const collectionId = url.searchParams.get("collection_id"); // extract the collection ID that identifies this category
            const tags = url.searchParams.get("tags") || ""; // extract layout/filter tags — fallback to empty string if missing
            const name = catData?.action?.text || "Restaurants"; // use category label as display name — fallback to "Restaurants"

            // navigate to internal route instead of Swiggy's external URL
            navigate(`/category/${collectionId}?tags=${encodeURIComponent(tags)}&name=${encodeURIComponent(name)}`);
        } catch (err) {
            console.error("Couldn't parse category link:", link, err); // log and swallow — bad link shouldn't crash the UI
        }
    };

    return (
        <div className="cat-card" onClick={handleClick}>
            <img className="cat-logo" src={imgUrl} 
             alt={catData.accessibility?.altText || catData.action.text}
            />
            {/* <p className="cat-name">{catData.action.text}</p> */}
        </div>
    )
};

export default CategoryChip;
import { useState } from "react";

/**
 * Search
 * Currently holds just the "top rated" filter button.
 * Receives an onFilterTopRated callback from Body — clicking the button
 * calls it, and Body handles the actual filtering logic and re-render.
 * Local isFiltered state only controls the button's own active/inactive look.
 */
const Filter = ({ onFilterTopRated }) => {
    const [isFiltered, setIsFiltered] = useState(false);

    const handleClick = () => {
        onFilterTopRated(!isFiltered);
        setIsFiltered(!isFiltered);
    };

    return (
        <div className="filter">
            <button
                className={`filter-btn ${isFiltered ? "filter-btn-active" : ""}`}
                onClick={handleClick}
            >
                ⭐ {isFiltered ? "Showing Top Rated" : "Top Rated Restaurants"}
            </button>
        </div>
    );
};

export default Filter;
/**
 * Filter
 * Purely presentational — holds NO filtering logic or business state itself.
 * All actual filtering, search text, and "is top-rated active" state live
 * in Body (the single source of truth) and are passed down as props.
 * This avoids the earlier bug where Filter's local isFiltered state could
 * fall out of sync with Body's actual data after a Reset.
 */
const Filter = ({
    searchText,
    onSearchChange,
    onSearch,
    isTopRatedActive,
    onToggleTopRated,
    onReset,
}) => {
    return (
        <div className="filter">
            <div className="search-container">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search for restaurants..."
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSearch()}
                />
                <button className="search-btn" onClick={onSearch}>
                    🔍
                </button>
            </div>

            <button
                className={`filter-btn ${isTopRatedActive ? "filter-btn-active" : ""}`}
                onClick={onToggleTopRated}
            >
                ⭐ {isTopRatedActive ? "Showing Top Rated (4.5+ stars)" : "Top Rated Restaurants"}
            </button>

            <button className="filter-btn" onClick={onReset}>
                Reset
            </button>
        </div>
    );
};

export default Filter;
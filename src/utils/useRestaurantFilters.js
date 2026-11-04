import { useMemo, useState } from "react";

const TOP_RATED_MIN = 4.5;

/**
 * Custom hook that owns the restaurant filter state (search text + top rated)
 * and derives the filtered list from the original, untouched restaurants array.
 * Reusable on any page that lists restaurants (Home, Category).
 *
 * @param {Array} restaurants - Original restaurants list (each item has an `info` object)
 * @returns {{ filteredRestaurants: Array, filterProps: object }}
 *   filteredRestaurants - List to render
 *   filterProps         - Props to spread directly onto <Filter />
 */
const useRestaurantFilters = (restaurants) => {
  const [searchText, setSearchText] = useState("");
  const [isTopRatedActive, setIsTopRatedActive] = useState(false);

  // Derived value: recomputed from the ORIGINAL list whenever an input changes,
  // so filters always compose correctly and never go stale.
  const filteredRestaurants = useMemo(() => {
    let result = restaurants;

    if (isTopRatedActive) {
      result = result.filter((r) => r.info?.avgRating >= TOP_RATED_MIN);
    }

    const query = searchText.trim().toLowerCase();
    if (query) {
      result = result.filter((r) => r.info?.name?.toLowerCase().includes(query));
    }

    return result;
  }, [restaurants, searchText, isTopRatedActive]);

  const resetFilters = () => {
    setSearchText("");
    setIsTopRatedActive(false);
  };

  const filterProps = {
    searchText,
    onSearchChange: setSearchText,
    // Filtering is live as the user types, so the search button needs no extra work
    onSearch: () => {},
    isTopRatedActive,
    onToggleTopRated: () => setIsTopRatedActive((prev) => !prev),
    onReset: resetFilters,
  };

  return { filteredRestaurants, filterProps };
};

export default useRestaurantFilters;
import { useEffect, useState } from "react";
import { MENU_API } from "./constants.js";
import mockMenu from "./mockMenu.json";

/**
 * Custom hook that fetches menu data for a given restaurant.
 * Keeps data-fetching logic out of the UI component (Single Responsibility Principle).
 * Falls back to local mock data if the API request fails or returns an invalid response.
 *
 * @param {string} resId - Restaurant ID
 * @returns {{ resInfo: object|null, isMock: boolean }}
 *   resInfo - Menu data, or null while loading
 *   isMock  - true when the mock menu is being used instead of live API data
 */
const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    // Guards against setting state after unmount or after resId changes mid-fetch
    let ignore = false;

    const fetchData = async () => {
      // Reset state so the UI shows a loading state for the new restaurant
      setResInfo(null);
      setIsMock(false);

      try {
        const res = await fetch(MENU_API(resId));

        // 202 means the request was accepted but has no data yet, so treat it as a failure
        if (!res.ok || res.status === 202) throw new Error(`HTTP ${res.status}`);

        // Read as text first: res.json() throws a vague error on an empty body
        const text = await res.text();
        if (!text) throw new Error("Empty response body");

        const json = JSON.parse(text);

        // Validate the response shape before using it
        if (!json?.data?.cards) throw new Error("Unexpected response shape");

        if (!ignore) setResInfo(json.data);
      } catch (err) {
        // Using console.warn instead of console.error because Parcel's
        // error overlay only appears on console.error
        console.warn("Menu API failed, using mock menu:", err.message);

        if (!ignore) {
          setResInfo(mockMenu);
          setIsMock(true);
        }
      }
    };

    fetchData();

    // Cleanup: ignore the result of any in-flight request
    return () => {
      ignore = true;
    };
  }, [resId]);

  return { resInfo, isMock };
};

export default useRestaurantMenu;
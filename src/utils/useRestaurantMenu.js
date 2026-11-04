import { useEffect, useState } from "react";
import { MENU_API } from "./constants.js";
import mockMenu from "./mockMenu.json";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    let ignore = false; // prevents setting state if the user navigates away mid-fetch

    const fetchData = async () => {
      setResInfo(null);
      setIsMock(false);

      try {
        const res = await fetch(MENU_API(resId));
        if (!res.ok || res.status === 202) throw new Error(`HTTP ${res.status}`);

        const text = await res.text();
        if (!text) throw new Error("Empty response body");

        const json = JSON.parse(text);
        if (!json?.data?.cards) throw new Error("Unexpected response shape");

        if (!ignore) setResInfo(json.data);
      } catch (err) {
        // console.warn, not console.error: Parcel's overlay only pops up on console.error
        console.warn("Menu API failed, using mock menu:", err.message);
        if (!ignore) {
          setResInfo(mockMenu);
          setIsMock(true);
        }
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [resId]);

  return { resInfo, isMock };
};

export default useRestaurantMenu;
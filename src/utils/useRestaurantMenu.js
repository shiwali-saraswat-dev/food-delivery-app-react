import { useEffect, useState } from "react";
import { MENU_API } from "./constants.js"; // was "./constants.JS" — harmless on Windows, but fragile; Linux/Mac deploys are case-sensitive

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetchData();
  }, [resId]); // was `[]` — without resId here, navigating between two different restaurants' menus would never re-fetch

  const fetchData = async () => {
    const res = await fetch(MENU_API + resId);

    if (res.status === 202) {
      console.error("Empty 202 — Swiggy's bot-detection wall, same as last message. Not a code bug.");
      setLoadError(true);
      return;
    }

    const text = await res.text(); // read as text FIRST — an empty body can't crash a string read
    if (!text) {
      console.error("Empty response body (status was", res.status + ") — likely the same wall.");
      setLoadError(true);
      return;
    }

    try {
      setResInfo(JSON.parse(text).data);
    } catch (err) {
      console.error("Response wasn't valid JSON:", text.slice(0, 200));
      setLoadError(true);
    }
  };

  return { resInfo, loadError };
};

export default useRestaurantMenu;
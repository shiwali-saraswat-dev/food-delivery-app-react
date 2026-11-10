import { useEffect, useState } from "react";
import { MENU_API_URLS } from "./constants.js";
import mockMenu from "./mockMenu.json";

// pause for milliseconds. Used to wait between retries.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Tries one URL, retrying a couple of times on 202 (accepted, no data yet)
const fetchMenu = async (url, signal) => {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { signal });

    // 202: no data yet -> wait longer each time (600ms, 1200ms, 1800ms), then try again
    if (res.status === 202) {
      await sleep(600 * (attempt + 1));
      continue; // jump to the next loop iteration
    }
    // fetch() does NOT throw on 404/500, so check res.ok ourselves
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Read as TEXT first, not res.json(): an empty body would make res.json() throw
    // a confusing "Unexpected end of JSON input". Checking the text gives a clearer error.
    const text = await res.text();
    if (!text) throw new Error("Empty response body");

    const json = JSON.parse(text);
    // Validate the shape: we need json.data.cards later, otherwise treat it as a failure
    if (!json?.data?.cards) throw new Error("Unexpected response shape");
    return json.data; // success
  }

  // All 3 attempts returned 202
  throw new Error("HTTP 202 after retries");
};

/*
 * CUSTOM HOOK: useRestaurantMenu(resId)
 *
 * Returns { resInfo, isMock }
 *   resInfo -> menu data, or null while loading (the page shows Shimmer for null)
 *   isMock  -> true when the data is the local fallback, so the UI can show a notice
 *
 * Flow:
 *   1. try each API URL in order (fetchMenu handles retries per URL)
 *   2. first success -> save data and stop
 *   3. all URLs fail -> use the local mock data
 *
 * Reusable: any component can call useRestaurantMenu(id) without knowing
 * about retries, fallbacks or abort handling.
 */
const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null); // null = still loading
  const [isMock, setIsMock] = useState(false); // true = showing fallback data

  useEffect(() => {
    // AbortController lets us cancel in-flight requests (see cleanup at the bottom)
    const controller = new AbortController();

    const load = async () => {
      // Reset first: when resId changes, show loading again instead of the old restaurant
      setResInfo(null);
      setIsMock(false);

      // Try each URL one by one (primary, then backups)
      for (const url of MENU_API_URLS(resId)) {
        try {
          const data = await fetchMenu(url, controller.signal);
          setResInfo(data);
          return; // success: stop, skip remaining URLs
        } catch (err) {
          // AbortError = WE cancelled (unmounted or resId changed). Not a real
          // failure, so stop quietly without trying more URLs or setting state.
          if (err.name === "AbortError") return; // unmounted / resId changed

          // Real failure: log it (url.split("?")[0] hides the query string) and try the next URL
          console.warn(`Menu API failed (${url.split("?")[0]}):`, err.message);
        }
      }

      // Every URL failed. Use the mock menu, unless we were cancelled meanwhile
      // (setting state for an old/unmounted request would show wrong data).
      if (!controller.signal.aborted) {
        setResInfo(mockMenu);
        setIsMock(true);
      }
    };

    load();

    // CLEANUP: runs when the component unmounts OR before the effect re-runs
    // because resId changed. Cancels the old request so a slow response for the
    // previous restaurant can never overwrite the new one (race condition).
    return () => controller.abort();
  }, [resId]); // re-run whenever the restaurant id changes

  return { resInfo, isMock };
};

export default useRestaurantMenu;
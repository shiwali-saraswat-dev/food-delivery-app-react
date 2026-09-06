/**
 * constants.js
 *
 * Centralized app-wide constants — external URLs, config values, and static references used across multiple components. 
 * Keeping these in one file (rather than inline in JSX) makes them easy to locate, update, and swap out later 
 * - (e.g. replacing the hardcoded logo URL with a locally bundled asset).
 */

// App logo image URL, used in Header
export const LOGO_URL = "https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png";

export const CAT_IMG_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";

export const REST_IMG_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// Base coordinates — Delhi NCR (update to dynamic user location later)
export const LAT = "28.63270";
export const LNG = "77.21980";

// Home page — fetches restaurant listing and category chips
export const SWIGGY_HOME_API = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

// Category page — fetches restaurants filtered by collection ID and tags
export const SWIGGY_CATEGORY_API = (catId, tags = "") =>
    `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${LAT}&lng=${LNG}&collection=${catId}&tags=${encodeURIComponent(tags)}&sortBy=&filters=&type=rcv2&offset=0`;

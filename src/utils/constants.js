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

// Base CDN path for category-style image assets (o2_assets)
export const O2_ASSETS = "https://b.zmtcdn.com/data/o2_assets/";

// Base CDN path for dish images, used by CategoryList for items
export const DISH_IMAGES ="https://b.zmtcdn.com/data/dish_images/";

// Base CDN URL for restaurant dish photos — prepended to each image's relative path
export const ZMT_CDN = "https://b.zmtcdn.com/data/dish_photos/";

// Base CDN URL for restaurant chain images (Swiggy media assets), used in mockData.js
export const MEDIA_ASSETS = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

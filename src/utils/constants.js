/**
 * constants.js
 *
 * Centralized app-wide constants — external URLs, config values, and static references used across multiple components. 
 * Keeping these in one file (rather than inline in JSX) makes them easy to locate, update, and swap out later 
 * - (e.g. replacing the hardcoded logo URL with a locally bundled asset).
 */

// App logo image URL, used in Header
export const LOGO_URL = "https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png";

// Base CDN path for category-style image assets (o2_assets)
export const O2_ASSETS = "https://b.zmtcdn.com/data/o2_assets/";

// Base CDN path for dish images, used by CategoryList for items
export const DISH_IMAGES ="https://b.zmtcdn.com/data/dish_images/";

// Base CDN URL for restaurant dish photos — prepended to each image's relative path
export const ZMT_CDN = "https://b.zmtcdn.com/data/dish_photos/";
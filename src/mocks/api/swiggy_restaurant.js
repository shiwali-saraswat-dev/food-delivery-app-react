// restaurantItem.js — SHAPE ONLY, not extracted from real data — fields your RestaurantCard.jsx actually reads
export const restaurantItem = {
  info: {
    id: "<string>",
    name: "<string>",
    cloudinaryImageId: "<string, Cloudinary path>",
    cuisines: ["<string>", "..."],
    costForTwo: "<string, e.g. '₹400 for two'>",
    avgRating: 0.0,
    sla: {
      deliveryTime: 0, // minutes, number
    },
  },
};
import { ZMT_CDN } from "./constants.js"; // Import the CDN base URL for dish photos from constants
import { MEDIA_ASSETS } from "./constants.js"; // Import the CDN base URL for dish photos from constants

// Sample data shape — replace with API response in a real app
export const restaurantsList = [
  {
    id: 1,
    imgUrl: ZMT_CDN + "de6/c6aadd2748a1f2e327de84ad8128cde6.jpg",
    resName: "Sagar",
    cuisine: "Dum Biryani",
    price: 250,
    rating: 4.7,
    time: 45
  },
  {
    id: 2,
    imgUrl: ZMT_CDN + "7d3/fe0c1dcddc2af5fd75c0f336e5e147d3.png",
    resName: "Nirula's",
    cuisine: "Dum Biryani",
    price: 200,
    rating: 4.1,
    time: 30
  },
  {
    id: 3,
    imgUrl: ZMT_CDN + "1cc/85790cc3b541fb571f4f9fd5990ce1cc.jpeg",
    resName: "Bistro 57",
    cuisine: "Dum Biryani",
    price: 200,
    rating: 4.4,
    time: 28
  },
  {
    id: 4,
    imgUrl: ZMT_CDN + "fdb/14698f38430947bd0f57ad652ffe8fdb.jpg",
    resName: "Castle Cakes",
    cuisine: "Dum Biryani",
    price: 350,
    rating: 3.9,
    time: 40
  },
  {
    id: 5,
    imgUrl: ZMT_CDN + "e7b/54c165d877cc6ed144d764a8e50f7e7b.jpg",
    resName: "Chill N Grill",
    cuisine: "Dum Biryani",
    price: 299,
    rating: 4.9,
    time: 25
  }
];

// Sample data shape — replace with API response in a real app
export const topRestaurantChainList = [
  {
      id: 1,
      imgUrl: MEDIA_ASSETS + "v4ryntwbvxuogbwfg3kj",
      offerTag: "70% OFF UPTO ₹130",
      name: "Barbeque Nation",
      rating: 4.3,
      time: "30-35 mins",
      cuisine: "North Indian, Barbecue, Kebabs,...",
      area: "Connaught Place",
  },
  {
      id: 2,
      imgUrl: MEDIA_ASSETS + "RX_THUMBNAIL/IMAGES/VENDOR/2026/6/15/dba33fb1-390f-4c19-b679-2da827c02d59_608593.JPG",
      offerTag: "ITEMS AT ₹99",
      name: "Pizza Hut",
      rating: 4.3,
      time: "30-40 mins",
      cuisine: "Pizzas",
      area: "Paharganj",
  },
  {
      id: 3,
      imgUrl: MEDIA_ASSETS + "e0839ff574213e6f35b3899ebf1fc597",
      offerTag: "70% OFF UPTO ₹140",
      name: "Chinese Wok",
      rating: 4.2,
      time: "35-45 mins",
      cuisine: "Chinese, Asian, Tibetan, Desserts",
      area: "Kashmere Gate",
  },
  {
      id: 4,
      imgUrl: MEDIA_ASSETS + "RX_THUMBNAIL/IMAGES/VENDOR/2026/7/1/6366baa8-5542-4ea5-8164-f3506858f2b2_26719.JPG",
      offerTag: "ITEMS AT ₹69",
      name: "Bakingo",
      rating: 4.6,
      time: "30-35 mins",
      cuisine: "Bakery, Desserts, Beverages, Snacks",
      area: "Karol Bagh",
  }
];
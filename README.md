# 🍔 Food Delivery App (React)

A Swiggy-style food ordering web app built with **React 19**, bundled with **Parcel**. It started as a single-file UI prototype and has grown, one pull request at a time, into a multi-page app with live restaurant data, client-side routing, a Redux cart, lazy-loaded pages and offline handling.

> This project is built iteratively and publicly through pull requests. Check the [Pull Requests](https://github.com/shiwali-saraswat-dev/food-delivery-app-react/pulls?q=is%3Apr) tab to see how it progressed from a single-file prototype to a fully componentized app.

## 🚀 Features

### Browsing
- **Live restaurant data**: the home page fetches restaurants, categories and top chains from Swiggy's listing API
- **Category chips** ("Inspiration for your first order") that open a dedicated `/category/:catId` page listing restaurants for that category
- **Restaurant cards** with image, cuisines, cost for two, rating and delivery time
- **Promoted badge** on selected restaurants, added with a higher-order component (`withPromotedLabel`). The API sends no promoted flag, so it is simulated for every 3rd restaurant
- **Top restaurant chains** section with offer tag, rating, delivery time and area
- **App download banner** on the home page

### Search & filters
- **Live search** by restaurant name
- **Top Rated filter** (rating 4.5 and above)
- **Reset** button to clear all filters
- Shared by the Home and Category pages through the reusable `useRestaurantFilters` hook

### Restaurant menu page (`/restaurant/:resId`)
- Restaurant header with rating, cuisines, outlet/area, open or closed status and offer info
- **Accordion menu categories**, with the first category open by default
- **Dish search**, **Veg / Non-veg** filter and **Bestseller** filter, with a "clear filters" option
- **ADD** button on every dish, which adds it to the cart
- **Resilient data loading** through the `useRestaurantMenu` hook: tries the menu API URLs in order, retries on HTTP 202, and falls back to a local mock menu (with an on-screen notice) if every request fails
- Smart "Back" navigation that returns to the previous page, or Home when opened directly

### Cart (Redux Toolkit)
- Add dishes from the menu page, with the same dish incrementing its quantity
- Increase or decrease quantity with a stepper (a row disappears when it reaches 0)
- Remove a single item, or **Clear Cart**
- Per-item line totals in ₹, plus a live **cart badge** in the header showing the total quantity
- Empty-cart state

### User & session (UI demo)
- **Login / Logout toggle** in the header, with an account dropdown (Profile, Orders, Logout) that closes on outside click or `Esc`
- **Profile page** (`/profile`) reading user details from a React Context (`UserContext`) holding demo data

### App experience
- **Shimmer loading skeletons** for home, category and menu pages
- **Lazy loading / code splitting** (`React.lazy` + `Suspense`) for the Profile, About, Contact, Category and Restaurant Menu pages
- **Offline handling**: an "Offline" badge in the header, a banner under it, and a full offline screen on the home page (via the `useOnlineStatus` hook)
- **Custom error page** for unknown routes and render errors
- **About** and **Contact** pages (the Contact form is front-end only)
- **Footer** with links, address and contact info
- Deployed under the `/food-delivery-app-react` base path (GitHub Pages)

## 🛠️ Tech Stack

- **React 19**: component-based UI library
- **React Router 7**: `createBrowserRouter`, nested layout routes, dynamic params, `errorElement`
- **Redux Toolkit + React Redux**: cart state management
- **React Context**: user data
- **Parcel 2**: zero-config bundler with hot module reloading
- **JavaScript (ES6+)** and plain **CSS**

## 📦 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/shiwali-saraswat-dev/food-delivery-app-react.git
cd food-delivery-app-react
npm install
```

### Run locally

```bash
npm start
```

App runs at `http://localhost:1234` by default.

### Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

> **Note:** Restaurant and menu data come from Swiggy's public web APIs, which can block browser requests from other origins (CORS) or return empty responses. If the menu API fails, the menu page automatically falls back to the bundled mock menu. The home and category pages need a working listing API response.

## 📁 Project Structure

```
food-delivery-app-react/
├── index.html
├── src/
│   ├── App.jsx                     # Router config, layout, Redux Provider
│   ├── Style.css
│   ├── assets/
│   │   └── menu/                   # Local images for the mock menu dishes
│   ├── components/
│   │   ├── Header.jsx              # Logo, nav, cart badge, login/logout, user menu
│   │   ├── Body.jsx                # Home page
│   │   ├── Footer.jsx
│   │   ├── Filter.jsx              # Search + Top Rated + Reset (presentational)
│   │   ├── CategoryChip.jsx
│   │   ├── CategoryRestaurant.jsx  # /category/:catId page
│   │   ├── RestaurantCard.jsx      # + withPromotedLabel HOC
│   │   ├── TopRestaurantChainCard.jsx
│   │   ├── RestaurantMenu.jsx      # /restaurant/:resId page
│   │   ├── RestaurantCategory.jsx  # Menu accordion + ADD to cart
│   │   ├── Cart.jsx                # /cart page
│   │   ├── Profile.jsx             # /profile page
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Shimmer.jsx             # Loading skeletons
│   │   ├── Offline.jsx             # Full-page offline screen
│   │   ├── OfflineIndicator.jsx    # OfflineBadge + OfflineBanner
│   │   └── Error.jsx               # Error / 404 page
│   ├── utils/
│   │   ├── constants.js            # API URLs, image base URLs, coordinates
│   │   ├── appStore.js             # Redux store
│   │   ├── cartSlice.js            # Cart reducers and actions
│   │   ├── UserContext.js          # Demo user context
│   │   ├── useOnlineStatus.js      # Online/offline hook
│   │   ├── useRestaurantFilters.js # Search + top-rated filter hook
│   │   ├── useRestaurantMenu.js    # Menu fetch, retry and mock fallback hook
│   │   ├── mockMenu.json           # Fallback menu data
│   │   └── mockMenuImages.js       # Images for the fallback menu
│   └── mocks/
│       └── api/                    # Saved Swiggy API responses (reference data)
├── package.json
└── .gitignore
```

## 🗺️ Routes

| Path | Page |
| --- | --- |
| `/` | Home: search, categories, restaurants, top chains |
| `/category/:catId` | Restaurants for a selected category |
| `/restaurant/:resId` | Restaurant menu |
| `/cart` | Cart |
| `/profile` | User profile |
| `/about` | About |
| `/contact` | Contact |
| any other path | Error / 404 page |

## 🌱 Branching & Contribution Workflow

This project intentionally follows a feature-branch + pull request workflow, even as a solo project, to showcase a professional development process:

1. Create a branch: `git checkout -b refactor/<name>` or `feat/<name>`
2. Commit changes with clear, conventional messages (`feat:`, `refactor:`, `fix:`, `docs:`, `chore:`)
3. Push and open a pull request into `main` with a description of what changed and why
4. Merge (squash preferred) and delete the branch

Some PRs (e.g. `explore/props-patterns`) intentionally document a comparison of different implementation approaches before settling on one best-practice pattern. The reasoning is captured in the PR description rather than left as comments in the final code.

## 📌 Roadmap

**Done**
- [x] Static UI and componentized architecture
- [x] Live API data with shimmer loading states
- [x] Client-side routing (home, category, menu, cart, profile, about, contact, error page)
- [x] Search, Top Rated filter and promoted badge
- [x] Restaurant menu page with dish search, veg/non-veg and bestseller filters
- [x] Redux cart (add, quantity stepper, remove, clear, header badge)
- [x] Lazy loading and offline handling
- [x] Mock-menu fallback when the menu API fails

**Planned**
- [ ] Real authentication (login is a UI toggle for now)
- [ ] Cart bill summary (item total, taxes, delivery fee)
- [ ] Checkout flow
- [ ] Order tracking and order history
- [ ] Persist the cart (e.g. `localStorage`)
- [ ] Dynamic user location (coordinates are currently hardcoded)
- [ ] Replace hotlinked third-party images with local, license-safe assets

## 📄 License

MIT

# 🍔 Food Delivery App (React)

A food ordering web app UI built with **React**, bundled using **Parcel**, developed as a practice project to demonstrate component-based architecture, prop-passing patterns, and a professional Git/PR workflow.

> This project is built iteratively and publicly through pull requests — check the [Pull Requests](../../pulls?q=is%3Apr) tab to see the progression from a single-file prototype to a fully componentized app.

## 🚀 Features

- Header with logo and navigation
- Tabs (Dining Out / Delivery / Nightlife)
- Category cards ("Inspiration for your first order")
- Brand cards ("Top brands for you")
- Promotional banner section
- Restaurant listing with rating, cuisine, price, and delivery time
- App download ad section
- Restaurant chain carousel
- Footer with links, address, and contact info

## 🛠️ Tech Stack

- **React** – component-based UI library
- **Parcel** – zero-config bundler with hot module reloading
- **JavaScript (ES6+)**
- **CSS** for styling

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

## 📁 Project Structure

```
food-delivery-app-react/
├── index.html
├── src/
│   ├── App.jsx
│   ├── Style.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Body.jsx
│   │   ├── Footer.jsx
│   │   ├── RestaurantCard.jsx
│   │   └── RestaurantChainCard.jsx
│   ├── data/
│   │   ├── restaurants.js
│   │   └── restaurantChains.js
│   └── assets/
├── package.json
└── .gitignore
```

## 🌱 Branching & Contribution Workflow

This project intentionally follows a feature-branch + pull request workflow, even as a solo project, to showcase a professional development process:

1. Create a branch: `git checkout -b refactor/<name>` or `feat/<name>`
2. Commit changes with clear, conventional messages (`feat:`, `refactor:`, `fix:`, `docs:`, `chore:`)
3. Push and open a pull request into `main` with a description of what changed and why
4. Merge (squash preferred) and delete the branch

Some PRs (e.g. `explore/props-patterns`) intentionally document a comparison of different implementation approaches before settling on one best-practice pattern — the reasoning is captured in the PR description rather than left as comments in the final code.

## 📌 Roadmap

- [x] Static UI: header, categories, brands, banner, restaurant list, chain carousel, footer
- [x] Componentized architecture (extracted from a single file into `src/components/`)
- [ ] Replace hotlinked/third-party images with local, license-safe assets
- [ ] Search functionality
- [ ] Cart functionality
- [ ] Checkout flow
- [ ] Order tracking

## 📄 License

MIT
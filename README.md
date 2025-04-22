# Hebrew-Friendly Name Picker

## Overview
A React-based web application for exploring and discovering Hebrew-friendly names. Play around with it at https://mspiegel31.github.io/hebrew-name-app/

## Features
- **Swipe-style Name Discovery**: Browse through names with a simple like/dislike interface
- **Gender Filtering**: Filter names by male, female, or gender-neutral options
- **Bilingual Display**: View names in both English and Hebrew
- **Save Your Favorites**: Keep track of names you like and dislike
- **Export Results**: Download your favorite names as a CSV file
- **Responsive Design**: Works smoothly on both desktop and mobile devices

## What problem are we solving?
My spouse really likes names in english that have a direct translation to Hebrew.  Most of the tinder-clone name picker apps out there didn't work for her because:

1. The apps are sometimes paid.
1. The apps require you to purchase "name packs" for an additional fee.
1. These name packs didn't usually have the specific names she was looking for.

## What is this then?
This turned out to be a great problem to ~vibe-code~ leverage AI coding assistants to solve!  Claude code turned out to be pretty great at parsing screenshots/JPGs of "popular hebrew names" and feeding them into the dataset in `data/`.  After that it was fairly simple to get the application working as a static build and hosted here on Github

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/mspiegel31/hebrew-name-app.git
cd hebrew-name-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode 
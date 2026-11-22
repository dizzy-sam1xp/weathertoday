# Weather Today

A weather app built with React 19 and TypeScript. Get live weather for Indian cities, search for a city, and view a detailed weather dashboard — powered by the free Open-Meteo API, with no API key required.

## Features

- Home page with live weather cards for Delhi, Chennai, Mumbai, and Kolkata
- City search from the navbar
- Weather dashboard at `/weather/:city` with:
  - Current temperature
  - Feels-like temperature
  - Humidity
  - Wind speed
  - Pressure
  - A 12-hour hourly forecast

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Open-Meteo API (free, no API key)

## Getting started

```bash
npm install
npm run dev
```

Then open the app in your browser at the local address shown in the terminal (usually http://localhost:5173).

## How it works

Weather data comes from the Open-Meteo forecast API. The home page loads current weather for the four featured cities, and the dashboard page fetches current conditions and hourly data for the city in the URL.

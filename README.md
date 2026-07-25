# 🌤️ Weather App

A weather application built with **JavaScript, Webpack, and API integration**, as part of The Odin Project.

This project focuses on handling asynchronous data, modular architecture, and dynamic UI updates.

---

## 📌 Features

* 🔍 Search weather by city name
* 🌡️ Toggle between Celsius and Fahrenheit
* 📊 Display temperature and weather conditions
* 🔄 Dynamic DOM updates on each search
* 🧹 Clears previous results before rendering new data

---

## 🛠️ Technologies

* JavaScript (ES Modules)
* Webpack
* HTML & CSS
* Weather API (fetch + JSON parsing)

---

## ⚙️ How It Works

The app sends a request to a weather API and processes the returned JSON data to display relevant information such as temperature and conditions.

### Flow:

1. User enters a city
2. Fetch request is sent to API
3. Data is parsed
4. UI updates dynamically

---

## 📂 Project Structure

```bash
src/
├── index.js        # Entry point
├── DOM.js          # Handles UI rendering
├── styles.css
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/AvielZaman/ODP-WeatherApp.git
cd ODP-WeatherApp
npm install
npm run dev
```

---

## 🧠 What I Practiced

* Working with APIs (fetch)
* Async/await & promises
* DOM manipulation
* State handling (unit toggle)

---

## 🔮 Future Improvements

* Add loading spinner
* Handle API errors better
* Add weather icons
* Save recent searches

# 🎬 MovieeMart

A modern movie discovery web application that allows users to explore trending, latest, and popular movies using the TMDB API. Built with a clean UI and smooth user experience.

---

🌐 Live Demo

You can view the live project here:
👉 https://movieemart.netlify.app/

---

## 🚀 Project Overview

MovieeMart is a frontend-based movie browsing platform where users can:

* Search for movies or actors
* View trending and latest releases
* Filter movies by genre, year, and rating
* View detailed movie information in a popup modal
* Rate movies (stored locally)

---

## 🎯 Objectives

* Provide a smooth and responsive UI for movie browsing
* Integrate TMDB API for real-time movie data
* Implement search (movie + cast based)
* Add filtering functionality
* Enhance UX with modal popups and smooth scrolling

---

## 🛠️ Tech Stack

* HTML5
* Tailwind CSS
* JavaScript (Vanilla JS)
* TMDB API
* Netlify (Deploy)

---

## ⚙️ Setup & Installation

1. Clone the repository:

```
git clone https://github.com/Aryan-018008/Movie-Listing-Rating.git
```

2. Navigate to project folder:

```
cd movie listing
```

3. Open `index.html` in your browser
Then you will be able to see the project
---

## 📂 Project Structure

```
movie listing/
│── index.html
│── script.js
│── Readme.md
```

---

## ✨ Features

### 🔥 Trending Movies

Displays currently trending movies of the week.

### 🆕 Latest Movies

Shows recently released movies.

### 🔍 Search Functionality

* Search by movie name
* Search by cast/actor name

### 🎯 Filters

* Genre filter (Action, Sci-Fi, etc.)
* Year filter (2022–2026)
* Rating filter

### 🎬 Movie Modal

* Poster, rating, runtime
* Director and cast
* Trailer link

### ⭐ User Rating System

* 5-star rating system
* Stored in localStorage
* Persistent on reload

### 📱 Responsive Design

* Mobile-friendly navbar
* Sticky search + filter bar
* Smooth scrolling UX

---

## 🧠 Key Functionalities Explained

### 1. API Integration

Uses TMDB endpoints like:

* `/trending/movie/week`
* `/movie/now_playing`
* `/search/movie`
* `/search/person`

### 2. Dynamic Rendering

Movies are dynamically created using JavaScript and appended to the DOM.

### 3. Scroll Optimization

Smooth scrolling with offset handling for sticky navbar.

### 4. Local Storage

Stores user ratings using:

```
localStorage.setItem("rating_" + movieId, stars)
```

---



## 📌 Future Improvements

* Add user authentication
* Save favorite movies
* Dark/Light theme toggle
* Pagination / infinite scroll
* Backend integration for persistent ratings

---

## 🧑‍💻 Author

Aryan Bharadwaj

GitHub - https://github.com/Aryan-018008

---

## 📄 License

This project is open-source and available for learning purposes.

---

## 💡 N.B.

This project uses TMDB API but is not endorsed or certified by TMDB.

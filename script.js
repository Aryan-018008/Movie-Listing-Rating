let currentMovieId = null

//Api 
const API_KEY = "84bf9497969fff559d5aa3705cc0c9a1" //Tmdb Api key
const BASE_URL = "https://api.themoviedb.org/3"
const IMG_URL = "https://image.tmdb.org/t/p/w500"

const genreMap = {
"Sci-Fi": 878,
"Action": 28,
"Adventure": 12,
"Animation": 16,
"Horror": 27,
"Crime": 80,
"Drama": 18,
"Comedy": 35,
"History": 36

}


const movieGrid = document.getElementById("movieGrid")
const trendingMovies = document.getElementById("trendingMovies")
const recentMovies = document.getElementById("recentMovies")

//Trending Movie Fetch
async function fetchTrendingMovies(){

const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)

const data = await res.json()

displayMovies(data.results, trendingMovies)

}

//Ratings function
function averageRating(arr){

if(arr.length===0) return 0

return (arr.reduce((a,b)=>a+b)/arr.length).toFixed(1)

}

//Latest Release
async function fetchRecentMovies(){

const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)

const data = await res.json()

displayMovies(data.results, recentMovies)

}


//Create Star
function createStars(index){

let stars=""

for(let i=1;i<=5;i++){

stars+=`
<span
class="cursor-pointer text-yellow-400 text-lg"
onclick="rateMovie(${index},${i})">
☆
</span>
`

}

return stars

}

//Movie Display
function displayMovies(movies, target){

target.innerHTML = ""

movies.forEach(movie => {

const card = document.createElement("div")

card.className =
"bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition cursor-pointer"

card.onclick = () => openModal(movie.id)

card.innerHTML = `

<img
src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/500'}"
class="h-64 w-full object-cover"
/>

<div class="p-4">

<h3 class="font-semibold text-lg">
${movie.title}
</h3>

<p class="text-yellow-400">
⭐ ${movie.vote_average}
</p>

<p class="text-sm text-gray-400">
${movie.release_date}
</p>

</div>
`

target.appendChild(card)

})

}

// Movie Filter
async function applyFilters(){

const genre = document.getElementById("genreFilter").value
const year = document.getElementById("yearFilter").value
const rating = document.getElementById("ratingFilter").value

let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}`

/// Genre filter
if(genre){
url += `&with_genres=${genreMap[genre]}`
}

/// Year filter
if(year){
url += `&primary_release_year=${year}`
}

/// Rating filter
if(rating){
url += `&vote_average.gte=${rating}`
}

const res = await fetch(url)
const data = await res.json()

displayMovies(data.results, movieGrid)

document.getElementById("libraryTitle").innerText = "🎬 Filtered Movies"

movieGrid.scrollIntoView({behavior:"smooth"})

}


//Search Movie

// async function searchMovies(){

// const query = document.getElementById("searchInput").value.trim()

// if(!query) return

// const res = await fetch(
// `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
// )

// const data = await res.json()
// let movies = data.results

// const year = document.getElementById("yearFilter").value
// const rating = document.getElementById("ratingFilter").value

// if(year){
// movies = movies.filter(m => m.release_date?.startsWith(year))
// }

// if(rating){
// movies = movies.filter(m => m.vote_average >= rating)
// }

// // displayMovies(data.results, movieGrid)
// displayMovies(movies, movieGrid)


// document.getElementById("libraryTitle").innerText = "🔎 Search Results"


// movieGrid.scrollIntoView({ behavior: "smooth" }) //scroll
// }
async function searchMovies(){

const query = document.getElementById("searchInput").value.trim()
if(!query) return

// Step 1: search movie normally
let res = await fetch(
`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
)

let data = await res.json()

// If movie found → show results
if(data.results.length > 0){
displayMovies(data.results, movieGrid)
document.getElementById("libraryTitle").innerText = "🔎 Movie Results"
movieGrid.scrollIntoView({behavior:"smooth"})
return
}

// Step 2: if no movie found → search person
res = await fetch(
`${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`
)

data = await res.json()

if(data.results.length === 0){
movieGrid.innerHTML = "<p class='text-center text-gray-400'>No movies or actors found</p>"
return
}

const personId = data.results[0].id

// Step 3: get movies of that actor
const creditRes = await fetch(
`${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}`
)

const creditData = await creditRes.json()

displayMovies(creditData.cast, movieGrid)

document.getElementById("libraryTitle").innerText =
`🎭 Movies with ${query}`

movieGrid.scrollIntoView({behavior:"smooth"})

}



//Famous Movie
async function fetchPopularMovies(){

const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)

const data = await res.json()

displayMovies(data.results, movieGrid)

}


document
.getElementById("searchBtn")
.addEventListener("click", searchMovies)

document
.getElementById("searchInput")
.addEventListener("keypress", function(e){
if(e.key === "Enter"){
searchMovies()
}
})

document
.getElementById("genreFilter")
.addEventListener("change", applyFilters)

document
.getElementById("yearFilter")
.addEventListener("change", applyFilters)

document
.getElementById("ratingFilter")
.addEventListener("change", applyFilters)



//PopUp
async function openModal(movieId){

currentMovieId = movieId
const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
const movie = await res.json()

const creditsRes = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
const credits = await creditsRes.json()

const videosRes = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
const videos = await videosRes.json()

const director = credits.crew.find(p => p.job === "Director")
const cast = credits.cast.slice(0,5).map(c=>c.name).join(", ")

const trailer = videos.results.find(v=>v.type==="Trailer")

document.getElementById("modalTitle").innerText = movie.title

document.getElementById("modalPoster").src =
movie.poster_path ? IMG_URL + movie.poster_path : ""

document.getElementById("modalRating").innerText =
"TMDB Rating: ⭐ " + movie.vote_average + " / 10"

document.getElementById("modalYear").innerText =
"Year: " + movie.release_date.split("-")[0]

document.getElementById("modalReleased").innerText =
"Released: " + movie.release_date

document.getElementById("modalRuntime").innerText =
"Runtime: " + movie.runtime + " mins"

document.getElementById("modalDirector").innerText =
"Director: " + (director ? director.name : "N/A")

document.getElementById("modalCast").innerText =
"Cast: " + cast

if(trailer){

document.getElementById("modalTrailer").href =
`https://www.youtube.com/watch?v=${trailer.key}`

}

createUserStars()
const savedRating = localStorage.getItem("rating_" + movieId)
if(savedRating){
rateMovie(parseInt(savedRating))
}

document.getElementById("movieModal").classList.remove("hidden")
document.getElementById("movieModal").classList.add("flex")
document.body.classList.add("overflow-hidden")
document.getElementById("userRatingMsg").innerText = ""

}





////User Ratings
let selectedRating = 0

function createUserStars(){

const starContainer = document.getElementById("userStars")

starContainer.innerHTML=""
selectedRating = 0

for(let i=1;i<=5;i++){

const star=document.createElement("span")

star.innerHTML="☆"

star.className=
"text-gray-400 text-3xl cursor-pointer transition hover:scale-125"

star.dataset.value=i

star.addEventListener("click",()=>rateMovie(i))

starContainer.appendChild(star)

}

}

function rateMovie(stars){

selectedRating = stars

const starContainer = document.getElementById("userStars")
const allStars = starContainer.querySelectorAll("span")

allStars.forEach((star,index)=>{

if(index < stars){

star.innerHTML="★"
star.classList.remove("text-gray-400")
star.classList.add("text-yellow-400")

}else{

star.innerHTML="☆"
star.classList.remove("text-yellow-400")
star.classList.add("text-gray-400")

}

})

document.getElementById("userRatingMsg").innerText =
`⭐ You rated ${stars} star`

localStorage.setItem("rating_" + currentMovieId,stars)
}



//PopUp Closed
function closeModal(){

document.getElementById("movieModal").classList.add("hidden")
document.body.classList.remove("overflow-hidden")


}





function resetFilters() {

document.getElementById("searchInput").value = "";
document.getElementById("genreFilter").value = "";
document.getElementById("yearFilter").value = "";
document.getElementById("ratingFilter").value = "";
document.getElementById("libraryTitle").innerText = "🎬 Movie Library";


fetchPopularMovies();

}



fetchTrendingMovies()
fetchRecentMovies()
fetchPopularMovies()

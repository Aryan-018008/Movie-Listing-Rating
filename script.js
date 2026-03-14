//Api Key
const API_KEY = "" //Tmdb Api key
const BASE_URL = "https://api.themoviedb.org/3"
const IMG_URL = "https://image.tmdb.org/t/p/w500"


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
"bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition"

card.innerHTML = `

<img
src="${IMG_URL + movie.poster_path}"
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

//Search Movie
async function searchMovies(){

const query = document.getElementById("searchInput").value

if(query.length < 1) return

const res = await fetch(
`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
)

const data = await res.json()

displayMovies(data.results, movieGrid)

}

//Famous Movie
async function fetchPopularMovies(){

const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)

const data = await res.json()

displayMovies(data.results, movieGrid)

}
document
.getElementById("searchBtn")
.addEventListener("click", async () => {

const query = document.getElementById("searchInput").value

if(query.length < 1) return

const res = await fetch(
`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
)

const data = await res.json()

displayMovies(data.results, movieGrid)

})


//Movie Ratings
function rateMovie(index,star){

movies[index].ratings.push(star)

renderMovies(movies,movieGrid)

}


//PopUp
function openModal(index){

const m = movies[index]

document.getElementById("modalTitle").innerText=m.title
document.getElementById("modalGenre").innerText="Genre: "+m.genre
document.getElementById("modalYear").innerText="Year: "+m.year
document.getElementById("modalDirector").innerText="Director: "+m.director
document.getElementById("modalCast").innerText="Cast: "+m.cast
document.getElementById("modalProduction").innerText="Production: "+m.production

document.getElementById("movieModal").classList.remove("hidden")

document.getElementById("movieModal").classList.add("flex")

}



function closeModal(){

document.getElementById("movieModal").classList.add("hidden")

}


//Search Movie
document
.getElementById("searchInput")
.addEventListener("keyup", async (e)=>{

const query = e.target.value

if(query.length < 1) return

const res = await fetch(
`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
)

const data = await res.json()

// displayMovies(data.results)
displayMovies(data.results, movieGrid)

})

//Refresh Button
function resetFilters() {

document.getElementById("searchInput").value = "";
document.getElementById("genreFilter").value = "";
document.getElementById("yearFilter").value = "";
document.getElementById("ratingFilter").value = "";

renderMovies(); 
}



fetchTrendingMovies()
fetchRecentMovies()
fetchPopularMovies()
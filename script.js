const movieGrid = document.getElementById("movieGrid")
const trendingMovies = document.getElementById("trendingMovies")
const recentMovies = document.getElementById("recentMovies")



function averageRating(arr){

if(arr.length===0) return 0

return (arr.reduce((a,b)=>a+b)/arr.length).toFixed(1)

}



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



function renderMovies(list,target){

target.innerHTML=""

list.forEach((movie,index)=>{

const avg = averageRating(movie.ratings)

const card = document.createElement("div")

card.className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition"

card.innerHTML=`

<img
src="${movie.poster}"
loading="lazy"
class="h-64 w-full object-cover"
/>

<div class="p-4">

<h3 class="font-semibold text-lg">
${movie.title}
</h3>

<p class="text-sm text-gray-400">
${movie.genre} • ${movie.year}
</p>

<p class="text-yellow-400">
⭐ ${avg}
</p>

<div class="flex gap-1 mt-2">
${createStars(index)}
</div>

<button
onclick="openModal(${index})"
class="mt-3 bg-red-500 px-3 py-1 rounded text-sm">
View More
</button>

</div>
`

target.appendChild(card)

})

}



renderMovies(movies,movieGrid)

renderMovies(movies.filter(m=>m.trending),trendingMovies)

renderMovies(movies.filter(m=>m.recent),recentMovies)



function rateMovie(index,star){

movies[index].ratings.push(star)

renderMovies(movies,movieGrid)

}



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



document
.getElementById("searchInput")
.addEventListener("input",(e)=>{

const value = e.target.value.toLowerCase()

const filtered = movies.filter(movie=>

movie.title.toLowerCase().includes(value) ||
movie.genre.toLowerCase().includes(value) ||
movie.cast.toLowerCase().includes(value) ||
movie.year.toString().includes(value)

)

renderMovies(filtered,movieGrid)

})

//Refresh Button
function resetFilters() {

document.getElementById("searchInput").value = "";
document.getElementById("genreFilter").value = "";
document.getElementById("yearFilter").value = "";
document.getElementById("ratingFilter").value = "";

renderMovies(); 
}
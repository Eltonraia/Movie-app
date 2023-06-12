//movie app api key:4fc38441d9f579cc7b3295ae158df5a7
//api Read Access Token:eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmMzODQ0MWQ5ZjU3OWNjN2IzMjk1YWUxNThkZjVhNyIsInN1YiI6IjY0ODY1Nzk2YzlkYmY5MDBhZDQ2OGNhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DVGSKGbGb3Lloi_4jdgzGoYK-vHunKNEKxoIKGVmVYU

const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchData("movie/popular");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
                 src='https://image.tmdb.org/t/p/w500${movie.poster_path}'
                 class="card-img-top" 
                 alt="${movie.title}"
                 />`
                : `<img
                src="../img/no-image.png"
                class="card-img-top"
                alt="${movie.title}"
                />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;

    document.querySelector("#popular-movies").appendChild(div);
  });
}

// Fetch data from TMDB API
async function fetchData(endpoint) {
  const API_KEY = "4fc38441d9f579cc7b3295ae158df5a7";
  const API_URL = "https://api.themoviedb.org/3/";

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  return data;
}

console.log(global.currentPage);

// Highlight Active Link
const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((link) => {
  if (link.getAttribute("href") === global.currentPage) {
    link.classList.add("active");
  }
});

// Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      console.log("Shows");
      break;
    case "/movie-details.html":
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      console.log("Shows Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);

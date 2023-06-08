const edamamApiId = "86f4703b"
const edamamApiKey = "857c62167ca70205938be7d4c0ea9e22"

// function getAutocompleteFood() {
//     const api = "https://api.edamam.com/auto-complete?app_id=86f4703b&app_key=857c62167ca70205938be7d4c0ea9e22&q=italian&limit=10";
//     const getFoodApi = fetch(api);
//     return getFoodApi;
// }

function fetchMovies(genreID) {
  const movieApiKey = "2f83b0344ec435557ea893d6df97bbfa";
  //get the genre id from user input
  //fetches a list of the current top 20 most popluar movies from chosen genre
  var genreID = $("#genres").val();
  var requestMovieUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' + movieApiKey + '&language=en-US&page=1&sort_by=popularity.desc&with_genres=' + genreID + '';
  fetch(requestMovieUrl)
  .then(function(response) {
    if (response.status === 404) {
        // location.replace("404.html");
        console.log("404");
        return;
    } else {
        return response.json();
    }
  })
  .then(function(data) {
    //log the list in console
    console.log(data);
    createMovieSuggestions(data);
  })
}

function createMovieSuggestions(data) {
  var movieSuggestions = [];
  // chooses 5 random movies from list in english with no duplicates
  for (i = 0; i < 20; i++) {
    var randomMovieNum = Math.floor(Math.random() * data.results.length);
    var newMovie = data.results[randomMovieNum].original_title;
    var newMovieLang = data.results[randomMovieNum].original_language;
    if (newMovieLang === 'en') {
      if (!movieSuggestions.includes(newMovie)) {
        movieSuggestions.push(newMovie);
      }
    }
    if (movieSuggestions.length == 5) {
      buildMovieList(movieSuggestions);
      return;
    }
  }
}

function buildMovieList(movies) {
    //displays the list of movies for our user to choose from
  $("#movie-list").empty();
  for (i in movies) {
    var addRadioEl = "";
    addRadioEl += '<p><label for="' + movies[i] + '">';
    addRadioEl += '<input name="movie" type="radio"/>';
    addRadioEl += '<span>' + movies[i] + '</span>';
    addRadioEl += '</label></p>'
    $("#movie-list").append(addRadioEl);
  }
  return;
}

function saveMovie() {
    //save the movie to localstorage and list it
    
}

function clearHistory() {
//clear local storage and clear saved list
}

$("#genreBtn").click(fetchMovies);


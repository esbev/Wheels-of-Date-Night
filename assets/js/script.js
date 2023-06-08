// const edamamApiId = "86f4703b"
// const edamamApiKey = "857c62167ca70205938be7d4c0ea9e22"

// function getAutocompleteFood() {
//   const api = "https://api.edamam.com/api/recipes/v2?type=any&app_id=" + edamamApiId + "&app_key=" + edamamApiKey + "&cuisineType=Italian";
//     const getFoodApi = fetch(api);
//     return getFoodApi;
// }

function fetchMovies(genreID) {
  const TMDBApiKey = "2f83b0344ec435557ea893d6df97bbfa";
  //get the genre id from user input
  //fetches a list of the current top 20 most popluar movies from chosen genre
  var genreID = $("#genres").val();
  var movieApi = 'https://api.themoviedb.org/3/discover/movie?api_key=' + TMDBApiKey + '&language=en-US&page=1&sort_by=popularity.desc&with_genres=' + genreID + '';
  fetch(movieApi)
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
    createMovieSuggestions(data);
  })
}

function createMovieSuggestions(data) {
  var movieSuggestions = [];
  // chooses 5 random movies from list in english with no duplicates
  while (movieSuggestions.length < 5) {
    var randomMovieNum = Math.floor(Math.random() * data.results.length);
    var newMovie = data.results[randomMovieNum].original_title;
    var newMovieLang = data.results[randomMovieNum].original_language;
    if (newMovieLang === 'en') {
      if (!movieSuggestions.includes(newMovie)) {
        movieSuggestions.push(newMovie);
      }
    }
  }
  buildMovieList(movieSuggestions);
  return;
}

function buildMovieList(movies) {
  //displays the list of movies for our user to choose from, sets first listed movie as default checked
$("#movie-list").empty();
for (i in movies) {
  var addRadioBtn = "";
  addRadioBtn += '<p><label>';
  if (i == 0) {
    addRadioBtn += '<input name="movie" type="radio" value="' + movies[i] + '"checked/>';
  } else {
    addRadioBtn += '<input name="movie" type="radio" value="' + movies[i] + '"/>';
  }
  addRadioBtn += '<span>' + movies[i] + '</span>';
  addRadioBtn += '</label></p>'
  $("#movie-list").append(addRadioBtn);
}
return;
}

function save() {
  var selectedMovie = ($('input[name=movie]:checked').val());
  var addEl = '<p>' + selectedMovie + '</p>';
  $("#saved-list").append(addEl);
  $("#movie-list").empty();

  //to do: save cuisine and movie to localstorage and list for previous dates history
  
}

function clear() {
  $("#saved-list").empty();
// to do: clear local storage and clear saved list
}

$("#genreBtn").click(fetchMovies);
$("#saveBtn").click(save);
$("#clearBtn").click(clear);

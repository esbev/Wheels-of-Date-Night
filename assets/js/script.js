// const edamamApiId = "86f4703b"
// const edamamApiKey = "857c62167ca70205938be7d4c0ea9e22"

// function getAutocompleteFood() {
//   const api = "https://api.edamam.com/api/recipes/v2?type=any&app_id=" + edamamApiId + "&app_key=" + edamamApiKey + "&cuisineType=Italian";
//     const getFoodApi = fetch(api);
//     return getFoodApi;
// }
const today = dayjs().format("MMM D, YYYY");
var dishPlaceHolder = "Yummy Food";
var previousDates = [];

function initialize() {
  loadPreviousDates();
}

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
  $("#saveBtn").removeClass("disabled");
  return;
}

function save() {
  var newDate = [];
  var selectedMovie = ($('input[name=movie]:checked').val());
  $("#movie-list").empty();

//convert this to table elements
  var addDateEl ="";
  addDateEl += '<p>' + today + ', ' + dishPlaceHolder + ', ' + selectedMovie + '</p>';
  $("#saved-list").append(addDateEl);

  var theDate = {
    date: today,
    dish: dishPlaceHolder,
    movie: selectedMovie
  }
  
  newDate.push(theDate);
  localStorage.setItem("dates", JSON.stringify(newDate));
  console.log(localStorage);
  $("#saveBtn").addClass("disabled");
  //to do: save cuisine and movie to localstorage and list for previous dates history
}

function clear() {
  $("#saved-list").empty();
  localStorage.clear();
}

function loadPreviousDates() {
  // console.log(localStorage);
  // previousDates = JSON.parse(window.localStorage.getItem("dates"));
  // console.log(previousDates);
  // for (i in previousDates) {
  //   var addDateEl = "";
  //   addDateEl += '<p>' + previousDates[i].date + ', ' + previousDates[i].dish + ', ' + previousDates[i].movie + '</p>';
  //   $("#saved-list").append(addDateEl);
  // }
}


initialize();
$("#selectBtn").click(fetchMovies);
$("#saveBtn").click(save);
$("#clearBtn").click(clear);

// const edamamApiId = "86f4703b"
// const edamamApiKey = "857c62167ca70205938be7d4c0ea9e22"

// function getAutocompleteFood() {
//   const api = "https://api.edamam.com/api/recipes/v2?type=any&app_id=" + edamamApiId + "&app_key=" + edamamApiKey + "&cuisineType=Italian";
//     const getFoodApi = fetch(api);
//     return getFoodApi;
// }

//-------------movie variables
var dishPlaceHolder = "Yummy Food";
var theDate = [];
//-------------wheel variables
let wheel1 = document.querySelector('.wheel1');
let spinBtn1 = document.querySelector('.spinBtn1');
let wheel2 = document.querySelector('.wheel2');
let spinBtn2 = document.querySelector('.spinBtn2');

function initialize() {
  loadPreviousDates();
}

function fetchMovies(genreID) {
  const TMDBApiKey = "2f83b0344ec435557ea893d6df97bbfa";
  //get the genre id from user input
  //fetches from the current top 100 most popluar movies from chosen genre
  var genreID = $("#genres").val();
  var movieListPage = Math.ceil(Math.random() * 5);
  var movieApi = 'https://api.themoviedb.org/3/discover/movie?api_key=' + TMDBApiKey + '&language=en-US&page=' + movieListPage + '&sort_by=popularity.desc&with_genres=' + genreID + '';
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
    //displays the list of movies for our user to choose from, sets first listed movie as default selected
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
  var selectedMovie = ($('input[name=movie]:checked').val());
  $("#movie-list").empty();

//to do: convert this to table elements
  var addDateEl ="";
  //issue: localstorage won't save more than one entry if there are 3 or more items in the array pushed
  // addDateEl += '<p>' + today + ', ' + dishPlaceHolder + ', ' + selectedMovie + '</p>';
  addDateEl += '<p>' + dishPlaceHolder + ', ' + selectedMovie + '</p>';
  $("#saved-list").append(addDateEl);

  var newDate = {
    dish: dishPlaceHolder,
    movie: selectedMovie
  }
  
  theDate.push(newDate);
  localStorage.setItem("dates", JSON.stringify(theDate));
  $("#saveBtn").addClass("disabled");
}

function clear() {
  $("#saved-list").empty();
  theDate = [];
  localStorage.clear();
}

function loadPreviousDates() {
  var previousDates = JSON.parse(window.localStorage.getItem("dates"));

  for (i in previousDates) {
    var addDateEl = "";
    addDateEl += '<p>' + previousDates[i].dish + ', ' + previousDates[i].movie + '</p>';
    $("#saved-list").append(addDateEl);
  }
}

initialize();
$("#genres").change(fetchMovies);
$("#saveBtn").click(save);
$("#clearBtn").click(clear);

spinBtn1.onclick = function(){
    let value = Math.ceil(Math.random() * 3600);
    wheel1.style.transform = "rotate(" + value + "deg)"
    value += Math.ceil(Math.random() * 6600);
}
spinBtn2.onclick = function(){
    let value = Math.ceil(Math.random() * 3600);
    wheel2.style.transform = "rotate(" + value + "deg)"
    value += Math.ceil(Math.random() * 6600);
}

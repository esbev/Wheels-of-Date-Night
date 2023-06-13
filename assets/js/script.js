
//-------------movie variables
var theDate = [];
//-------------wheel variables
let wheel1 = document.querySelector('.wheel1');
let spinBtn1 = document.querySelector('.spinBtn1');
let wheel2 = document.querySelector('.wheel2');
let spinBtn2 = document.querySelector('.spinBtn2');

function initialize() {
  loadPreviousDates();
}

function fetchFood() {
  var cuisineID = $("#cuisine").val();
  var spoonApiKey = "7a94090b0a5346439ced2e2654e068d9";
  var foodList = 5;
  const foodApi = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + spoonApiKey + "&cuisine=" + cuisineID + "&number=" + foodList + "";
  fetch(foodApi)
    .then(function(response) {
      console.log(response)
      if (response.status === 404) {
          console.log("404");
          return;
      } else {
          return response.json();
      }
    })
    .then(function(data) {
      createFoodSuggestions(data);
    })
  console.log(foodApi)
  }

function createFoodSuggestions(data) {
  var foodSuggestions = [];
  // chooses 5 random foods with no duplicates
  while (foodSuggestions.length < 5) {
    var randomFoodOption = Math.floor(Math.random() * data.results.length);
    var newFood = data.results[randomFoodOption].title;
  if (!foodSuggestions.includes(newFood)) {
    foodSuggestions.push(newFood);
    }
  }
  buildFoodList(foodSuggestions);
}


function buildFoodList(food) {
  //displays the list of movies for our user to choose from, sets first listed movie as default selected
$("#food-list").empty();
for (var i = 0; i < food.length; i++) {
  var addRadioBtn = "";
  addRadioBtn += '<p><label>';
  if (i == 0) {
    addRadioBtn += '<input name="title" type="radio" value="' + food[i] + '"checked/>';
  } else {
    addRadioBtn += '<input name="title" type="radio" value="' + food[i] + '"/>';
  }
  addRadioBtn += '<span>' + food[i] + '</span>';
  addRadioBtn += '</label></p>'
  $("#food-list").append(addRadioBtn);
}
$("#saveBtn").removeClass("disabled");
// return;
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
  var selectedFood = ($('input[title=food]:checked').val());
  $("#food-list").empty();
  $("#movie-list").empty();

//to do: convert this to table elements
  var addDateEl ="";
  //issue: localstorage won't save more than one entry if there are 3 or more items in the array pushed
  addDateEl += '<p>' + today + ', ' + selectedFood + ', ' + selectedMovie + '</p>';
  addDateEl += '<p>' + selectedFood + ', ' + selectedMovie + '</p>';
  $("#saved-list").append(addDateEl);

  var newDate = {
    dish: selectedFood,
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
$("#cuisine").change(fetchFood);
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

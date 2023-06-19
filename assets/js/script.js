var theDate = [];

function initialize() {
  loadPreviousDates();
}

//---food API + fetch&pop 
function fetchFood(cuisineID) {
  var spoonApiKey = "7a94090b0a5346439ced2e2654e068d9";
  var foodList = 5;
  const foodApi = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + spoonApiKey + "&cuisine=" + cuisineID + "&number=" + foodList + "";
  fetch(foodApi)
    .then(function(response) {
      if (response.status === 404) {
        location.replace("404.html");
        return;
      } else {
          return response.json();
      }
    })
    .then(function(data) {
      createFoodSuggestions(data);
    })
}

function createFoodSuggestions(data) {
  var foodSuggestions = [];
  while (foodSuggestions.length < 5) {
    var randomFoodOption = Math.floor(Math.random() * data.results.length);
    var newFood = data.results[randomFoodOption].title;
  if (!foodSuggestions.includes(newFood)) {
    foodSuggestions.push(newFood);
    }
  }
  populateFoodList(foodSuggestions);
}

function populateFoodList(food) {
  $("#dish-label").text("Choose " + wheelCuisine + " Dish");
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
  $("#acceptBtn").removeClass("disabled");
}

//---movie API + fetch&pop 
function fetchMovies(genreID) {
  const TMDBApiKey = "2f83b0344ec435557ea893d6df97bbfa";
  var movieListPage = Math.ceil(Math.random() * 5);
  var movieApi = 'https://api.themoviedb.org/3/discover/movie?api_key=' + TMDBApiKey + '&language=en-US&page=' + movieListPage + '&sort_by=popularity.desc&with_genres=' + genreID + '';
  fetch(movieApi)
  .then(function(response) {
    if (response.status === 404) {
      location.replace("404.html");
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
  populateMovieList(movieSuggestions);
}

function populateMovieList(movies) {
  $("#movie-label").text("Choose " + wheelGenreLabel + " Movie");
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
  $("#acceptBtn").removeClass("disabled");
}

//---creating list elements from value of food and movie options + saving populated choices to localStorage
function acceptAndSave() {
  var selectedFood = ($('input[name=title]:checked').val());
  var selectedMovie = ($('input[name=movie]:checked').val());
  resetLists();

  var addDateEl = '<tr><td>' + selectedFood + '</td><td>' + selectedMovie + '</td></tr>';
  $("#saved-list").append(addDateEl);

  var newDate = {
    dish: selectedFood,
    movie: selectedMovie
  }
  
  theDate.push(newDate);
  localStorage.setItem("dates", JSON.stringify(theDate));
  $("#acceptBtn").addClass("disabled");
}

function resetLists() {
  $("#dish-label").text("Choose Dish");
  $("#movie-label").text("Choose Movie");
  $("#food-list").empty();
  $("#movie-list").empty();
  for (i=1; i<=5; i++) {
    $("#food-list").append('<p><label><input type="radio" disabled/><span>_______________</span></label></p></input>');
    $("#movie-list").append('<p><label><input type="radio" disabled/><span>_______________</span></label></p></input>');
  }
}

//---clear button functionality
function clear() {
  $("#saved-list").empty();
  theDate = [];
  localStorage.clear();
}

//---displaying saved options from localStorage to the page
function loadPreviousDates() {
  var previousDates = JSON.parse(window.localStorage.getItem("dates"));

  for (i in previousDates) {
    var addDateEl = '<tr><td>' + previousDates[i].dish + '</td><td>' + previousDates[i].movie + '</td></tr>';
    $("#saved-list").append(addDateEl);
  }
}

///---wheels and spinning + value generator
let wheel1 = document.querySelector('.wheel1');
let wheel2 = document.querySelector('.wheel2');
var wheelCuisine = "";
var wheelGenreId = "";
var wheelGenreLabel = "";
const rotationValues = [
  {minDegree: 0, maxDegree: 9, label: "Chinese"},
  {minDegree: 10, maxDegree: 45, label: "Thai"},
  {minDegree: 46, maxDegree: 81,  label: "American"},
  {minDegree: 82, maxDegree: 117, label: "Italian"},
  {minDegree: 118, maxDegree: 153, label: "Indian"},
  {minDegree: 154, maxDegree: 189, label: "Japanese"},
  {minDegree: 190, maxDegree: 225, label: "French"},
  {minDegree: 226, maxDegree: 261, label: "Spanish"},
  {minDegree: 262, maxDegree: 297, label: "Greek"},
  {minDegree: 298, maxDegree: 333, label: "Caribbean"},
  {mindegree: 334, maxDegree: 360, label: "Chinese"}
];
const rotationValues2 = [
  {minDegree: 0, maxDegree: 9, value: 10749, label: "Romance"},
  {minDegree: 10, maxDegree: 45, value: 35, label: "Comedy"},
  {minDegree: 46, maxDegree: 81,  value: 28, label: "Action"},
  {minDegree: 82, maxDegree: 117, value: 27, label: "Horror"},
  {minDegree: 118, maxDegree: 153, value: 18, label: "Drama"},
  {minDegree: 154, maxDegree: 189, value: 9648, label: "Mystery"},
  {minDegree: 190, maxDegree: 225, value: 10751, label: "Family"},
  {minDegree: 226, maxDegree: 261, value: 12, label: "Adventure"},
  {minDegree: 262, maxDegree: 297, value: 53, label: "Thriller"},
  {minDegree: 298, maxDegree: 333, value: 878, label: "Sci-Fi"},
  {mindegree: 334, maxDegree: 360, value: 10749, label: "Romance"}
];
let count = 0;
let count2 = 0;
let resultValue = 41;
let resultValue2 = 51;
var isEnabled;
var isEnabled2;

function spinWheel1() {
  let randomDegree = Math.floor(Math.random() * 355);
  var degreeAccumulator = 0;
  let rotationInterval = window.setInterval(() => {
    degreeAccumulator = degreeAccumulator + resultValue;    
    wheel1.style.transform = "rotate(" + degreeAccumulator + "deg)";
    if (degreeAccumulator >= 360) {
      count++;
      resultValue -= 5;
      degreeAccumulator = 0;
    } else if (count > 6 && degreeAccumulator == randomDegree) {
      valueGenerator(randomDegree);
      enableSpinBtn();
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 41;
    }
  }, 10);
};

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      wheelCuisine = i.label;
      $("#cuis").text(wheelCuisine);
      isEnabled = true;
      break;
    }
  }
};

function spinWheel2() {
  let randomDegree = Math.floor(Math.random() * 355);
  var degreeAccumulator = 0;
  let rotationInterval = window.setInterval(() => {
    degreeAccumulator = degreeAccumulator + resultValue2;    
    wheel2.style.transform = "rotate(" + degreeAccumulator + "deg)";
    if (degreeAccumulator >= 360) {
      count2++;
      resultValue2 -= 5;
      degreeAccumulator = 0;
    } else if (count2 > 8 && degreeAccumulator == randomDegree) {
      valueGenerator2(randomDegree);
      enableSpinBtn();
      clearInterval(rotationInterval);
      count2 = 0;
      resultValue2 = 51;
    }
  }, 10);
};

const valueGenerator2 = (angleValue) => {
  if (angleValue <= 180){
    angleValue += 180;
  } else {
    angleValue -= 180;
  }
  for (let x of rotationValues2) {
    if (angleValue >= x.minDegree && angleValue <= x.maxDegree) {
      wheelGenreId = x.value;
      wheelGenreLabel = x.label;
      $("#gen").text(wheelGenreId);
      isEnabled2 = true;
      break;
    }
  }
};

function enableSpinBtn() {
  if (isEnabled && isEnabled2) {
    $("#spinBtn").removeClass("disabled");
    isEnabled = false;
    isEnabled2 = false;
    console.log(wheelCuisine + ", " + wheelGenreLabel);
    fetchFood(wheelCuisine);
    fetchMovies(wheelGenreId);
  }
};

initialize();
$("#spinBtn").on("click", () => {
  $("#spinBtn").addClass("disabled");
  $("#acceptBtn").addClass("disabled");
  resetLists();
  spinWheel1();
  spinWheel2();
});
$("#acceptBtn").click(acceptAndSave);
$("#clearBtn").click(clear);

// bed1a6ff22823f98181f2f55bd6f37ae
$(document).ready(function(){
// risultato chiamata (singolo oggetto)
// {
//         "popularity": 2.177,
//         "id": 114657,
//         "video": false,
//         "vote_count": 3,
//         "vote_average": 6.7,
//         "title": "The Gladiator",
//         "release_date": "1986-02-03",
//         "original_language": "en",
//         "original_title": "The Gladiator",
//         "genre_ids": [
//             53,
//             28,
//             18,
//             10770
//         ],
//         "backdrop_path": "/zpPhUVOuelvwgyYy5AqS9qAP0Ei.jpg",
//         "adult": false,
//         "overview": "A road warrior vigilante avenges his brother's death at the hands of a crazy motorist by using his souped-up pickup to apprehend drunken drivers and others who abuse their driving privileges.",
//         "poster_path": "/asLJl7huJVgoXeca8aAlmywU9YQ.jpg"
//     },

$.ajax( {
  url: "https://api.themoviedb.org/3/search/movie",   method: "GET",
  data: {
    api_key: 'bed1a6ff22823f98181f2f55bd6f37ae',
    query: 'the gladiator'
  },
  success: function (data) {
    printData(data);
  },
  error: function (request, state, error) {
    alert("E' avvenuto un errore. " + error);
    console.log(error);
  }
});

// prnedo il value dalla searbar al click
$(document).on('click', 'button', function(){
  console.log('ciao');
});

// FUNCTIONS ------------------>
function printData(movie){

  var movie_data = movie.results;
  var source = $("#movie-template").html()
  var template = Handlebars.compile(source);

  for (var i = 0; i < movie_data.length; i++) {
    var context = {
      title: movie_data[i].title,
      original_title: movie_data[i].original_title,
      original_language: movie_data[i].original_language,
      vote_average: movie_data[i].vote_average
    }
    var html = template(context);
    $('.movies_list').append(html);
  }
}
});

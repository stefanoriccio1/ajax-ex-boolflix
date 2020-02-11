// bed1a6ff22823f98181f2f55bd6f37ae
$(document).ready(function(){

  // prendo il value dalla searbar al click
  $(document).on('click', 'button', function(){
    var input_value = $('.search_input').val();
    var movie_list = $('.movies_list');
    var tv_series_list = $('.tv_series_list');
    var api_key = 'bed1a6ff22823f98181f2f55bd6f37ae';
    var urlMovies = "https://api.themoviedb.org/3/search/movie";
    var urlTvSeries = "https://api.themoviedb.org/3/search/tv";
    var typeMovie = 'film';
    var typeTvSeries = 'tv';

    getData(input_value, api_key, urlMovies, typeMovie,'.movie_list');
    getData(input_value, api_key, urlTvSeries, typeTvSeries, '.tv_series_list');

    resetSearch('.search_input', movie_list, tv_series_list);

  });

  $('.search_input').keypress(function(event){
   console.log(alert('ehy'));
  });
});

// FUNCTIONS ------------------>

// funzione di print generica
function printResults(type, results){
  var source = $("#movie-template").html()
  var template = Handlebars.compile(source);
  var title;
  var originalTitle;

  for (var i = 0; i < results.length; i++) {
    thisResult = results[i];
    if (type == 'film') {
      originalTitle = thisResult.original_title;
      title = thisResult.title;
      var container = $('.movies_list');
    }
    else if (type == 'tv'){
      originalTitle = thisResult.original_name;
      title = thisResult.name;
      var container = $('.tv_series_list');
    }

    var poster = thisResult.poster_path;
    var language = thisResult.original_language;
    if (language != 'it' && language != 'en' && language != 'fr'){
      language=''
    };
    var context = {
      type: thisResult.type,
      title: thisResult.name,
      original_title: thisResult.original_name,
      original_language: thisResult.original_language,
      vote_average: printStars(thisResult.vote_average),
      src: 'img/bandiera-'+language+'.png',
      poster_path: printPoster(poster)
    };
    var html = template(context);
    container.append(html);
  }
};

// funzione per no results nella chiamata
function printNoResults(data){
  var movie_data = data.results;
  var source = $("#no-results-template").html()
  var template = Handlebars.compile(source);

  var html = template();
  $('.movies_list').append(html);
  $('.tv_series_list').append(html);

}

// funzione chiamata Ajax
function getData(string, api_key, url, type, container){
    $.ajax( {
      url: url,
      method: "GET",
      data: {
        api_key: api_key,
        query: string,
        language: 'it-IT'
      },
      success: function (data) {
        if (data.total_results > 0){
          var results = data.results;
          printResults(type, results);
        }
        else{
          resetSearch('.search_input', container)
          printNoResults(data);
        }

      },
      error: function (request, state, error) {
        alert("E' avvenuto un errore. " + error);
        console.log(error);
      }
    });
};

// funzione per cancellare i campi
function resetSearch (input, container, container2){
  $(input).val('');
  $(container).html('');
  $(container2).html('')
}

// funzione per trasfromare voti in stelle
function printStars (num){
  var vote = Math.ceil(num/2);
  var result ="";

 for (var i = 1; i <= 5; i++) {
   if (i <= vote){
     result += '<i class="fas fa-star"></i>';
   }
   else{
    result += '<i class="far fa-star"></i>';
   }
 };
 return result
};

// funzione per stampare le copertine
function printPoster(playbill){
  var string='https://image.tmdb.org/t/p/w185'
  if (playbill != null){
    string += playbill;
  }
  else{
    string ='img/not_found_2.jpg';
  }
  return string
}


// conservo vecchio lavoro------->

// funzione che stampa le serieTv
// function printTveSeries(tv){
//
//   var tv_data = tv.results;
//   var source = $("#movie-template").html()
//   var template = Handlebars.compile(source);
//
//
//   for (var i = 0; i < tv_data.length; i++) {
//     var poster = tv_data[i].poster_path;
//     var language = tv_data[i].original_language;
//     if (language != 'it' && language != 'en' && language != 'fr'){
//       language=''
//     };
//     var context = {
//       title: tv_data[i].name,
//       original_title: tv_data[i].original_name,
//       original_language: tv_data[i].original_language,
//       vote_average: printStars(tv_data[i].vote_average),
//       src: 'img/bandiera-'+language+'.png',
//       poster_path: printPoster(poster)
//     };
//     var html = template(context);
//     $('.tv_series_list').append(html);
//   }
// };

// funzione che stampa i film
// function printData(movie){
//
//   var movie_data = movie.results;
//   var source = $("#movie-template").html()
//   var template = Handlebars.compile(source);
//
//
//   for (var i = 0; i < movie_data.length; i++) {
//     var language = movie_data[i].original_language;
//     var poster = movie_data[i].poster_path;
//
//     if (language != 'it' && language != 'en' && language != 'fr'){
//       language=''
//     };
//     var context = {
//       title: movie_data[i].title,
//       original_title: movie_data[i].original_title,
//       original_language: movie_data[i].original_language,
//       vote_average: printStars(movie_data[i].vote_average),
//       src: 'img/bandiera-'+language+'.png',
//       poster_path:printPoster(poster)
//     };
//
//     var html = template(context);
//     $('.movies_list').append(html);
//   }
// };

// funzione che fa chiamata ajax per i film
// function getMovies(string){
//   $.ajax( {
//     url: "https://api.themoviedb.org/3/search/movie",   method: "GET",
//     data: {
//       api_key: 'bed1a6ff22823f98181f2f55bd6f37ae',
//       query: string,
//       language: 'it-IT'
//     },
//     success: function (data) {
//       var film = data.results;
//       if (data.total_results > 0){
//         printResults('film', film);
//       }
//       else{
//         resetSearch('.search_input', '.movies_list')
//         printNoResults(data);
//       }
//
//     },
//     error: function (request, state, error) {
//       alert("E' avvenuto un errore. " + error);
//       console.log(error);
//     }
//   });
// };

// funzione per chiamare serie TV
// function getTvSeries(string){
//   $.ajax( {
//     url: "https://api.themoviedb.org/3/search/tv",   method: "GET",
//     data: {
//       api_key: 'bed1a6ff22823f98181f2f55bd6f37ae',
//       query: string,
//       language: 'it-IT'
//     },
//     success: function (data) {
//       if (data.total_results > 0){
//         var tv = data.results;
//         printResults('tv', tv);
//       }
//       else{
//         resetSearch('.search_input', '.tv_series_list')
//         printNoResults(data);
//       }
//
//     },
//     error: function (request, state, error) {
//       alert("E' avvenuto un errore. " + error);
//       console.log(error);
//     }
//   });
// };

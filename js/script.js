// bed1a6ff22823f98181f2f55bd6f37ae
$(document).ready(function(){

  // prendo il value dalla searbar al click
  $(document).on('click', 'button', function(){
    var input_value = $('.search_input').val();
    var movie_list = $('.movies_list');

    getMovies(input_value);

    resetSearch('.search_input', movie_list);

  });

});

// FUNCTIONS ------------------>
// funzione che stampa i film
function printData(movie){

  var movie_data = movie.results;
  var source = $("#movie-template").html()
  var template = Handlebars.compile(source);

  for (var i = 0; i < movie_data.length; i++) {
    var language = movie_data[i].original_language;
    if (language != 'it' && language != 'en' && language != 'fr'){
      language=''
    };
    var context = {
      title: movie_data[i].title,
      original_title: movie_data[i].original_title,
      original_language: movie_data[i].original_language,
      vote_average: printStars(movie_data[i].vote_average),
      src: 'img/bandiera-'+language+'.png',
    };


    var html = template(context);
    $('.movies_list').append(html);
  }
};

// funzione che fa chiamata ajax
function getMovies(string){
  $.ajax( {
    url: "https://api.themoviedb.org/3/search/movie",   method: "GET",
    data: {
      api_key: 'bed1a6ff22823f98181f2f55bd6f37ae',
      query: string,
      language: 'it-IT'
    },
    success: function (data) {
      if (data.total_results > 0){
        printData(data);
      }
      else{
        resetSearch('.search_input', '.movies_list')
        printNoResults(data);
      }

    },
    error: function (request, state, error) {
      alert("E' avvenuto un errore. " + error);
      console.log(error);
    }
  });
};
// funzione per no results nella chiamata
function printNoResults(data){
  var movie_data = data.results;
  var source = $("#no-results-template").html()
  var template = Handlebars.compile(source);

  var html = template();
  $('.movies_list').append(html);

}
// funzione per cancellare i campi

function resetSearch (input, container){

  $(input).val('');
  $(container).html('');
}

// funzione per trasfromare voti in stelle
function printStars (num){
  var vote = Math.ceil(num/2);
  console.log(vote);
  var result ="";

 for (var i = 1; i <= 5; i++) {

   if (i <= num){
     result += '<i class="fas fa-star"></i>';
   }
   else{
    result += '<i class="far fa-star"></i>';
   }
 };
 return result
};

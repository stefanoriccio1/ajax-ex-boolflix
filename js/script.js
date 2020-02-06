// bed1a6ff22823f98181f2f55bd6f37ae
$(document).ready(function(){
  // $.ajax( {
  //   url: "https://api.themoviedb.org/3/search/movie",   method: "GET",
  //   data: {
  //     api_key: 'bed1a6ff22823f98181f2f55bd6f37ae',
  //     query: 'the gladiator'
  //   },
  //   success: function (data) {
  //     printData(data);
  //   },
  //   error: function (request, state, error) {
  //     alert("E' avvenuto un errore. " + error);
  //     console.log(error);
  //   }
  // });

  // prnedo il value dalla searbar al click
  $(document).on('click', 'button', function(){
    var input_value = $('.search_input').val();

    $.ajax( {
      url: "https://api.themoviedb.org/3/search/movie",   method: "GET",
      data: {
        api_key: 'bed1a6ff22823f98181f2f55bd6f37ae',
        query: input_value
      },
      success: function (data) {
        printData(data);
      },
      error: function (request, state, error) {
        alert("E' avvenuto un errore. " + error);
        console.log(error);
      }
    });

    $('.search_input').val('');
    $('.movies_list').text('');
  });
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
};

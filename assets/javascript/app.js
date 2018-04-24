var movieTitle = ['The Little Mermaid', 'Moana', 'Tangled', 'Frozen', 'Big Hero 6', 'Toy Story', 'Snow White', 'Sleeping Beauty', 'The Lion King', 'Aladdin', 'Fantasia', 'Bambi', 'Finding Nemo', 'Pocahontas', 'Tarzan', 'Mulan', 'Beauty and the Beast'];
var currentGif; var pausedGif; var animatedGif; var stillGif;

// function to make the buttons
function createButtons(){
	$('#MovieButtons').empty();
	for(var i = 0; i < movieTitle.length; i++){
		var movieBtn = $('<button>').text(movieTitle[i]).addClass('movieBtn').attr({'data-name': movieTitle[i]});
		$('#MovieButtons').append(movieBtn);
	}

	//displays gifs on click
	$('.movieBtn').on('click', function(){
		$('.display').empty();

		var thisMovie = $(this).data('name');
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + thisMovie + "&limit=10&api_key=4ycT8GANndYTkksE8pDSsh9qEzEiBGfU";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnClick');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on click
$('<img>').on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-paused"));
        $(this).attr("data-state", "still");
      }
    });


//sets a button from input
$('#addMovie').on('click', function(){
	var newMovie = $('#newMovieInput').val().trim();
	movieTitle.push(newMovie);
	createButtons();
	return false;
});

createButtons();
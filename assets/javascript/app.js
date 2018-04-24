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

		var thisShow = $(this).data('name');
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + thisShow + "&limit=10&api_key=4ycT8GANndYTkksE8pDSsh9qEzEiBGfU";
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

//animates and pauses gif on hover, need to change to onclick play/pause
$(document).on('click','.playOnClick', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('toggle','.playOnClick', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });


//sets a button from input
$('#addMovie').on('click', function(){
	var newShow = $('#newMovieInput').val().trim();
	movieTitle.push(newShow);
	createButtons();
	return false;
});

createButtons();
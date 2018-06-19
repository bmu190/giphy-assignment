$(document).ready(function () {

	var autos = ['Tesla', 'Cannondale', 'Audi', 'Buggy'];

	function gifButtons() {

		$('#carButtons').empty();

		for (var i = 0; i < autos.length; i++) {

			var a = $('<button>');
			a.addClass('vehicle');
			a.attr('data-name', autos[i]);
			a.attr('src', $(this).data('animate'));
			a.attr('data-state'), $(this).attr('data-state', 'animate');
			a.text(autos[i]);
			$('#carButtons').append(a);

		}
	}

	$('#addButton').on('click', function () {
	    var vehicle = $('#input').val().trim();
		autos.push(vehicle);
		gifButtons();
		return false;
	});

	// $('#addButton').on('submit', function () {
		
			$("#addButton").on('submit', function (event) {

			var vehicle = $('input').val().trim();
			autos.push(vehicle);
			return false;
		});

		gifButtons();

		// The next section performs the search and returns the GIFs

		$(document).on('click', '.vehicle', function () {
			var vehicle = $(this).data('name');
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + vehicle + "&api_key=sbCCs1oe14TSZtx91mvw72p9V4bvpPwM&limit=10";

			$.ajax({
				url: queryURL,
				method: 'GET'
			})
				.done(function (response) {

					console.log(queryURL);
					console.log(response);
					var results = response.data;

					$('#showGiphy').empty();
					for (var i = 0; i < results.length; i++) {

						var vehicleDiv = $('<div class="gifDisplay">');
						var b = $('<h1>').text("Rating: " + results[i].rating);
						var vehicleImage = $('<img>');

						vehicleImage.attr('src', results[i].images.fixed_height_still.url);
						vehicleImage.attr('data-still', results[i].images.fixed_height_still.url);
                        vehicleImage.attr('data-animate', results[i].images.fixed_height.url);
                        vehicleImage.attr('data-state', 'still');
						vehicleImage.addClass('vehicleGif');
						vehicleDiv.append(b);
						vehicleDiv.append(vehicleImage);
						vehicleDiv.prepend(b);
						vehicleDiv.prepend(vehicleImage);
						
						$('#showGiphy').prepend(vehicleDiv);

					}
					
					$('#showGiphy').on('click', '.vehicleGif', function () {

						var state = $(this).attr('data-state');
						var animate = $(this).attr('data-animate');
						var still = $(this).attr('data-still');
						if (state == 'still') {
							$(this).attr('src', animate);
							$(this).attr('data-state', 'animate');
						} else {
							$(this).attr('src', still);
							$(this).attr('data-state', 'still');
						}
									
					});
						
				});
		});
	});
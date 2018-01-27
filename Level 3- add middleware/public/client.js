  /*global $*/
  $(function() {
  	$.get('/cities', appendToList);

  	function appendToList(cities) {
  		var listOfCities = [];
  		var content, oneCity;
  		for (var i in cities) {
  			oneCity = cities[i];
  			content = '<a href="/cities/' + oneCity + '">' + oneCity + '</a>' + // + // example on how to serve static images
  				' <a href="#" data-city="' + oneCity + '">' + '<img src="delete.png" width="15px"></a>';
  			listOfCities.push($('<li>', {
  				html: content
  			}));
  		}
  		$('#cityList').append(listOfCities);
  	}
  	$('#cityList').on('click', 'a[data-city]', function(event) {
  		if (!confirm('Are you sure ?')) {
  			return false;
  		}
  		var target = $(event.currentTarget);
  		$.ajax({
  			type: 'DELETE',
  			url: '/cities/' + target.data('oneCity')
  		}).done(function() {
  			target.parents('li').remove();
  		});
  	});
  	$('#add_city').on('Submit', function(event) {
  		event.preventDefault();
  		var form = $(this);
  		var cityData = form.serialize();
  		$.ajax({
  			type: 'POST',
  			url: '/cities',
  			data: cityData
  		}).done(function(cityName) {
  			appendToList([cityName]);
  			form.trigger('reset');
  		}).fail(function(cityName) {
  			console.log('failed');
  		});
  	});
  });
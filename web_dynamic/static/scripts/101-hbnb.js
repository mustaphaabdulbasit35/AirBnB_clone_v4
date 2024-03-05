window.addEventListener('load', function () {
  // task 3
  $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // task 2
  const amenity_ids = {};
  $('.amenities input[type=checkbox]').click(function () {
    if ($(this).prop('checked')) {
      amenity_ids[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete amenity_ids[$(this).attr('data-id')];
    }
    if (Object.keys(amenity_ids).length === 0) {
      $('div.amenities h4').html('&nbsp;');
    } else {
      $('div.amenities h4').text(Object.values(amenity_ids).join(', '));
    }
  });

  const state_ids = {};
  const city_ids = {};
  // task 4
  $('.filters button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenity_ids),
        states: Object.keys(state_ids),
        cities: Object.keys(city_ids)
      })
    }).done(function (data) {
      $('section.places').empty();
      $('section.places').append('<h1>Places</h1>');
      for (const place of data) {
        const template = `<article>
          <div class="title">
          <h2>${place.name}</h2>
          <div class="price_by_night">
	  $${place.price_by_night}
	</div>
          </div>
          <div class="information">
          <div class="max_guest">
          <i class="fa fa-users fa-3x" aria-hidden="true"></i>

          <br />

	${place.max_guest} Guests

	</div>
          <div class="number_rooms">
          <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

          <br />

	${place.number_rooms} Bedrooms
	</div>
          <div class="number_bathrooms">
          <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
          <br />
	  ${place.number_bathrooms} Bathroom
	</div>
	  </div>
          <div class="description">
	  ${place.description}
	</div>
	  <div class="reviews">
	  <h2>Reviews <span class="reviewSpan" data-id="${place.id}">show</span></h2>
	  <ul>
	  </ul>
	  </div>

	</article> <!-- End 1 PLACE Article -->`;
        $('section.places').append(template);
      }
      // Task 7: get reviews for each place (add to the places post request for loop?)
      $('.reviewSpan').click(function (event) {
        $.ajax('http://0.0.0.0:5001/api/v1/places/' + $(this).attr('data-id') + '/reviews').done(function (data) {
//          console.log($(this).text());
	  $('span').addClass('hideReview');
//	  console.log($('span'));
//	  $('span').toggle('reviewSpan hideReview');
          if ($('.reviewSpan').text('show')) {
            for (const review of data) {
              $('.reviews ul').append(`<li>${review.text}</li>`);
            }
	    console.log($('.reviewSpan li'));
	    $('.hideReview').text('hide');
//	    console.log($('.hideReiew'));
          } else if ($('.hideReview').text('hide')){
            $('.reviews ul').empty();
	    $('.reviewSpan').text('show');
          }
        });
      });
    });
  });

  // task 6
  $('.stateCheckBox').click(function () {
    if ($(this).prop('checked')) {
      state_ids[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete state_ids[$(this).attr('data-id')];
    }
    if (Object.keys(state_ids).length === 0 && Object.keys(city_ids).length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(Object.values(state_ids).concat(Object.values(city_ids)).join(', '));
    }
  });

  $('.cityCheckBox').click(function () {
    if ($(this).prop('checked')) {
      city_ids[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete city_ids[$(this).attr('data-id')];
    }
    if (Object.keys(state_ids).length === 0 && Object.keys(city_ids).length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(Object.values(city_ids).concat(Object.values(state_ids)).join(', '));
    }
  });
});

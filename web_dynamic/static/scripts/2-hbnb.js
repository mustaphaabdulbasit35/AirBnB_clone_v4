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
  $('input[type=checkbox]').click(function () {
    if ($(this).prop('checked')) {
      amenity_ids[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete amenity_ids[$(this).attr('data-id')];
    }
    if (Object.keys(amenity_ids).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      $('div.amenities h4').text(Object.values(amenity_ids).join(', '));
    }
  });
});

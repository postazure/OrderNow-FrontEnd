$('form').on('submit', function (e) {
  e.preventDefault();
  getResults($('#search-field').val());
})

function getResults(searchTerms) {
  var query = compileSearchQuery(searchTerms)
  searchAdapter.index(query, function (res) {
    if (res.records_found) {
      setList(res.results)

    }else{
      $('#restaurant-index').html("<h1>Sorry No Results Found</h1>")
    }

  })
}

function compileSearchQuery(searchTerms) {
  return searchTerms.replace(/\s/g, "+")
}

function getCurrentTimes(restaurants) {
  $.each(restaurants, function (i, restaurant) {
    $.get(restaurant.source_url)
      .done(function (res) {

      //oa specific
      var default_prep_duration = res.default_prep_duration
      var additional_prep_duration = res.additional_prep_duration
      var max_delivery_time = res.max_delivery_time
      var min_delivery_time = res.min_delivery_time
      var average = (max_delivery_time + min_delivery_time)/2 + additional_prep_duration + default_prep_duration

      restaurant.delivery_time = average;
      $('.restaurant[data-id="'+restaurant.id+'"] .delivery-time').text(restaurant.delivery_time)

    })

  })

}

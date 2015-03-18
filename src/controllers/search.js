$('form').on('submit', function (e) {
  e.preventDefault();
  $('#search-field').parent(".search").addClass('loading')
  getResults($('#search-field').val());
  $('#search-field').blur()
})

function getResults(searchTerms) {
  var query = compileSearchQuery(searchTerms)
  searchAdapter.index(query, function (res) {
    if (res.records_found) {
      $('#search-field').parent(".search").removeClass('loading')
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
    if (restaurant.source_name === "Order Ahead") {
      orderAheadAdapter.deliveryTime(restaurant, setCurrentTime)
    }
  });
}

function setCurrentTime(restaurant) {
  $('.restaurant[data-id="'+restaurant.id+'"] .delivery-time').text(restaurant.delivery_time)
  $('.restaurant[data-id="'+restaurant.id+'"] .hidden').removeClass("hidden")
  $('.restaurant[data-id="'+restaurant.id+'"] .loader').remove()
  $('.restaurant[data-id="'+restaurant.id+'"]').data("deliveryTime", restaurant.delivery_time)
  orderList()
}

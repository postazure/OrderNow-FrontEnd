$('form').on('submit', function (e) {
  e.preventDefault();
  $('#search-field').parent(".search").addClass('loading')
  $("#restaurant-index").prepend("<div id='main-loader' class='ui active dimmer'><div class='ui loader'></div></div>")
  searchController.getResults($('#search-field').val());
  $('#search-field').blur()
})
//
// function getResults(searchTerms) {
//   var query = compileSearchQuery(searchTerms)
//   searchAdapter.index(query, function (res) {
//     if (res.records_found) {
//       window.resCount = res.results.length;
//       $('#search-field').parent(".search").removeClass('loading')
//       setList(res.results)
//     }else{
//       $('#restaurant-index').html("<h1 id='no-results'>Sorry No Results Found</h1>")
//       $("#main-loader").fadeOut();
//     }
//   })
// }
//
// function compileSearchQuery(searchTerms) {
//   return searchTerms.replace(/\s/g, "+")
// }
//
// function getCurrentTimes(restaurants) {
//   $.each(restaurants, function (i, restaurant) {
//     if (restaurant.source_name === "Order Ahead") {
//       orderAheadAdapter.deliveryTime(restaurant, setCurrentTime)
//     }
//   });
// }
//
// function setCurrentTime(restaurant) {
//   $('.restaurant[data-id="'+restaurant.id+'"] .delivery-time').text(restaurant.delivery_time)
//   $('.restaurant[data-id="'+restaurant.id+'"] .hidden').removeClass("hidden")
//   $('.restaurant[data-id="'+restaurant.id+'"] .loader').remove()
//   $('.restaurant[data-id="'+restaurant.id+'"]').data("deliveryTime", restaurant.delivery_time)
//   orderList()
// }

//  OO Version
var SearchController = function (oaAdapter) {
  this.oaAdapter = oaAdapter;
}

SearchController.prototype.getResults = function (searchTerms) {
  var query = this.compileSearchQuery(searchTerms)
  var _this = this;
  searchAdapter.index(query, function (res) {
    if (res.records_found) {
      window.resCount = res.results.length;
      $('#search-field').parent(".search").removeClass('loading')
      _this.setList(res.results)
    }else{
      $('#restaurant-index').html("<h1 id='no-results'>Sorry No Results Found</h1>")
      $("#main-loader").fadeOut();
    }
  });
};

SearchController.prototype.compileSearchQuery = function (searchTerms) {
  return searchTerms.replace(/\s/g, "+");
};

SearchController.prototype.getCurrentTimes = function (restaurants, cb) {
  var _this = this;
  $.each(restaurants, function (i, restaurant) {
    if (restaurant.source_name === "Order Ahead") {
      _this.oaAdapter.deliveryTime(restaurant, _this.setCurrentTime)
    }
    cb() //<--being called before data comes in, don't want to put in oaAdapter because of circular dependency
  });
}

SearchController.prototype.setCurrentTime = function (restaurant) {
  $('.restaurant[data-id="'+restaurant.id+'"] .delivery-time').text(restaurant.delivery_time)
  $('.restaurant[data-id="'+restaurant.id+'"] .hidden').removeClass("hidden")
  $('.restaurant[data-id="'+restaurant.id+'"] .loader').remove()
  $('.restaurant[data-id="'+restaurant.id+'"]').data("deliveryTime", restaurant.delivery_time)

}

SearchController.prototype.orderList = function () {
  console.log("ordering");
  var restaurantNodeList = $(".restaurant")
  restaurantNodeList.sort(function(a, b){
    return parseInt($(a).data("deliveryTime"))-parseInt($(b).data("deliveryTime"))
  });
  $("#restaurant-index").append(restaurantNodeList);
}

SearchController.prototype.setList = function (restaurants) {
  $.each(restaurants, function (i, restaurant) {
    restaurant.delivery_time = 75;  // default
    restaurant.valid_zone = true;   // default
  })

  this.getCurrentTimes(restaurants, this.orderList)
  var html = listTemplate({restaurants: restaurants});
  $('#restaurant-index').html(html)
}

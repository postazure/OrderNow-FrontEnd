var SearchController = function (oaAdapter) {
  this.oaAdapter = oaAdapter;
}

SearchController.prototype.getResults = function (searchTerms) {
  var query = this.compileSearchQuery(searchTerms)
  var _this = this;
  searchAdapter.index(query, function (res) {
    if (res.records_found) {
      $('#main-loader').remove();
      _this.setList(res.results)
    }else{
      $('#restaurant-index').html("<h1 id='no-results'>Sorry No Results Found</h1>")
      $("#main-loader").remove();
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
  });
}

SearchController.prototype.setCurrentTime = function (restaurant) {
  $('.restaurant[data-id="'+restaurant.id+'"] .delivery-time').text(restaurant.delivery_time)
  $('.restaurant[data-id="'+restaurant.id+'"] .hidden').removeClass("hidden")
  $('.restaurant[data-id="'+restaurant.id+'"] .loader').remove()
  $('.restaurant[data-id="'+restaurant.id+'"]').data("deliveryTime", restaurant.delivery_time)
  searchController.orderList() //needs to be decoupled
}

SearchController.prototype.orderList = function () {
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

  this.getCurrentTimes(restaurants)
  var html = listTemplate({restaurants: restaurants});
  $('#restaurant-index').html(html)
}

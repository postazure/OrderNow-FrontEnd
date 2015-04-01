var App = function (search, show) {
  this.search = search
  this.show = show
  getLocation()
  this.setupHandlers()
}

App.prototype.searchAction = function () {
  $('#search-field').parent(".search").addClass('loading')
  $("#restaurant-index").append("<div id='main-loader' class='ui active dimmer'><div class='ui loader'></div></div>")
  this.search.getResults($('#search-field').val());
  $('#search-field').blur();
}

App.prototype.setupHandlers = function () {
  var _this = this;
  // Search
  $('form').on('submit', function (e) {
    e.preventDefault();
    _this.searchAction();
  })

  // Show
  $('#restaurant-index').on('click','.restaurant', function (e) {
    e.preventDefault();
    _this.show.getRestaurantInfo($(this));
  })

  // Visit External (Yelp, Provider)
  $('#restaurant-index').on('click', '.visit-source', function (e) {
    var sourceUrl = $(this).parents('.restaurant').data("sourceurl")
      .replace(".json?client_name=computer","");
    location.href = sourceUrl;
  })

  $('#restaurant-index').on('click', '.visit-yelp', function (e) {
    var yelpUrl = $(this).data("yelpurl")
    location.href = yelpUrl;
  })

  $('#restaurant-index').on('click', '.tag', function (e) {
    var tag = $(this).text().trim()
    $('#search-field').val(tag)
    _this.searchAction();
  })


}

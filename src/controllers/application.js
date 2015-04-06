var App = function (search, show) {
  $('.ui.accordion').accordion('refresh');
  this.handlebarsHelpers();
  this.search = search;
  this.show = show;
  getLocation();
  this.setupHandlers();
};

App.prototype.searchAction = function () {
  $("#search-container").append("<div id='main-loader'><ul class='spinner'><li></li><li></li><li></li><li></li></ul></div>")
  this.search.getResults($('#search-field').val());
  $('#instructions').fadeOut();
  $('#search-field').blur();
};

App.prototype.setupHandlers = function () {
  var _this = this;
  // Search
  $('form').on('submit', function (e) {
    e.preventDefault();
    _this.searchAction();
  });

  $('form [type="submit"]').on('click', function () {
    _this.searchAction();
  });

  // Show
  $('#restaurant-index').on('click','.restaurant', function (e) {
    e.preventDefault();
    _this.show.getRestaurantInfo($(this));
  });

  // Visit External (Yelp, Provider)
  $('#restaurant-index').on('click', '.visit-source', function (e) {
    $(this).addClass("loading");
    var sourceUrl = $(this).parents('.restaurant').data("sourceurl")
      .replace(".json?client_name=computer","");
    location.href = sourceUrl;
  });

  $('#restaurant-index').on('click', '.visit-yelp', function (e) {
    $(this).addClass("loading");
    var yelpUrl = $(this).data("yelpurl");
    location.href = yelpUrl;
  });

  $('#restaurant-index').on('click', '.tag', function (e) {
    var tag = $(this).text().trim();
    $('#search-field').val(tag);
    _this.searchAction();
  });

  $('#search-field').focusout(function() {
    $(this).val("");
  });
};

App.prototype.handlebarsHelpers = function () {
  Handlebars.registerHelper('stars', function(n, color) {
    var accum = '';
    var fullStars = Math.floor(n);
    var halfStar = (n - fullStars) ? 1 : 0;
    for(var i = 0; i < n-halfStar; ++i){
      accum += '<i class="'+color+' star icon"></i>';
    }
    if (halfStar) {
      accum += '<i class="'+color+' star half icon"></i>';
    }
    return accum;
  });
};

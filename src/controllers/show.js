$('#restaurant-index').on('click','.restaurant', function (e) {
  e.preventDefault();
  showController.getRestaurantInfo($(this));
})

$('#restaurant-index').on('click', '.visit-source', function (e) {
  var sourceUrl = $(this).parents('.restaurant').data("sourceurl")
    .replace(".json?client_name=computer","");
  location.href = sourceUrl;
})

$('#restaurant-index').on('click', '.visit-yelp', function (e) {
  var yelpUrl = $(this).data("yelpurl")
  location.href = yelpUrl;
})

//
// function getRestaurantInfo(restaurantNode) {
//   searchAdapter.show(restaurantNode.data("id"), function (res) {
//     setToActive(restaurantNode)
//     setDetails(res)
//   })
// }
//
// function setToActive(div) {
//   $(".title.active").removeClass("active")
//   $(".content.active").removeClass("active")
//
//   var children = div.children();
//   children.each(function (i) {
//     var child = $(children[i]);
//     child.addClass("active");
//   });
// }


// OO Version

var ShowController = function (searchAdapter) {
  this.searchAdapter = searchAdapter
}

ShowController.prototype.getRestaurantInfo = function (restaurantNode) {
  var _this = this
  this.searchAdapter.show(restaurantNode.data("id"), function (res) {
    _this.setToActive(restaurantNode)
    _this.setDetails(res)
  })
}

ShowController.prototype.setToActive = function (div) {
  $(".title.active").removeClass("active")
  $(".content.active").removeClass("active")

  var children = div.children();
  children.each(function (i) {
    var child = $(children[i]);
    child.addClass("active");
  });
}

ShowController.prototype.setDetails = function (restaurant) {
  var html = detailsTemplate({restaurant:restaurant});
  $('.content.active').html(html)
}

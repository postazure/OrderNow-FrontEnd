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

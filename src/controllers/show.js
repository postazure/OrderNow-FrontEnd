$('#restaurant-index').on('click','.restaurant', function (e) {
  e.preventDefault();
  getRestaurantInfo($(this));
})

$('#restaurant-index').on('click', '.visit-source', function (e) {
  var sourceUrl = $(this).parents('.restaurant').data("sourceurl")
    .replace(".json?client_name=computer","");
  location.href = sourceUrl;
})

$('#restaurant-index').on('click', '.visit-yelp', function (e) {
  var yelpUrl = $(this).data("yelpurl")
    // .replace(".json?client_name=computer","");
  location.href = yelpUrl;
})

function getRestaurantInfo(restaurantNode) {
  searchAdapter.show(restaurantNode.data("id"), function (res) {
    setToActive(restaurantNode)
    setDetails(res)
  })
}

function setToActive(div) {
  // var alreadyActive = !$(div.children()[0]).hasClass("active");
  // if (alreadyActive) {
    $(".title.active").removeClass("active")
    $(".content.active").removeClass("active")
  // }
  var children = div.children();
  children.each(function (i) {
    var child = $(children[i]);
    child.addClass("active");
  });
}

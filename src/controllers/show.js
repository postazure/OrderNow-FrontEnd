$('#restaurant-index').on('click','.restaurant', function (e) {
  e.preventDefault();
  getRestaurantInfo($(this));
})

function getRestaurantInfo(restaurantNode) {
  searchAdapter.show(restaurantNode.data("id"), function (res) {
    setToActive(restaurantNode)
    setDetails(res)


  })
}

function setToActive(div) {
  var alreadyActive = !$(div.children()[0]).hasClass("active");
  console.log(alreadyActive);
  if (alreadyActive) {
    $(".title.active").removeClass("active")
    $(".content.active").removeClass("active")
  }
  var children = div.children();
  children.each(function (i) {
    var child = $(children[i]);
    child.toggleClass("active");
  });
}

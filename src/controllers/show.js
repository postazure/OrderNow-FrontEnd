$('#restaurant-index').on('click','.restaurant', function (e) {
  e.preventDefault();
  getRestaurantInfo($(this));
})

function getRestaurantInfo(restaurantNode) {
  searchAdapter.show(restaurantNode.data("id"), function (res) {
    console.log(res)
    setToActive(restaurantNode)

    // var html = template({restaurants: res});
    // $('#restaurant-index').html(html)



  })
}

function setToActive(div) {
  $(".title.active").removeClass("active")
  $(".content.active").removeClass("active")
  var children = div.children();
  children.each(function (i) {
    var child = $(children[i]);
    child.addClass("active");
  });
}

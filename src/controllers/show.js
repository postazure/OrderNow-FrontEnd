$('#restaurant-index').on('click','.restaurant', function (e) {
  e.preventDefault();
  var restaurant = $(this)
  getRestaurantInfo(restaurant.data("id"));
  setToActive(restaurant)
})

function getRestaurantInfo(id) {
  searchAdapter.show(id, function (res) {
    // console.log("expected",res)




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

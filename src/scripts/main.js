var listSource = $('#restaurant-list').html();
var listTemplate = Handlebars.compile(listSource);

var detailsSource = $('#restaurant-details').html();
var detailsTemplate = Handlebars.compile(detailsSource);

getLocation()

function setList(restaurants) {
  $.each(restaurants, function (i, restaurant) {
    restaurant.delivery_time = 75 // set historic delivery time average
  })
  getCurrentTimes(restaurants)

  var html = listTemplate({restaurants: restaurants});
  $('#restaurant-index').html(html)
}

function setDetails(restaurant) {
  console.log(restaurant)
  var html = detailsTemplate({restaurant:restaurant});
  $('.content.active').html(html)
}

function orderList() {
  var restaurantNodeList = $(".restaurant")
  restaurantNodeList.sort(function(a, b){
    return parseInt($(a).data("deliveryTime"))-parseInt($(b).data("deliveryTime"))
  });
  $("#restaurant-index").append(restaurantNodeList);
}

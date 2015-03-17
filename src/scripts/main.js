var listSource = $('#restaurant-list').html();
var listTemplate = Handlebars.compile(listSource);

var detailsSource = $('#restaurant-details').html();
var detailsTemplate = Handlebars.compile(detailsSource);

function setList(restaurants) {
  getCurrentTimes(restaurants)
  $.each(restaurants, function (i, restaurant) {
    // restaurant.delivery_time = 23 // set historic delivery time average
  })

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
    return $(a).data("delivery-time")-$(b).data("delivery-time")
  });
  $("#restaurant-list").html(restaurantNodeList);
}

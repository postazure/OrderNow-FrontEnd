getLocation()

var listSource = $('#restaurant-list').html();
var listTemplate = Handlebars.compile(listSource);

var detailsSource = $('#restaurant-details').html();
var detailsTemplate = Handlebars.compile(detailsSource);

var historicAdapter = new HistoricAdapter()
var searchAdapter = new SearchAdapter()
var orderAheadAdapter = new OrderAheadAdapter(historicAdapter)
var searchController = new SearchController(orderAheadAdapter)
var showController = new ShowController(searchAdapter)

// function setList(restaurants) {
//   $.each(restaurants, function (i, restaurant) {
//     restaurant.delivery_time = 75; // set historic delivery time average
//     restaurant.valid_zone = true;
//   })
//
//   searchController.getCurrentTimes(restaurants, searchController.orderList)
//
//   var html = listTemplate({restaurants: restaurants});
//   $('#restaurant-index').html(html)
// }

// function setDetails(restaurant) {
//   var html = detailsTemplate({restaurant:restaurant});
//   $('.content.active').html(html)
// }

// function orderList() {
//   var restaurantNodeList = $(".restaurant")
//   restaurantNodeList.sort(function(a, b){
//     return parseInt($(a).data("deliveryTime"))-parseInt($(b).data("deliveryTime"))
//   });
//   $("#restaurant-index").append(restaurantNodeList);
// }

function removeInvalid(restaurant) {
  var restaurantNode = $('.restaurant[data-id="'+restaurant.id+'"]')
  restaurantNode.remove()
}

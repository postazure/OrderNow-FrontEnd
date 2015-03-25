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

function removeInvalid(restaurant) {
  var restaurantNode = $('.restaurant[data-id="'+restaurant.id+'"]')
  restaurantNode.remove()
}


$('form').on('submit', function (e) {
  e.preventDefault();
  $('#search-field').parent(".search").addClass('loading')
  $("#restaurant-index").prepend("<div id='main-loader' class='ui active dimmer'><div class='ui loader'></div></div>")
  searchController.getResults($('#search-field').val());
  $('#search-field').blur()
})


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

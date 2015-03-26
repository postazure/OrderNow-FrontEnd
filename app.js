var historicAdapter = new HistoricAdapter()
var searchAdapter = new SearchAdapter()
var orderAheadAdapter = new OrderAheadAdapter(historicAdapter)
var searchController = new SearchController(orderAheadAdapter)
var showController = new ShowController(searchAdapter)
var app = new App(searchController, showController)


// HB templates
var listSource = $('#restaurant-list').html();
var listTemplate = Handlebars.compile(listSource);

var detailsSource = $('#restaurant-details').html();
var detailsTemplate = Handlebars.compile(detailsSource);

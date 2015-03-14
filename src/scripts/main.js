var source = $('#restaurant-list').html();
var template = Handlebars.compile(source);

function setTemplate(restaurants) {
  var html = template({restaurants: restaurants});
  $('#restaurant-index').html(html)
}

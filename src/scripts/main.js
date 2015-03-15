var listSource = $('#restaurant-list').html();
var listTemplate = Handlebars.compile(listSource);

var detailsSource = $('#restaurant-details').html();
var detailsTemplate = Handlebars.compile(detailsSource);

function setList(restaurants) {
  var html = listTemplate({restaurants: restaurants});
  $('#restaurant-index').html(html)
}

function setDetails(restaurant) {
  console.log(restaurant)
  var html = detailsTemplate({
    name: restaurant.name,
    phone_number: restaurant.phone_number,
    logo_url: restaurant.logo_url,
    source_name: restaurant.source_name,
    source_url: restaurant.source_url,
    tags: restaurant.tags,
    rating: restaurant.yelp_info.rating,
    rating_image_url: restaurant.yelp_info.rating_image_url,
    review_count: restaurant.yelp_info.review_count,
    snippet_image_url: restaurant.yelp_info.snippet_image_url,
    snippet_text: restaurant.yelp_info.snippet_text
  });
  $('.content.active').html(html)
  // $('.content.active').html("<h1>Something is missing here</h1>")
}

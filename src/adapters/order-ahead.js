var orderAheadAdapter = {
  url: "https://www.orderaheadapp.com/places/",
  suffix: ".json?client_name=computer",
  restaurantId: function (restaurant) {
    return( restaurant.source_url
      .replace("https://www.orderaheadapp.com/places/","")
      .replace(".json?client_name=computer",""));
  },
  deliveryTime: function (restaurant, cb) {
    $.ajax({
      url: this.url + this.restaurantId(restaurant) + this.suffix,
      success:function (res) {
        var default_prep_duration = res.default_prep_duration
        var additional_prep_duration = res.additional_prep_duration
        var max_delivery_time = res.max_delivery_time
        var min_delivery_time = res.min_delivery_time
        var average = (max_delivery_time + min_delivery_time)/2 + additional_prep_duration + default_prep_duration
        restaurant.delivery_time = Math.floor(average);
        cb(restaurant)
      }
    });
  },
}

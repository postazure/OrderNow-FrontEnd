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
        var distanceTime = 20;
        if (window.clientLng) {
          distanceTime = getTimeFromDistance(res)          
        }
        restaurant.delivery_time = Math.floor(getPrepTime(res) + distanceTime);
        cb(restaurant)
      }
    });
  },
}


function getTimeFromDistance(res) {
  var latitude = res.latitude;
  var longitude = res.longitude;
  var mile_interval = res.store_scaling_delivery_attributes.mile_interval;
  var minute_increment = res.store_scaling_delivery_attributes.minute_increment;
  var dist = getDistance(latitude, longitude, "M")
  return (dist*mile_interval*minute_increment)
}

function getPrepTime(res) {
  var default_prep_duration = res.default_prep_duration
  var additional_prep_duration = res.additional_prep_duration
  var max_delivery_time = res.max_delivery_time
  var min_delivery_time = res.min_delivery_time
  return (max_delivery_time + min_delivery_time)/2 + additional_prep_duration + default_prep_duration
}

// var orderAheadAdapter = {
//   url: "https://www.orderaheadapp.com/places/",
//   suffix: ".json?client_name=computer",
//   restaurantId: function (restaurant) {
//     return( restaurant.source_url
//       .replace("https://www.orderaheadapp.com/places/","")
//       .replace(".json?client_name=computer",""));
//   },
//   deliveryTime: function (restaurant, cb) {
//     $.ajax({
//       url: this.url + this.restaurantId(restaurant) + this.suffix,
//       success:function (res) {
//         restaurant.delivery_time = getDeliveryTime(res);
//         restaurant.valid_zone = isValidDeliveryLocation(res, restaurant);
//
//         historicAdapter.report(restaurant);
//         cb(restaurant)
//       }
//     });
//   },
// }
//
// function getDeliveryTime(res) {
//   var distanceTime = 20;
//   if (window.clientLng) {
//     distanceTime = getTimeFromDistance(res)
//   }
//   return Math.floor(getPrepTime(res) + distanceTime);
// }
//
// function getPrepTime(res) {
//   var default_prep_duration = res.default_prep_duration
//   var additional_prep_duration = res.additional_prep_duration
//   var max_delivery_time = res.max_delivery_time
//   var min_delivery_time = res.min_delivery_time
//   return (max_delivery_time + min_delivery_time)/2 + additional_prep_duration + default_prep_duration
// }
//
// function getTimeFromDistance(res) {
//   var latitude = res.latitude;
//   var longitude = res.longitude;
//   var mile_interval = res.store_scaling_delivery_attributes.mile_interval;
//   var minute_increment = res.store_scaling_delivery_attributes.minute_increment;
//   var dist = getDistance(latitude, longitude, "M")
//   return (dist*mile_interval*minute_increment)
// }
//
// function isValidDeliveryLocation(res, restaurant) {
//   if (!window.clientLat) { return true }
//
//   var store_delivery_zones = res.store_delivery_zones;
//   var validity = false
//   $.each(store_delivery_zones, function (i, geo) {
//     var radius = parseFloat(geo.radius);
//     var lat = parseFloat(geo.latitude);
//     var lng = parseFloat(geo.longitude);
//     var dist = getDistance(lat, lng, "M")
//     if (dist <= radius) {
//       validity = true
//     }else {
//       removeInvalid(restaurant)
//     }
//   })
//   return validity;
// }


// OO Version

var OrderAheadAdapter = function (historicAdapter) {
  this.url = "https://www.orderaheadapp.com/places/";
  this.suffix = ".json?client_name=computer";
  this.historicAdapter = historicAdapter

}

OrderAheadAdapter.prototype.restaurantId = function (restaurant) {
  return( restaurant.source_url
    .replace("https://www.orderaheadapp.com/places/","")
    .replace(".json?client_name=computer",""));
}

OrderAheadAdapter.prototype.getDeliveryTime = function (res) {
  var distanceTime = 20;
  if (window.clientLng) {
    distanceTime = this.getTimeFromDistance(res)
  }
  return Math.floor(this.getPrepTime(res) + distanceTime);
}

OrderAheadAdapter.prototype.deliveryTime = function (restaurant, cb) {
  var _this = this;
  $.ajax({
    url: this.url + this.restaurantId(restaurant) + this.suffix,
    success:function (res) {
      restaurant.delivery_time = _this.getDeliveryTime(res);
      restaurant.valid_zone = _this.isValidDeliveryLocation(res, restaurant);

      _this.historicAdapter.report(restaurant);
      cb(restaurant)
    }
  });
}


OrderAheadAdapter.prototype.getPrepTime = function (res) {
  var default_prep_duration = res.default_prep_duration
  var additional_prep_duration = res.additional_prep_duration
  var max_delivery_time = res.max_delivery_time
  var min_delivery_time = res.min_delivery_time
  return (max_delivery_time + min_delivery_time)/2 + additional_prep_duration + default_prep_duration
}

OrderAheadAdapter.prototype.getTimeFromDistance = function (res) {
  var latitude = res.latitude;
  var longitude = res.longitude;
  var mile_interval = res.store_scaling_delivery_attributes.mile_interval;
  var minute_increment = res.store_scaling_delivery_attributes.minute_increment;
  var dist = getDistance(latitude, longitude, "M")
  return (dist*mile_interval*minute_increment)
}

OrderAheadAdapter.prototype.isValidDeliveryLocation = function (res, restaurant) {
  if (!window.clientLat) { return true }

  var store_delivery_zones = res.store_delivery_zones;
  var validity = false
  $.each(store_delivery_zones, function (i, geo) {
    var radius = parseFloat(geo.radius);
    var lat = parseFloat(geo.latitude);
    var lng = parseFloat(geo.longitude);
    var dist = getDistance(lat, lng, "M")
    if (dist <= radius) {
      validity = true
    }else {
      removeInvalid(restaurant)
    }
  })
  return validity;
}

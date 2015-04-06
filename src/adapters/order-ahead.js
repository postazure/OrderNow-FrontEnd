var OrderAheadAdapter = function (historicAdapter) {
  this.url = "https://www.orderaheadapp.com/places/";
  this.suffix = ".json?client_name=computer";
  this.historicAdapter = historicAdapter;
};

OrderAheadAdapter.prototype.restaurantId = function (restaurant) {
  return( restaurant.source_url
    .replace("https://www.orderaheadapp.com/places/","")
    .replace(".json?client_name=computer",""));
};

OrderAheadAdapter.prototype.getDeliveryTime = function (res) {
  var distanceTime = 20;

  if (window.clientLng) {
    distanceTime = this.getTimeFromDistance(res);
  }

  return Math.floor(this.getPrepTime(res) + distanceTime);
};

OrderAheadAdapter.prototype.deliveryTime = function (restaurant, cb) {
  var _this = this;
  $.ajax({
    url: this.url + this.restaurantId(restaurant) + this.suffix,
    success:function (res, status, xhr) {
      var ct = xhr.getResponseHeader("content-type") || "";
      if (ct.indexOf('html') > -1) {
        console.log("HTML DOC");
        _this.removeInvalid(restaurant);
        // Need API Endpoint to purge missing restaurants
      }

      restaurant.open = res["open_now?"];
      restaurant.accepting_orders = !res.not_accepting_orders;
      restaurant.delivery_time = _this.getDeliveryTime(res);
      restaurant.valid_zone = _this.isValidDeliveryLocation(res, restaurant);

      if (restaurant.valid_zone ){//&& restaurant.open && restaurant.accepting_orders) {
        _this.historicAdapter.report(restaurant);
        cb(restaurant);
      } else {
        _this.removeInvalid(restaurant);
      }
    }
  });
};

OrderAheadAdapter.prototype.getPrepTime = function (res) {
  var default_prep_duration = res.default_prep_duration;
  var additional_prep_duration = res.additional_prep_duration;
  var max_delivery_time = res.max_delivery_time;
  var min_delivery_time = res.min_delivery_time;
  return (max_delivery_time + min_delivery_time)/2 + additional_prep_duration + default_prep_duration;
};

OrderAheadAdapter.prototype.getTimeFromDistance = function (res) {

  try {
    var latitude = res.latitude;
    var longitude = res.longitude;
    var mile_interval = res.store_scaling_delivery_attributes.mile_interval;
    var minute_increment = res.store_scaling_delivery_attributes.minute_increment;
    var dist = getDistance(latitude, longitude, "M");
    return (dist*mile_interval*minute_increment);
  }catch(err) {
    return (20); //default 20min buffer
  }
};

OrderAheadAdapter.prototype.isValidDeliveryLocation = function (res, restaurant) {
  if (!window.clientLat) {
    return true;
  }

  try {
    var _this = this;
    var store_delivery_zones = res.store_delivery_zones;
    var validity = false;
    $.each(store_delivery_zones, function (i, geo) {
      var radius = parseFloat(geo.radius);
      var lat = parseFloat(geo.latitude);
      var lng = parseFloat(geo.longitude);
      var dist = getDistance(lat, lng, "M");

      if (dist <= radius) {
        validity = true ;
      }
    });
    return validity;

  } catch(err) {
    return true;
  }
};

OrderAheadAdapter.prototype.removeInvalid = function (restaurant) {
  // move to searchController
  var restaurantNode = $('.restaurant[data-id="'+restaurant.id+'"]');
  restaurantNode.remove();
};

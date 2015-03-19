function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    throw "Geolocation is not supported by this browser.";
  }
}

function setPosition(position) {
  // console.log("Lat", position.coords.latitude);
  // console.log("Lng", position.coords.longitude);
  window.clientLat = position.coords.latitude;
  window.clientLng = position.coords.longitude;
  $("#gps-indicator").removeClass("hidden");
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      throw "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      throw "Location information is unavailable."
      break;
    case error.TIMEOUT:
      throw "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      throw "An unknown error occurred."
      break;
  }
}

function getDistance(lat2, lon2, unit) {
  var lon1 = window.clientLng;
  var lat1 = window.clientLat;
  var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var radlon1 = Math.PI * lon1/180
  var radlon2 = Math.PI * lon2/180
  var theta = lon1-lon2
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="N") { dist = dist * 0.8684 }
  return dist
}

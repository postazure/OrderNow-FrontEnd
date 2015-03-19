var historicAdapter = {
  // url: "https://delivery-now-sf.herokuapp.com/historic/",
  url: "http://localhost:3000/historic/",
  report: function (restaurant) {
    var url = this.url + restaurant.id;
    $.ajax({
      method: "post",
      url: url,
      data: {"wait": restaurant.delivery_time},
      success: function (res) {
        console.log("Added historical data", res);
      },
      error: function (res) {
        console.log("Failed to add historical data", res);
      }
    });
  }
}

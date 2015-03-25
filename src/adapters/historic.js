var HistoricAdapter = function () {
  this.url = "https://delivery-now-sf.herokuapp.com/historic/";
  this.report = function (restaurant) {
    var url = this.url + restaurant.id;
    $.ajax({
      method: "post",
      url: url,
      data: {"wait": restaurant.delivery_time}
    });
  };
};

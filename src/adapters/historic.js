var HistoricAdapter = function () {
  // this.url = "http://deliverynowsf.mybluemix.net/historic/";
  this.url = "https://delivery-now-sf.herokuapp.com/historic/";
  // this.url = "http://localhost:3000/historic/";
  this.report = function (restaurant) {
    var url = this.url + restaurant.id;
    $.ajax({
      method: "post",
      url: url,
      data: {"wait": restaurant.delivery_time}
    });
  };
};

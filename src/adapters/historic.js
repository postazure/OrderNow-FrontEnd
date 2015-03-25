// var historicAdapter = {
//   url: "https://delivery-now-sf.herokuapp.com/historic/",
//   // url: "http://localhost:3000/historic/",
//   report: function (restaurant) {
//     var url = this.url + restaurant.id;
//     $.ajax({
//       method: "post",
//       url: url,
//       data: {"wait": restaurant.delivery_time}
//     });
//   }
// }


// OO Version
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

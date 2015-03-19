var searchAdapter = {
  url: "https://delivery-now-sf.herokuapp.com/restaurants",
  // url: "http://localhost:3000/restaurants",
  index: function (query, cb) {
    var data = query ? {"k": query}:null;
    $.ajax({
      url: this.url,
      data: data,
      success:function (res) {cb(res)}
    });
  },
  show: function (id, cb) {
    $.ajax({
      url: this.url +"/"+ id,
      success:function (res) {cb(res)}
    });
  }
}

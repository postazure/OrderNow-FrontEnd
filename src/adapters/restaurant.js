var SearchAdapter = function () {
  // this.url = "http://deliverynowsf.mybluemix.net/restaurants/";
  this.url = "https://delivery-now-sf.herokuapp.com/restaurants/";
  // this.url = "http://localhost:3000/restaurants/";
};

SearchAdapter.prototype.index = function (query, cb) {
  var data = query ? {"k": query}:null;
  $.ajax({
    url: this.url,
    data: data,
    success:function (res) {
      cb(res);
    }
  });
};

SearchAdapter.prototype.show = function (id, cb) {
  $.ajax({
    url: this.url + id,
    success:function (res) {
      cb(res);
    }
  });
};

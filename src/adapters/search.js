var searchAdapter = {
  url: "http://localhost:3000/restaurants",
  call: function (query, cb) {
    req = {
      url: this.url,
      data: {"k": query},
      success:function (res) {
        cb(res)
      }
    }
    $.ajax(req, function () {});
  }
}

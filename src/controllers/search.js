$('form').on('submit', function (e) {
  e.preventDefault();
  getResults($('#search-field').val());
})

function getResults(searchTerms) {
  var query = compileSearchQuery(searchTerms)
  searchAdapter.index(query, function (res) {
    if (res.records_found) {
      setList(res.results)
    }else{
      $('#restaurant-index').html("<h1>Sorry No Results Found</h1>")
    }

  })
}

function compileSearchQuery(searchTerms) {
  return searchTerms.replace(/\s/g, "+")
}

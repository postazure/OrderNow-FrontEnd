$('form').on('submit', function (e) {
  e.preventDefault();
  getResults($('#search-field').val());
})

function getResults(searchTerms) {
  var query = compileSearchQuery(searchTerms)
  searchAdapter.call(query, function (res) {
    console.log("expected",res)




  })
}

function compileSearchQuery(searchTerms) {
  return searchTerms.replace(/\s/g, "+")
}

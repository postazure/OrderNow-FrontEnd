var source = $('#restaurant-list').html();
var template = Handlebars.compile(source);
var context = {
  restaurants: [
    {name:"restaurant green"},
    {name:"restaurant blue"},
    {name:"restaurant red"}
  ]
}

var html = template(context);
$('#outlet').html(html)

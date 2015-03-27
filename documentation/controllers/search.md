# Search Controller
\#=> src/controllers/search.js

### getResults
Params: <i>searchTerm</i>
* searchTerm: user input string

Role: query

Call searchAdapter and handle search results.

### compileSearchQuery
Params: <i>searchTerm</i>
* searchTerm: user input string

Role: utility

Assemble query string.

### getCurrentTimes
Params: <i>restaurants, cb</i>
* restaurants: array of restaurant objects

Role: UI

Query each provider for current delivery estimates.

### setCurrentTime
Params : <i>restaurant</i>
* restaurant: restaurant object

Role: UI

Ends loader and adds delivery estimate to the page.

### orderList
Params : <i>none</i>

Role: UI

Re-orders restaurant DIVs on the page.

### setList
Params : <i>restaurant</i>
* restaurant: restaurant object

Role: UI

Sets default values (delivery_time, valid_zone). Calls getCurrentTime. Appends search results template to page.

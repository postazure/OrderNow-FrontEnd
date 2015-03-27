# Location Controller
\#=> src/controllers/location.js

### getLocation
Params: <i>none</i>

Role: geocoords

Gets client geolocation information.
Calls setPostion and showError.

### setPostion
Params: <i>position</i>

Role: geocoords

Stores geolocation information and displays feedback to user.

### showError
Params: <i>error</i>

Role: error handling

Throws an error related to geolocation.

### getDistance
Params : <i>otherLat, otherLng, unit</i>
* otherLat: float
* otherLng: float
* unit: 'M', 'K', 'N'

Role: Utility

Returns the distance between client and a specified point.

# Delivery Now SF
[Launch Application](http://www.deliverynowsf.com)

## Application Flow
1. Application Loads
2. Client Gets Client GPS Coordinates
3. User Makes Search Query
4. Client-Side Application Makes AJAX call to Rails API
5. Rails API Returns JSON of Restaurant Index Information
6. Client-Side Application Appends Search Results
7. Client begins making multiple AJAX calls to external APIs to get real-time delivery information
8. Real-Time Delivery Estimates are Appended to Page
9. User Taps or Clicks on a Restaurant Name
10. Client Makes an AJAX Request to Rails API for detailed restaurant information
11. Detailed Panel Expands

## Features
* Responsive Design
* Object Oriented JS
* Eager Loading for Delivery Estimates
* Lazy Loading for Restaurant Details
* Ember-cli Inspired File Structure

## [Documentation]()

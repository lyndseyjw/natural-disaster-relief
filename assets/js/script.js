// creating a variable for the zipcode Submit button in HTML
var zipSubmit = $('.zipSubmitButton');

// a div is created underneath zip form
var zipInputEl = $('<div>');

// variable created for the zip form input value (to display in the created div)
var zipInput = input.val();

// creating a variable for the container of the map
var mapDiv = $('.mapDiv');

// creating a variable for the container that will house the API response (air quality & road closures)
var disasterInfoEl = $('<div>');

// creating a variable for the API response of disaster info
var disasterInfo = $('.disasterInfo');
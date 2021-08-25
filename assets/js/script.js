// variable for the search container, where the locally saved zip code will display
var searchDiv = $('.searchDiv');

// variable created for the zip form input value (to display in the created div)
var zipInput = $('.zipInput');

// creating a variable for the zipcode Submit button in HTML
var zipSubmit = $('.zipSubmitButton');

// creating a variable for the container of the map
var mapDiv = $('.mapDiv');

// creating a variable for the container that will house the API response (air quality & road closures)
var disasterInfoEl = $('<div>');

// creating a variable for the API response of disaster info
var disasterInfo = $('.disasterInfo');

var latitude;
var longitude;
var fireLatitude;
var fireLongitude;
var map;

var liveTime = document.querySelector(".timer");
var timer = setInterval(function () {

    var currTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss");
    liveTime.textContent = currTime;

}, 1000);

zipSubmit.on('click', function () {

    var zipInputVal = zipInput.val();

    var positionStackURL = 'http://api.positionstack.com/v1/forward?access_key=504536cca90d4c48fb032176b5240b9c&query=' + zipInputVal

    fetch(positionStackURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

            latitude = data.data[0].latitude;
            longitude = data.data[0].longitude;
            console.log(latitude);
            console.log(longitude);

            fetch("https://api.ambeedata.com/latest/fire?lat=" + latitude + "&lng=" + longitude, {
                "method": "GET",
                "headers": {
                    "x-api-key": "bcdc320dee6e51c49f7af1f5a7d6cdb150c47a4475a4df5fc55f94fcbd7b6595",
                    "Content-type": "application/json"
                }
            })
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data);
                })
                    fireLatitude = data.data[0].latitude;
                    fireLongitude = data.data[0].longitude;
                    console.log(fireLatitude);
                    console.log(fireLongitude);

                    mapDiv.attr('href', '');
                    map = L.map(mapDiv).setView([latitude, longitude], 13);
        })

})




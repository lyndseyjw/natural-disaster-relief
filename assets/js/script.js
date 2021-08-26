// variable for the search container, where the locally saved zip code will display
var searchDiv = $('.searchDiv');

// variable created for the zip form input value (to display in the created div)
var zipInput = $('.zipInput');

// creating a variable for the zipcode Submit button in HTML
var zipSubmit = $('.zipSubmitButton');

var zipInput = $('.zipInput');
// zipInput = input.val();

// var zipInput = input.val();

// creating a variable for the container of the map
var mapDiv = $('#mapid');

var latitude;
var longitude;
var fireLatitude;
var fireLongitude;
var map;
var fireIcon;

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

                    $('.mapPhoto').css("display", "none");
                    map = L.map("mapid").setView([latitude, longitude], 13);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    fireIcon = L.icon({
                        
                        iconUrl: 'leaf-green.png',
                        shadowUrl: 'leaf-shadow.png',
                    
                        iconSize:     [38, 95], // size of the icon
                        // shadowSize:   [50, 64], // size of the shadow
                        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                        // shadowAnchor: [4, 62],  // the same for the shadow
                        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                    });
        })

})




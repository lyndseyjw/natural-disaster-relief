// variable for the search container, where the locally saved zip code will display
var searchDiv = $('.searchDiv');

// variable created for the zip form input value (to display in the created div)
var zipInput = $('.zipInput');

// creating a variable for the zipcode Submit button in HTML
var zipSubmit = $('.zipSubmitButton');

var zipInput = $('.zipInput');

// creating a variable for the container of the map
var mapDiv = $('#mapid');

var zipCard =$('.zipCard');

var savedZipList=$('.savedZipList');

var latitude;
var longitude;
var fireLatitude;
var fireLongitude;
var map;
var fireIcon;
var radiusIcon;
var airQuality;
var fireMessage;
var savedZips = [];

var liveTime = document.querySelector(".timer");
var timer = setInterval(function () {

    var currTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss");
    liveTime.textContent = currTime;

}, 1000);

zipSubmit.on('click', function () {

    var zipInputVal = zipInput.val();

    savedZips.push(zipInputVal);
    localStorage.setItem("zips", JSON.stringify(savedZips));

    savedZips = JSON.parse(localStorage.getItem("zips"));

    var listItem = $("<li>");
    listItem.text(savedZips.slice(-1).pop());
    listItem.attr("style", "margin:0 auto;");
    savedZipList.append(listItem);

    zipInput.val('');

    var positionStackURL = 'https://api.positionstack.com/v1/forward?access_key=504536cca90d4c48fb032176b5240b9c&query=' + zipInputVal

    fetch(positionStackURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //console.log(data);

            latitude = data.data[0].latitude;
            longitude = data.data[0].longitude;
            //console.log(latitude);
            //console.log(longitude);

            $('.mapPhoto').css("display", "none");
            map = L.map("mapid").setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            /* ------ fetches the fire informaiton via latitude/longitude ------ */
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
                    fireLatitude = data.data[0].lat;
                    fireLongitude = data.data[0].lng;
                    console.log(fireLatitude);
                    fireMessage = data.message;
                    return fireMessage;
                })
                .then(function(fireMessage) {

                    console.log(fireMessage);

                    fireIcon = L.icon({

                        iconUrl: './assets/images/fireEMOJI1.png',
                    
                        iconSize:     [95, 95], // size of the icon
                        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                    });
           
                    /* ------ fetches the air quality via latitude/lognitude ------ */
					fetch("https://api.ambeedata.com/latest/by-lat-lng?lat=" + fireLatitude + "&lng=" + fireLongitude, {
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
							console.log(data)
							airQuality=data.stations[0].AQI;
							airQuality= airQuality.toString()

                            if(!(fireMessage === "No fires were detected")){
                                L.marker([fireLatitude, fireLongitude], {icon: fireIcon}).addTo(map).bindPopup("Air Quality: " + airQuality );
                            }
                            else{
                        }
                        
                    })
        })

})
})

function displayZips() {

    if (localStorage.getItem("zips")) {

        savedZips = JSON.parse(localStorage.getItem("zips"));

        for (var i = 0; i < savedZips.length; i++) {
        
            var listItem = $("<li>");
            listItem.text(savedZips[i]);
            listItem.attr("style", "margin:0 auto;");
            savedZipList.append(listItem);
        }
    }
}

displayZips();
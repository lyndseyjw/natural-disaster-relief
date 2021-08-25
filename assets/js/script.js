// // creating a variable for the zipcode Submit button in HTML
// var zipSubmit = $('.zipSubmitButton');

// var searchDiv = $('.searchDiv');

// // a div is created underneath zip form
// var zipInputEl = $('<div>');

// // variable created for the zip form input value (to display in the created div)

// var zipInput = $('.zipInput');
// zipInput = input.val();

// //    var zipInput = input.val();

// // creating a variable for the container of the map
// var mapDiv = $('.mapDiv');

// // creating a variable for the container that will house the API response (air quality & road closures)
// var disasterInfoEl = $('<div>');

// // creating a variable for the API response of disaster info
// var disasterInfo = $('.disasterInfo');

// // zipSubmit.on('click', function()) {





// // ------ Timer @ top of webpage ------ //

// var liveTime = document.querySelector(".timer");
// var timer = setInterval(function () {

//     var currTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss");
//     liveTime.textContent = currTime;

// }, 1000); // 10000ms = 1s

fetch("https://api.ambeedata.com/latest/fire?lat=12.9889055&lng=77.574044", {
	"method": "GET",
	"headers": {
		"x-api-key": " bcdc320dee6e51c49f7af1f5a7d6cdb150c47a4475a4df5fc55f94fcbd7b6595",
		"Content-type": "application/json"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

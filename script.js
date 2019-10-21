var currentCity = "Denver";
var searchHistory = [];
var storedCities = JSON.parse(localStorage.getItem("userSearches"));


$(document).ready(function () {

    function displayCities() {
        $("#pastCities").empty();
        if (storedCities !== null) {
            searchHistory = storedCities;
            for (var i = 0; i < searchHistory.length; i++) {
                $("#pastCities").append('<li>' + searchHistory[i] + '</li>');
            }
            currentCity = searchHistory[searchHistory.length - 1];

        }
    };
    displayCities();

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=3ce1cdd127058c730b93e797e8b094bc";
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=3ce1cdd127058c730b93e797e8b094bc";



    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    }).then(function (response) {

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=3ce1cdd127058c730b93e797e8b094bc&lat=" + lat + "&lon=" + lon;
        $('#currentCityJumbo').text(response.name + ", " + response.sys.country + " (" + moment().format('dddd MMMM Do') + ")");
        $('#currentWind').text("Wind Speed: " + response.wind.speed + " MPH");
        $('#currentHum').text("Humidity: " + response.main.humidity + "%");
        $('#currentTemp').text("Temperature: " + response.main.temp + " ˚F");
        $("#currentIcon").attr("src","https://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png");


        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {

            $('#currentUV').text(response.value);
            if(response.value<3) {
                $('#currentUV').add("span").css('background-color', 'green');
            }else if (response.value>=3 && response.value<6) {
                $('#currentUV').add("span").css('background-color', 'yellow');
            }else{
                $('#currentUV').add("span").css('background-color', 'red');
            }

        });

    });

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt === (moment().add(1, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day1Temp").text("Temp: " + response.list[i].main.temp + " ˚F");
                $("#day1Hum").text("Humidity: " + response.list[i].main.humidity + "%");
                $("#day1Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[i].weather[0].icon+"@2x.png");
            }
        }                  

        for (var j = 0; j < response.list.length; j++) {
            if (response.list[j].dt_txt === (moment().add(2, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day2Temp").text("Temp: " + response.list[j].main.temp + " ˚F");
                $("#day2Hum").text("Humidity: " + response.list[j].main.humidity + "%");
                $("#day2Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[j].weather[0].icon+"@2x.png");
            }
        }

        for (var k = 0; k < response.list.length; k++) {
            if (response.list[k].dt_txt === (moment().add(3, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day3Temp").text("Temp: " + response.list[k].main.temp + " ˚F");
                $("#day3Hum").text("Humidity: " + response.list[k].main.humidity + "%");
                $("#day3Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[k].weather[0].icon+"@2x.png");
            }
        }

        for (var l = 0; l < response.list.length; l++) {
            if (response.list[l].dt_txt === (moment().add(4, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day4Temp").text("Temp: " + response.list[l].main.temp + " ˚F");
                $("#day4Hum").text("Humidity: " + response.list[l].main.humidity + "%");
                $("#day4Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[l].weather[0].icon+"@2x.png");
            }
        }

        for (var m = 0; m < response.list.length; m++) {
            if (response.list[m].dt_txt === (moment().add(5, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day5Temp").text("Temp: " + response.list[m].main.temp + " ˚F");
                $("#day5Hum").text("Humidity: " + response.list[m].main.humidity + "%");
                $("#day5Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[m].weather[0].icon+"@2x.png");
            }
        }

    });

    // This is the search function that will allow users to search different cities
    // *****************************************************************************************************
    // *****************************************************************************************************
    // *****************************************************************************************************
    // *****************************************************************************************************
    // *****************************************************************************************************

    function refreshStorage(name) {
        searchHistory.push(name);
        localStorage.setItem("userSearches", JSON.stringify(searchHistory));
        storedCities = JSON.parse(localStorage.getItem("userSearches"));
        displayCities();
    }
    
    $("#searchBtn").click(function (event) {
        event.preventDefault();
        currentCity = $("#userSearch").val();
        $("#userSearch").val('');
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=3ce1cdd127058c730b93e797e8b094bc";
        var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=3ce1cdd127058c730b93e797e8b094bc";

        $.ajax({
            url: queryURLCurrent,
            method: "GET"
        }).then(function (response) {

            $('#currentCityJumbo').text(response.name + ", " + response.sys.country + " (" + moment().format('dddd MMMM Do') + ")");

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=3ce1cdd127058c730b93e797e8b094bc&lat=" + lat + "&lon=" + lon;
            $('#currentWind').text("Wind Speed: " + response.wind.speed + " MPH");
            $('#currentHum').text("Humidity: " + response.main.humidity + "%");
            $('#currentTemp').text("Temperature: " + response.main.temp + " ˚F");
            $("#currentIcon").attr("src","https://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png");

            refreshStorage(response.name)

            $.ajax({
                url: uvQueryURL,
                method: "GET"
            }).then(function (response) {

                $('#currentUV').text(response.value);
                if(response.value<3) {
                    $('#currentUV').add("span").css('background-color', 'green');
                }else if (response.value>=3 && response.value<6) {
                    $('#currentUV').add("span").css('background-color', 'yellow');
                }else{
                    $('#currentUV').add("span").css('background-color', 'red');
                }

            });

        });

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < response.list.length; i++) {
                if (response.list[i].dt_txt === (moment().add(1, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day1Temp").text("Temp: " + response.list[i].main.temp + " ˚F");
                    $("#day1Hum").text("Humidity: " + response.list[i].main.humidity + "%");
                    $("#day1Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[i].weather[0].icon+"@2x.png");
                }
            }

            for (var j = 0; j < response.list.length; j++) {
                if (response.list[j].dt_txt === (moment().add(2, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day2Temp").text("Temp: " + response.list[j].main.temp + " ˚F");
                    $("#day2Hum").text("Humidity: " + response.list[j].main.humidity + "%");
                    $("#day2Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[j].weather[0].icon+"@2x.png");
                }
            }

            for (var k = 0; k < response.list.length; k++) {
                if (response.list[k].dt_txt === (moment().add(3, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day3Temp").text("Temp: " + response.list[k].main.temp + " ˚F");
                    $("#day3Hum").text("Humidity: " + response.list[k].main.humidity + "%");
                    $("#day3Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[k].weather[0].icon+"@2x.png");
                }
            }

            for (var l = 0; l < response.list.length; l++) {
                if (response.list[l].dt_txt === (moment().add(4, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day4Temp").text("Temp: " + response.list[l].main.temp + " ˚F");
                    $("#day4Hum").text("Humidity: " + response.list[l].main.humidity + "%");
                    $("#day4Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[l].weather[0].icon+"@2x.png");
                }
            }

            for (var m = 0; m < response.list.length; m++) {
                if (response.list[m].dt_txt === (moment().add(5, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day5Temp").text("Temp: " + response.list[m].main.temp + " ˚F");
                    $("#day5Hum").text("Humidity: " + response.list[m].main.humidity + "%");
                    $("#day5Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[m].weather[0].icon+"@2x.png");
                }
            }

        });
        

    })

});



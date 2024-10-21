// jQuery's document ready function ensures that the DOM (Document Object Model) is fully loaded before executing the following JavaScript
$(document).ready(function() {
    // Event listener for when the "Get Weather" button is clicked by the user
    // It triggers the getWeatherData() function to start the process of fetching weather data
    $("#get-weather").on("click", getWeatherData);
    
    // Event listener for the "Enter" key press inside the location input field
    // This allows users to press "Enter" to fetch weather data instead of clicking the button
    $("#location").on("keypress", function(event) {
        if (event.which === 13) { // The key code for "Enter" is 13
            event.preventDefault(); // Prevents the default behavior, which could be form submission
            getWeatherData(); // Calls the function that fetches weather data from the API
        }
    });
});

// This function is responsible for fetching weather data based on the user's input
// It checks if the input is a city name or a ZIP code and builds the appropriate API URL for geolocation
function getWeatherData() {
    // Get the user's input from the input field
    const input = $("#location").val();
    let geoUrl = ''; // Variable to store the API URL for geolocation (either by city or ZIP)

    // Check whether the input is numeric (ZIP code) or non-numeric (city name) using isNaN()
    if (isNaN(input)) {
        // If the input is not a number, it's treated as a city name
        // Construct the API URL for fetching location data by city name
        geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`;
    } else {
        // If the input is a number, it's treated as a ZIP code
        const countryCode = "US"; // By default, we assume the country is the United States
        // Construct the API URL for fetching location data by ZIP code
        geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${input},${countryCode}&appid=${apiKey}`;
    }

    // Use jQuery's ajax() function to make a request to the OpenWeatherMap Geolocation API
    $.ajax({
        url: geoUrl, // The API URL based on the user's input (city or ZIP)
        method: 'GET', // Use the GET method to retrieve data
        //On success of retrieving the data, the ajax() call does the following:
        success: function(response) {
            // Log the response to the console for debugging purposes
            console.log("Geo API Response:", response);
            let location; // Variable to store the location data (latitude and longitude)

            // Check if the response is an array (for city names) and has at least one result
            // If the array is greater than 0 then it contains elements. If it's 0 the array is empty.
            if (Array.isArray(response) && response.length > 0) {
                location = response[0]; // If Array.isArray(respone) is true then use the first result from the array as the location
            } 
            // Check if the response is for a ZIP code (response.zip should be present)
            else if (response && response.zip) {
                location = response; // Otherwise use the ZIP response as the location.
            } else {
                // If no valid location data is found, display an error message to the user
                $("#error-message").text('No location data available. Please check the ZIP code or city name.');
                return; // Exit the function early since no valid data was found
            }

            // If valid location data was found, use the latitude and longitude to fetch weather data
            // Call getCurrentWeather() to fetch the current weather an display it in e #current-weather 
            getCurrentWeather(location.lat, location.lon);
            // Call getExtendedForecast() to fetch the 5-day weather forecast
            getExtendedForecast(location.lat, location.lon);
        },
        error: function(error) {
            // Log any errors to the console for debugging
            console.error('Error fetching location data:', error);
            // Display an error message if something goes wrong with the API request
            $("#error-message").text("There was an error retrieving the location data. Please try again.");
        }
    });
}

// This function assigns a weather emoji based on the main weather condition (e.g., Clear, Clouds, Rain, etc.)
function getWeatherEmoji(weatherMain) {
    // Use a switch statement to match the weather condition (weatherMain) with the correct emoji
    switch (weatherMain.toLowerCase()) { // Convert weatherMain to lowercase to handle case sensitivity
        case 'clear': return '☀️'; // If the weather is "Clear", return the sun emoji
        case 'clouds': return '☁️'; // If the weather is "Clouds", return the cloud emoji
        case 'rain': return '🌧️'; // If the weather is "Rain", return the rain cloud emoji
        case 'drizzle': return '🌦️'; // If the weather is "Drizzle", return the drizzle emoji
        case 'thunderstorm': return '⛈️'; // If the weather is "Thunderstorm", return the thunderstorm emoji
        case 'snow': return '❄️'; // If the weather is "Snow", return the snowflake emoji
        case 'mist': return '🌫️'; // If the weather is "Mist", return the fog emoji
        case 'haze': return '🌫️'; // If the weather is "Haze", return the fog emoji
        default: return ''; // If no matching condition, return an empty string (no emoji)
    }
}

// This function converts wind speed from miles per hour (mph) to meters per second (m/s)
// 1 mph = 0.44704 m/s, so we multiply the speed by this factor and round to 2 decimal places
function convertWindSpeed(speedMph) {
    return (speedMph * 0.44704).toFixed(2); // Convert mph to m/s and format to 2 decimal places
}

// This function fetches the current weather data from OpenWeatherMap using latitude and longitude
function getCurrentWeather(lat, lon) {
    // Construct the API URL for current weather using latitude, longitude, and API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    // Make an AJAX request to fetch current weather data
    $.ajax({
        url: currentWeatherUrl, // Use the constructed API URL
        method: 'GET', // Use the GET method to retrieve the data
        success: function(response) {
            // Extract relevant weather information from the API response
            const temperatureF = response.main.temp; // Temperature in Fahrenheit
            const temperatureC = ((temperatureF - 32) * 5 / 9).toFixed(1); // Convert Fahrenheit to Celsius
            const weatherMain = response.weather[0].main; // The main weather condition (e.g., Clear, Rain)
            const emoji = getWeatherEmoji(weatherMain); // Get the corresponding weather emoji
            const weatherDescription = response.weather[0].description; // the weather description
            const humidity = response.main.humidity; // Get the humidity percentage
            const windSpeedMph = response.wind.speed; // Wind speed in miles per hour
            const windSpeedMs = convertWindSpeed(windSpeedMph); // Convert wind speed to meters per second

            // Display the current weather information, including temperature, weather, conditions, humidity, and wind speed
            $("#current-weather").html(`

                    <!-- Display the city name. -->
                <hr><h2>Current Weather - ${response.name}</h2><hr> 

                    <!-- Display the temperature in Celsius. Display the weather condition with emoji. -->
                <p><strong>Temperature:</strong> <i>${temperatureC}</i> °C &nbsp; &nbsp; <strong>Weather:</strong> <i>${weatherMain}</i> ${emoji}</p><br> 
                
                    <!-- Display the capitalized weather description. Display the humidity percentage. -->
                <p><strong>Conditions:</strong> <i>${weatherDescription}</i> &nbsp; &nbsp; <strong>Humidity:</strong> <i>${humidity}%</i></p><br> 
                    
                    <!-- Display wind speed in meters per second -->
                <p><strong>Wind Speed:</strong> <i>${windSpeedMs}<i/> m/s</p> <br><hr>
            `);
        },
        error: function(error) {
            // Log any errors to the console for debugging
            console.error('Error fetching current weather:', error);
            // Display an error message if something goes wrong with the API request
            $("#error-message").text("There was an error retrieving the current weather.");
        }
    });
}

// This function fetches the extended 5-day weather forecast from OpenWeatherMap
function getExtendedForecast(lat, lon) {
    // Construct the API URL for the 5-day forecast using latitude, longitude, and API key
    const extendedForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    // Make an AJAX request to fetch the extended forecast data
    $.ajax({
        url: extendedForecastUrl, // Use the constructed API URL
        method: 'GET', // Use the GET method to retrieve the data
        success: function(response) {
            // Log the full API response to the console for debugging purposes
            console.log("Extended Forecast API Response:", response);

            // Extract and format the forecast data for display
            let forecastHtml = "<h2>Weather Forecast</h2><hr>"; // Start building the HTML for the forecast section

            // Loop through the forecast list, which contains weather data every 3 hours
            for (let i = 0; i < response.list.length; i += 8) { // Skip 8 intervals to get daily forecasts (8 intervals = 24 hours)
                const forecast = response.list[i]; // Get the weather data for the day
                const date = new Date(forecast.dt * 1000); // Convert the Unix timestamp to a readable date
                const temperatureF = forecast.main.temp; // Get the temperature in Fahrenheit
                const temperatureC = ((temperatureF - 32) * 5 / 9).toFixed(1); // Convert temperature to Celsius
                const weatherMain = forecast.weather[0].main; // Get the main weather condition (e.g., Clear, Rain)
                const emoji = getWeatherEmoji(weatherMain); // Get the corresponding weather emoji
                const weatherDescription = forecast.weather[0].description; // The weather description

                // Append the forecast data for the current day to the HTML
                forecastHtml += `
                    <div class="forecast-day">

                            <!-- Display the date in a readable format -->
                        <p>|</p><h3>${date.toDateString()}</h3>
                            <!-- Display the temperature and weather -->
                        <p><strong>Temperature:</strong> <i>${temperatureC} °C</i> &nbsp; &nbsp; 
                        <strong>Weather:</strong> <i>${weatherMain}</i> ${emoji} <strong> &nbsp; &nbsp;</p> <br>

                            <!-- Display weather conditions -->
                        <p>Conditions:</strong> <i>${weatherDescription}</i></p><br><br> 
                        
                    </div>
                `;
            }
            // Display the forecast data inside the #extended-forecast div
            $("#extended-forecast").html(forecastHtml);
        },
        error: function(error) {
            // Log any errors to the console for debugging
            console.error('Error fetching extended forecast:', error);
            // Display an error message if something goes wrong with the API request
            $("#error-message").text("There was an error retrieving the extended forecast.");
        }
    });
}
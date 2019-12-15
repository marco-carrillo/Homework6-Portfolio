# Purpose of the application

This application allows users to search current and 5-day weather forecast for a specific city.  The application saves up to 9 past searches, and allows users to quickly access current and future weather forecast for any one of those cities.  As an added bonus, this application will provide the geolocation of the user and a map showing such location.

## Functionality

The first time the application is used, upon loading, it will display the temperature for the city of Richmond.  Subsequently, the system will display the temperature and forecast for the last searched city.  Past searches will be loaded to local storage.

Upon loading, the application will ask the user if the program can access geolocation.  User can either allow it or block it.  If user allows it, the program will provide the latitude and longitude of the user location, and additionally will provide a for it.  If the user blocks it, the geolocation tab will be empty.

User then has the option of getting the weather for a specific city.  There are two potential formats:  1) city name only, or 2) city name + country.  Entering city name is the simplest way, however, the API will return the first city it finds regardless of the country.  Adding the country, which is done by adding a comma to the city, and then the country abbreviation (i.e. Boston, US) will provide a better match.

If the city is not found, the user will get a message saying such city was not found.

If the city is found, its name and country will be displayed on the "Weather" tab, plus its current temperature, humidity, windspeed and UV index.  On the bottom, 5-day forecasts will be presented.  The weather information for each day, is the forecasted temperature 24 hours from now for the 1-day forecast, 48 hours for the 2-day forecast, 72 hours from now for the 3-day forecast and so on.

If the user wants to see geolocation, just click on the "Geolocation" tab, and if the user allowed its location to be known, information will be displayed there.

The list of past searches show the last 9 cities searched ordered from most recent to least recent.  If the user clicks on one of them, the application will move that city to the top of the list and will display its current weather forecast.

##  Data displayed, and its interpretation

The quiz provides the user with the following information

Current Weather:
1) Current temperature, and how it feels.  All of this is in Farengeit degrees.
2) Current humidity in %
3) Current windspeed in mph
4) Current UV index, in milliWatts per square meters

Five day forecast:
1)  1-day forecast:  Humidity and temperature 24 hours from now
2)  2-day forecast:  Humidity and temperature 48 hours from now
3)  3-day forecast:  Humidity and temperature 72 hours from now
4)  4-day forecast:  Humidity and temperature 96 hours from now
5)  5-day forecast:  Humidity and temperature 120 hours from now

## Icons and interpretation

Icons will vary year-round based on day-light distribution.  During the summer, the icons will tend to be more colored to reflect sunny conditions during the day, while during the winter, they will tend to be more black and white.



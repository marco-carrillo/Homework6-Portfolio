
//********************************************************************************* */
// This function will display the 5-day forecasting 
//********************************************************************************* */

function displays_forecast(forecast_response){
    var fData=forecast_response.list;

    // Setting the date for the next 5 days

    var fcst1_day=moment(fData[7].dt_txt,moment.ISO_8601).format('MM/DD/YYYY');
    var fcst2_day=moment(fData[15].dt_txt,moment.ISO_8601).format('MM/DD/YYYY');
    var fcst3_day=moment(fData[23].dt_txt,moment.ISO_8601).format('MM/DD/YYYY');
    var fcst4_day=moment(fData[31].dt_txt,moment.ISO_8601).format('MM/DD/YYYY');
    var fcst5_day=moment(fData[39].dt_txt,moment.ISO_8601).format('MM/DD/YYYY');

    $("#date1").text(fcst1_day);     // Data for the 1-day forecast
    $("#date2").text(fcst2_day);     // Data for the 1-day forecast
    $("#date3").text(fcst3_day);     // Data for the 1-day forecast
    $("#date4").text(fcst4_day);     // Data for the 1-day forecast
    $("#date5").text(fcst5_day);     // Data for the 1-day forecast

    // Setting the temperature for the next 5 days
    var fcst1_tmp=fData[7].main.temp;
    var fcst2_tmp=fData[15].main.temp;
    var fcst3_tmp=fData[23].main.temp;
    var fcst4_tmp=fData[31].main.temp;
    var fcst5_tmp=fData[39].main.temp;

    $("#temp1").text("Temp: "+fcst1_tmp+"°F");     // Data for the 1-day forecast
    $("#temp2").text("Temp: "+fcst2_tmp+"°F");     // Data for the 1-day forecast
    $("#temp3").text("Temp: "+fcst3_tmp+"°F");     // Data for the 1-day forecast
    $("#temp4").text("Temp: "+fcst4_tmp+"°F");     // Data for the 1-day forecast
    $("#temp5").text("Temp: "+fcst5_tmp+"°F");     // Data for the 1-day forecast

    // Setting the humidity for the next 5 days
    var fcst1_hum=fData[7].main.humidity;
    var fcst2_hum=fData[15].main.humidity;
    var fcst3_hum=fData[23].main.humidity;
    var fcst4_hum=fData[31].main.humidity;
    var fcst5_hum=fData[39].main.humidity;

    $("#humd1").text("Humidity: "+fcst1_hum+"%");     // Data for the 1-day forecast
    $("#humd2").text("Humidity: "+fcst2_hum+"%");     // Data for the 1-day forecast
    $("#humd3").text("Humidity: "+fcst3_hum+"%");     // Data for the 1-day forecast
    $("#humd4").text("Humidity: "+fcst4_hum+"%");     // Data for the 1-day forecast
    $("#humd5").text("Humidity: "+fcst5_hum+"%");     // Data for the 1-day forecast

    // Setting the picture for the five day forecast
    var fcst1_img="https://openweathermap.org/img/wn/"+fData[7].weather[0].icon+"@2x.png";
    var fcst2_img="https://openweathermap.org/img/wn/"+fData[15].weather[0].icon+"@2x.png";
    var fcst3_img="https://openweathermap.org/img/wn/"+fData[23].weather[0].icon+"@2x.png";
    var fcst4_img="https://openweathermap.org/img/wn/"+fData[31].weather[0].icon+"@2x.png";
    var fcst5_img="https://openweathermap.org/img/wn/"+fData[39].weather[0].icon+"@2x.png";

    $("#icon1").attr("src",fcst1_img);     // Data for the 1-day forecast
    $("#icon2").attr("src",fcst2_img);     // Data for the 1-day forecast
    $("#icon3").attr("src",fcst3_img);     // Data for the 1-day forecast
    $("#icon4").attr("src",fcst4_img);     // Data for the 1-day forecast
    $("#icon5").attr("src",fcst5_img);     // Data for the 1-day forecast


}  // End of display_forecast function

//********************************************************************************* */
//  This function displays the results after a successful call to the Weather API
//********************************************************************************* */

function displays_results(weather_response){

    // Retrieving data points from response
    var data_day=moment().format('MM/DD/YYYY');               // Time of temperatures
    var data_city=weather_response.name+","+weather_response.sys.country;  // City returned by API
    var data_temp=weather_response.main.temp;                 // Temperature
    var data_feels=weather_response.main.feels_like;          // Feels like
    var data_humidity=weather_response.main.humidity;         // Feels like
    var data_wind=weather_response.wind.speed;                // Windsppeed
    var data_lat=weather_response.coord.lat;                  // Latitude
    var data_lon=weather_response.coord.lon;                  // Longitude
    var data_icon=weather_response.weather[0].icon;           // name of the icon
    var data_id=weather_response.id;

    // Updating header for current weather
    var new_img=$("<img>").attr("src","https://openweathermap.org/img/wn/"+data_icon+"@2x.png")
    new_img.attr("class","main-icon");
    var new_city=$("<p>").attr("id","today-header");
    new_city.text(data_city+" ("+data_day+")");
    $("#weather-icon").empty();
    $("#weather-icon").append(new_city);
    $("#weather-icon").append(new_img);

    $("#today-temp").text("Current temperature: "+data_temp.toFixed(2)+"°F (feels as "+data_feels.toFixed(1)+"°F)");
    $("#today-humidity").text("Current humidity: "+data_humidity+"%");
    $("#today-windspeed").text("Current windspeed: "+data_wind+" mph");

    // making another call to update the UV index

    var API_query="https://api.openweathermap.org/data/2.5/uvi?appid=8f02ab235e3ff57329f8072d90de636e&lat="+data_lat+"&lon="+data_lon;

    $.ajax({url: API_query,methond: "GET"}).then(function(UVData){
        $("#today-UVindex").text("UV index: "+UVData.value+" mW/m²");
    });

    // Executing the AJAX call for forecasting weather 
    var ajax_query="https://api.openweathermap.org/data/2.5/forecast?id="+data_id+"&units=imperial&APPID=8f02ab235e3ff57329f8072d90de636e"
    $.ajax({url: ajax_query,success: displays_forecast, error: display_error})


    // if the prior history already has 9 cities, it eliminates the last one (the oldest)
    // to make room for the newest search entry (located at index 0).  The new one will be added at the top
    // making the list to have again 10 items which is the max

    if(prior_searches!==null&&prior_searches.indexOf(data_city)===-1) {     // Adds the city only if it is not already in the list
        if(prior_searches.length>=9){prior_searches.pop()}
        prior_searches.unshift(data_city);           // Adding a new city to the beginning of the array 
    } else if(prior_searches!==null) {                  //  The city does exist, so the order needs to be changed
        var current_position=prior_searches.indexOf(data_city);     // getting the position in the array
        prior_searches.splice(current_position,1);     // Eliminating the position repeated
        prior_searches.unshift(data_city);           // Adding a new city to the beginning of the array 

    } else {prior_searches[0]=data_city;}        // list is empty, adding city

    // Refreshing the list of cities

    $("#past-searches").empty()                     // empty the past searches entries
    for(var i=prior_searches.length;i>0;i--){        // repopulates the past searches
        AddsCityToHistory(prior_searches[i-1]);
    }

    // updates local storage
    localStorage.setItem("prior_searches",JSON.stringify(prior_searches));

}

//********************************************************************************* */
//  This function displays an error message returned by the application
//********************************************************************************* */

function display_error(weather_error){
    $.confirm({                                                            
        title: "Invalid city name",
        content: "We couldn't find that city name in our database.  Please try another name",
        type: 'red',
        typeAnimated: true,
        buttons: {
            close: function () {
            }
        }
    });
}

//********************************************************************************* */
//  Adds the city to the DOM, plus adds it at the top of the past searches strings
//********************************************************************************* */

function AddsCityToHistory(city_name){
    var newdiv=$("<div>").attr("class","container border rounded-lg search-result")    // Creating a div for the city
    newdiv.attr("data-search",city_name);                                              // To identify during click event
    var newcity=$("<h6>").text(city_name);                                             // Creating object for city
      
    $(newdiv).append(newcity);                                                         // Appending the city object to the div
    $("#past-searches").prepend(newdiv);                                               // Adding the new object to past searches container

}

//********************************************************************************* */
//  Next function is executed once the user presses the button
//********************************************************************************* */

function search_city(){
    var city_entered=$("#search-city").val();

    // At least three characters need to be entered
    if(city_entered.length<3){
        $.confirm({                                                            
            title: "Invalid entry",
            content: "Name has to be at least 3 characters",
            type: 'red',
            typeAnimated: true,
            buttons: {
                close: function () {
                }
            }
        });
       return
    }


    // Executing the AJAX call for current weather and current UV index

    var ajax_query="https://api.openweathermap.org/data/2.5/weather?q="+$("#search-city").val()+"&units=imperial&APPID=8f02ab235e3ff57329f8072d90de636e"
    $.ajax({url: ajax_query,success: displays_results, error: display_error})

    //  Clears the name entered.  It will be substitued by the search result from the API
    //  If no API result is obtained, it is invalid and will be discarded

    $("#search-city").val("");
    $("#search-city").focus();


}  // end of function search_city

//******************************************************************************************/
//  Following function will search weather for a city that has previously been searched 
//******************************************************************************************/

function repeat_search(){
    var city_clicked=$(this).attr("data-search");

    $("#search-city").val(city_clicked);            //  City to search will be the one clicked 
    search_city();                                  //  Making the API calls
}


//******************************************************/
// The following function gets the user's geolocation  //
//******************************************************/
function get_geolocation(){

    if("geolocation" in navigator){

        navigator.geolocation.getCurrentPosition(function(position) {
           
            // Displaying hard data on the tab
            lat_var=position.coords.latitude;
            lon_var=position.coords.longitude;
            geo_location="Latitude : "+lat_var.toFixed(2)+", Longitude: "+lon_var.toFixed(2)
            $("#user-geo").text(geo_location);

            // loading the google map

            var website="https://maps.googleapis.com/maps/api/staticmap?center="+lat_var+","+lon_var+"&zoom=12&size=600x300&maptype=hybrid";
            var markers="&markers=color:blue|label:S|"+lat_var+","+lon_var;
            var map=website+markers+"&key=AIzaSyBZTex9Yvq35ct_1tG-ftXJvG5KhxfKnI0";
            
            // $("#map").attr("src",map);           
            var new_img=$("<img>").attr("src",map);
            new_img.attr("id","map-pic");
            $("#map").append(new_img);

          })  // navigator.geolocation end of call

    } else {
        $.confirm({                                                            
            title: "Geolocation not supported",
            content: "Unfortunately, Geolocation is not supported in your browser.  Try using another one",
            type: 'red',
            typeAnimated: true,
            buttons: {
                close: function () {
                }
            }
        });

    } // end of else
 
}  // end of get_geolocation function



//***************************************************/
// Main functionality for the weather application   *
//***************************************************/

var lat_var=0;          // Global variables with latitude values
var lon_var=0;          // Global variables with longitude values
get_geolocation();      // finding user's geolocation

var prior_searches=JSON.parse(localStorage.getItem("prior_searches"));   // Retrieves prior cities searched from local storage, 10 max
var default_city=localStorage.getItem("default_city");       // This is the city for which weather will be obtained by default

// If prior data exists, populate the past search history 
if (prior_searches!==null){ 
    $("#past-searches").empty()                     // Clearing any past entries
    for(var i=prior_searches.length;i>0;i--){        
        AddsCityToHistory(prior_searches[i-1])      //  Populates the past cities that have been searched
    }
    $("#search-city").val(prior_searches[0]);       //  Passes most recent search 
    search_city();                                  //  Getting information on weather for last known call
} else {
    prior_searches=[]
    $("#search-city").val("Richmond");              //  If not prior searches, it uses Richmond for the first time 
    search_city();                                  //  Getting information on weather for last known call

}

$("#search-city-btn").on("click",search_city);           // Setting click event for search button submission
$(document).on("click",".search-result",repeat_search);  // Setting click events for prior searches 


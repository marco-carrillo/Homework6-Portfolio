function AddsCityToHistory(city_name){
    var newdiv=$("<div>").attr("class","container border rounded-lg search-result")    // Creating a div for the city
    var newcity=$("<h6>").text(city_name);                                             // Creating object for city
    $(newdiv).append(newcity);                                                         // Appending the city object to the div
    $("#past-searches").prepend(newdiv);                                               // Adding the new object to past searches container

}


function search_city(){

//  Checking whether the city exists in the prior history search or not
//  if it does, it doesn't add, just brings it to the top of the list
//  if it does not, it adds at the very beginning.  Index 0 contains the most recent search

var city_entered=$("#search-city").val();
$("#search-city").val("");
$("#search-city").focus();

// if the prior history already has 10 cities, it eliminates the last one (the oldest)
// to make room for the newest search entry (located at index 0).  The new one will be added at the top
// making the list to have again 10 items which is the max

if(prior_searches.length>=8){prior_searches.pop()}

if(prior_searches!==null&&prior_searches.indexOf(city_entered)===-1) {     // Adds the city only if it is not already in the list
    prior_searches.unshift(city_entered);           // Adding a new city to the beginning of the array 
} else if(prior_searches!==null) {                  //  The city does exist, so it needs to be changed
    var current_position=prior_searches.indexOf(city_entered);     // getting the position in the array
    prior_searches.splice(current_position,1);     // Eliminating the position repeated
    prior_searches.unshift(city_entered);           // Adding a new city to the beginning of the array 

} else {prior_searches[0]=city_entered;}        // list is empty, adding city

// Refreshing the list of cities

$("#past-searches").empty()                     // empty the past searches entries
for(var i=prior_searches.length;i>0;i--){        // repopulates the past searches
    AddsCityToHistory(prior_searches[i-1]);
}


}  // end of function search_city


//***************************************************/
// Main functionality for the weather application   *
//***************************************************/

var prior_searches=localStorage.getItem("prior_searches");   // Retrieves prior cities searched from local storage, 10 max
var default_city=localStorage.getItem("default_city");       // This is the city for which weather will be obtained by default


// If prior data exists, populate the past search history 
if (prior_searches!==null){ 
    $("#past-searches").empty()                      // Clearing any past entries
    for(var i=0;i<prior_searches.length;i++){        
        AddsCityToHistory(prior_searches[i])      //  Populates the past cities that have been searched
    } 
} else {prior_searches=[]}

$("#search-city-btn").on("click",search_city)    // Setting click event for search button submission

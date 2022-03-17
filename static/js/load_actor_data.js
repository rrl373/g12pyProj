  var xhr = new XMLHttpRequest(), responseObject;                 // Create XMLHttpRequest object
  xhr.onload = function () {
    // The following conditional check will not work locally - only on a server
    if (xhr.status === 200) {                      // If server status was ok
      responseObject = JSON.parse(xhr.responseText);

    }
  };

  xhr.open('GET', 'static/data/movies.json', false);        // Prepare the request
  xhr.send(null);                                 // Send the request
// NOTE: If you run this file locally
// You will not get a server status
// You can set the conditional statement to true on line 5 as shown below
// if(true) {

//Display only the first event
function display_genre_actor_data(dataPassed)
{
    document.getElementById("display").innerHTML = "";
    var newContent = '';
    var actorMovie = [];
    //Find Actors Works
    for (var i = 0; i < responseObject.length; i++) { // Loop through object
        var movieTitle = responseObject[i].title;
        for(var k = 0; k < (responseObject[i].cast.length); k++) {
            //Loop: List every actor
            //      Set Flag
            foundMovie = 0;
            newActor = responseObject[i].cast[k];
            //Loop: If movie found in current list flag as found, do nothing
            if (String(newActor) == String(dataPassed)){
                for (var j = 0; j < actorMovie.length; j++) {
                        if(String(actorMovie[j]) == String(movieTitle)) {
                            foundMovie += 1;
                        }
                }
                //If new Genre, push new values into array
                if (foundMovie == 0) {
                    actorMovie.push(movieTitle);
                }
            }
        }
    }

    newContent += '<div class="event bg-light text-primary">';
    newContent += 'Actor: ' + dataPassed;
    newContent += '<p><p>' + 'Works:' +'</p></p><ul>';
    for(var i = 0; i < actorMovie.length; i++){
        newContent += '<li>' + actorMovie[i] + '</li>'
    }
    newContent += '</ul></p></div>';
    document.getElementById("actorMovies").innerHTML = newContent;

}


function display_actor_alphabetically_data()
{
    //List Actors in Alphabetical Order
    document.getElementById("display").innerHTML = "";
     var newContent = '';
    var actorList = [];
    var foundGenre = 0, newActor = '';
    for (var i = 0; i < responseObject.length; i++) { // Loop through object
        for(var k = 0; k < responseObject[i].cast.length; k++) {
            //Loop: Each movie to list every actor
            //      Set Flag
            foundGenre = 0;
            newActor = responseObject[i].cast[k];
            //If Empty String - Type is No Genre
            if(String(newActor) == ' ' || String(newActor) == '.') {
                newActor = 'No Actor Listed';
            }
            //Loop: If Genre found in current list flag as found, do nothing
            for (var j = 0; j < actorList.length; j++) {
                if (String(newActor) == String(actorList[j])) {
                    foundGenre += 1;
                }
            }
            //If new Genre, push new values into array
            if (foundGenre == 0) {
                    actorList.push(String(newActor));
            }
        }
    }

    //Sort Actor List Alphabetically
    actorList.sort(function(a, b) {
      var nameA = String(a.toUpperCase()); // ignore upper and lowercase
      var nameB = String(b.toUpperCase()); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    //Print
    //newContent += '<div class="event"><ul>';
    newContent += '<ul>';
    for (var i = 0; i < actorList.length; i++) { // Loop through object
    //    newContent += '<div class="event">';
        newContent += '<li>';
        newContent += '<a  class="bg bg-primary" onclick="display_genre_actor_data(\'' + actorList[i] + '\')">'
            + actorList[i] + '</a>';
        newContent += '</li>';
    //    newContent += '</div>';
    }
    newContent += '</ul>';

      document.getElementById("display").innerHTML = newContent;

}

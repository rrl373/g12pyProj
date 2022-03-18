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
    var newActor = '';
    var foundActor;
    //Find Actors Works
    for (var i = 0; i < responseObject.length; i++) { // Loop through object
        var movieTitle = responseObject[i].title;
        foundActor = 0;
        for(var k = 0; k < (responseObject[i].cast.length); k++) {
            //Loop: Compare every actor in cast
            newActor = String(responseObject[i].cast[k]);
            if(newActor.charAt(0) === '$' || newActor.charAt(0) === '\'') {
                k = responseObject[i].cast.length;
                newActor = responseObject[i].cast.join(' ');
            }
            //Loop: If movie found in current list flag as found, do nothing
            for (var j = 0; j < actorMovie.length; j++) {
                if (String(actorMovie[j]) === String(movieTitle)) {
                    foundActor += 1;
                }
            }
            if(foundActor === 0){
                if (String(newActor) === String(dataPassed)){
                    actorMovie.push(movieTitle);
                }
            }
        }
    }

    //Print new section - right column
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
    var foundActor = 0, newActor = '';
    for (var i = 0; i < responseObject.length; i++) { // Loop through object
        for(var k = 0; k < responseObject[i].cast.length; k++) {
            //Loop: Each movie to list every actor
            //      Set Flag
            foundActor = 0;
            newActor = responseObject[i].cast[k];
            //Get rid of uneeded values
            if(String(newActor) === '(' || String(newActor) === ')' || String(newActor) === '\"' ||
               String(newActor) === '.' || String(newActor) === ']') {
                foundActor += 1
            }
            //Loop: If Genre found in current list flag as found, do nothing
            for (var j = 0; j < actorList.length; j++) {
                if (String(newActor) === String(actorList[j])) {
                    foundActor += 1;
                }
            }
            //If new Genre, push new values into array
            if (foundActor === 0) {
                if(newActor.charAt(0) === '\'' || newActor.charAt(0) === '$'){
                    while(k>0){
                        actorList.pop();
                        k--;
                    }
                    k = responseObject[i].cast.length;
                    newActor = responseObject[i].cast.join(' ');
                }
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
    newContent += '<ul>';
    for (var i = 0; i < actorList.length; i++) { // Loop through object
        newContent += '<li>';
        newContent += '<a  class= "" onclick="display_genre_actor_data(\'' + actorList[i] + '\')">' //
            + actorList[i] + '</a>';
        newContent += '</li>';
    }
    newContent += '</ul>';

      document.getElementById("display").innerHTML = newContent;

}

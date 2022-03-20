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

  //Global Actor List
   var actorList = [];
   var num = 0;

//Display only the first event
function display_genre_actor_data(dataPassed)
{
    document.getElementById("actorMovies").innerHTML = "";
    window.scrollTo(0, document.getElementById('display').offsetTop)
    var newContent2 = '';
    var actorMovie = [];
    var newActor = '';
    var foundActor;
    dataPassed = actorList[dataPassed];
    //Find Actors Works
    for (i = 0; i < responseObject.length; i++) { // Loop through object
        var movieTitle = responseObject[i].title;
        foundActor = 0;
        for(var k = 0; k < (responseObject[i].cast.length); k++) {
            //Loop: Compare every actor in cast
            newActor = String(responseObject[i].cast[k]);
            //Concat cast that start with random numbers, ''s', and '.'
            // that are mid sentences & non 'narrated by'. There are erroneous values
            if(newActor.charAt(0) === '$' || newActor.charAt(0) === '\'' ||
               (newActor.charAt(0) === '.' && newActor.substring(0,3) != '. N')) {
                k = responseObject[i].cast.length;
                newActor = responseObject[i].cast.join(' ');
            }
            //Loop: If movie found in current list flag as found, do nothing
            for (let j = 0; j < actorMovie.length; j++) {
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
    newContent2 += '<div class="event bg-light rounded text-danger p-4">';
    newContent2 += 'Actor: ' + dataPassed;
    newContent2 += '<p><p>' + 'Movies:' +'</p></p><ul>';
    for(let i = 0; i < actorMovie.length; i++){
        newContent2 += '<li>' + actorMovie[i] + '</li>'
    }
    newContent2 += '</ul></p></div>';
    document.getElementById("actorMovies").innerHTML = newContent2;

}


function display_actor_alphabetically_data()
{
    //List Actors in Alphabetical Order
    document.getElementById("display").innerHTML = "";
    var newContent = '';
    var foundActor = 0, newActor = '';
    for (i = 0; i < responseObject.length; i++) { // Loop through object
        for(var k = 0; k < responseObject[i].cast.length; k++) {
            //Loop: Each movie to list every actor
            //      Set Flag
            foundActor = 0;
            newActor = responseObject[i].cast[k];
            //Get rid of uneeded values
            if(String(newActor) === '(' || String(newActor) === ')' || String(newActor) === '\"' ||
               String(newActor) === '.' || String(newActor) === ']'){
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
                //Concat cast that start with random numbers, ''s', and '.'
                // that are mid sentences & non 'narrated by'. There are erroneous values
                if(newActor.charAt(0) === '\'' || newActor.charAt(0) === '$' ||
                    (newActor.charAt(0) === '.' && newActor.substring(0,3) != '. N')){
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
        num = i;
        newContent += '<li class ="actors">';
        newContent += '<a class="link-dark" onclick="display_genre_actor_data(\'' + num + '\')">' + actorList[i] + '</a>';
        newContent += '</li>';
    }
    newContent += '</ul>';

      document.getElementById("display").innerHTML = newContent;

}


function search_actor() {
        var input = document.getElementById('searchActor').value
        input = input.toLowerCase();
        var findActor = document.getElementsByClassName('actors');

        for (i = 0; i < findActor.length; i++) {
            if (!findActor[i].innerHTML.toLowerCase().includes(input)) {
                findActor[i].style.display="none";
            }
            else {
                findActor[i].style.display="list-item";
            }
        }
    }
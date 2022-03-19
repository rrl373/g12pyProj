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

function display_genre_data()
{
    //total number of actors in each category (Action, Horror, Drama, Thriller, etc)
    document.getElementById("display").innerHTML = "";
     var newContent = '';
    var genreType= [];
    var actorCount = [];
    var foundGenre = 0;
    for (var i = 0; i < responseObject.length; i++) { // Loop through object
        foundGenre = 0;
        //Loop: If Genre found add actor count and flag as found
        for(var j = 0; j < genreType.length; j++){
            if(String(responseObject[i].genres) == String(genreType[j])) {
                actorCount[j] += responseObject[i].cast.length;
                foundGenre += 1;
            }
        }
        //If new Genre, push new values into array
        if(foundGenre == 0){
            genreType.push(responseObject[i].genres);
            actorCount.push(responseObject[i].cast.length);
        }
    }

    //If Empty String - Type is No Genre
    if(genreType[0] = ' ') {
        genreType[0] = 'No Genre Listed'
    }

    //Print
    for (var i = 0; i < genreType.length; i++) { // Loop through object
        newContent += '<div class="event">';
        newContent += '<p><b>' + 'Genre: ' + genreType[i] + '</b><br>';
        newContent += 'Number of Actors in Genre: ' + actorCount[i] + '</p>';
        newContent += '</div>';
    }
      document.getElementById("display").innerHTML = newContent;

}

//Display only the first event
function display_genre_actor_data()
{
    //total number of movies in each category (Action, Horror, Drama, Thriller, etc)
    document.getElementById("display").innerHTML = "";
     var newContent = '';
    var genreType= [];
    var genreCount = [];
    var foundGenre = 0;
    for (var i = 0; i < responseObject.length; i++) { // Loop through object
        foundGenre = 0;
        //Loop: If Genre found add count and flag as found
        for(var j = 0; j < genreType.length; j++){
            if(String(responseObject[i].genres) == String(genreType[j])) {
                genreCount[j] += 1;
                foundGenre += 1;
            }
        }
        //If new Genre, push new values into array
        if(foundGenre == 0){
            genreType.push(responseObject[i].genres);
            genreCount.push(1);
        }
    }

    //If Empty String - Type is No Genre
    if(genreType[0] = ' ') {
        genreType[0] = 'No Genre Listed'
    }

    //Print
    for (var i = 0; i < genreType.length; i++) { // Loop through object
        newContent += '<div class="event">';
        newContent += '<p><b>' + 'Genre: ' + genreType[i] + '</b><br>';
        newContent += 'Number of Movies in Genre: ' + genreCount[i] + '</p>';
        newContent += '</div>';
    }
      document.getElementById("display").innerHTML = newContent;

}

function display_list(){
    //document.getElementById("displayContent").innerHTML= list;
    var newContent = '';
    var selectYear = document.getElementById("year").value;
    var size, end;
    if(selectYear == "30"){
       size = 30;
       end = 0;
    }
    else if(selectYear == "60"){
        size = 60;
        end = 30;
    }
    else if(selectYear == "90"){
        size = 90;
        end = 60;
    }
    else if(selectYear == "118"){
        size = 118;
        end = 90;
    } else {
        size = responseObject.length;
        end = 0;
    }

    // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
     for (var i = size - 1; i >= end; i--) { // Loop through object
          newContent += '<div class="event">';
          newContent += '<ol>Newest To Oldest';
          newContent += '<li><b>'+ 'Title: ' + responseObject[i].title + '</b><br>';
          newContent += 'Year: ' + responseObject[i].year + '<br>';
          newContent += '<ol>Cast: <br>';
          for(var j = 0; j < responseObject[i].cast.length; j++){
              newContent = '<li>' + responseObject[i].cast + '</li>';
         }
          newContent += '</ol>';
          newContent += '<ol>Genres: <br>';
          for(var k = 0; k < responseObject[i].genres.length; k++){
              newContent += '<li>' + responseObject[i].genres + '</li>';
          }
          newContent += '</ol>';
      }
     newContent += '</ol>';
     newContent += '</div>';
     document.getElementById("displayContent").innerHTML = newContent;
}

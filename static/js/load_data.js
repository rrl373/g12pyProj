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

function display_all_data()
{
    //total number of actors in each category (Action, Horror, Drama, Thriller, etc)
    document.getElementById("display").innerHTML = "";
     var newContent = '';
    newContent = 'Number of Actors';
    var genreActor= [''];
    var genreActorCount = [0];
    var foundGenre = 0;
    var size = 1;
    for (var i = 0; i < responseObject.length; i++) { // Loop through object
        foundGenre = 0;
        for(var j = 0; j < size; j++){
            if(responseObject[i].genres == genreActor[j]) {
                genreActorCount[j] += 1;
                foundGenre += 1;
            }
        }
        if(foundGenre == 0){
            genreActor.push(responseObject[i].genres);
            genreActorCount.push(1);
            size++;
        }
    }
    for (var i = 0; i < genreActor.length; i++) { // Loop through object
        newContent += '<div class="event">';
        newContent += '<p><b>' + 'Genre: ' + genreActor[i] + '</b><br>';
        newContent += 'Count: ' + genreActorCount[i] + '</p>';
        newContent += '</div>';
    }
    // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
     /* for (var i = 0; i < responseObject.length; i++) { // Loop through object
          newContent += '<div class="event">';
          newContent += '<p><b>'+ 'Title: ' + responseObject[i].title + '</b><br>';
          newContent += 'Year: ' + responseObject[i].year + '</p>';
          newContent += 'Cast: ' + responseObject[i].cast + '</p>';
          newContent += 'Genre: ' + responseObject[i].genres + '</p>';
          newContent += '</div>';
      }*/
      // Update the page with the new content
      document.getElementById("display").innerHTML = newContent;

}

//Display only the first event
function display_one()
{
    document.getElementById("display").innerHTML = "";
    var newContent = '';
    //total number of movies in each category
    /*var genres = ['', 'Comedy', 'Drama', 'Short','Documentary,Short','Comedy,Short','Western',
        'Documentary', 'Short,Documentary', 'Adventure,Romance', 'Short,Crime,Drama',
        'Short,Action,Crime,Western', 'Short,Crime,Drama', 'Short,Action,Crime,Western', 'Historical',
         'Biography', 'Short,Comedy'];*/
    var genres = [''];
    let genresMovieCount = new Array(genres.length).fill(0);
    //Make array of genres
    for(var i = 0; i < responseObject.length; i++){
        var theGenre
        for(var k = 0; k < (responseObject[i].genres.length); j++) {
            var found = 0;
            //get array in json's genre
            theGenre = responseObject[i].genres[k];
            //compare it to current array's genre
            for (var j = 0; j < genres.length; j++) {
                if (genres[j] == theGenre) {
                    found = 1;
                    genresMovieCount[j]++;
                }
            }
            if(found == 0){
            genres.push(theGenre);
            genresMovieCount.push(1);
            }
        }
    }
      // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
    newContent = 'Number of Movies';
   for (var i = 0; i < genres.length; i++) { // Loop through object
        newContent += '<div class="event">';
        newContent += genres[i];
        newContent += genresMovieCount[i];
        //newContent += '<p><b>' + responseObject[i].title + '</b><br>';
        //newContent += responseObject[i].year + '</p>';
        newContent += '</div>';
      }


      // Update the page with the new content
      document.getElementById("display").innerHTML = newContent;
}
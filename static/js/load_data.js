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
    for (var i = 0; i < 1; i++) { // Loop through object
        newContent += '<div class="event">';
        newContent += '<p><b>' + responseObject[i].title + '</b><br>';
        newContent += responseObject[i].year + '</p>';
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
      // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
    newContent = 'Number of Movies';
   for (var i = 0; i < 1; i++) { // Loop through object
        newContent += '<div class="event">';
        newContent += '<p><b>' + responseObject[i].title + '</b><br>';
        newContent += responseObject[i].year + '</p>';
        newContent += '</div>';
      }


 /*    var top = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (var i = 0; i < responseObject.events.length; i++) {
          if (responseObject.events[i].year > responseObject.events[top[0]].year) {
              top[0] = i;
          } else if (responseObject.events[i].year > responseObject.events[top[1]].year) {
              top[1] = i;
          } else if (responseObject.events[i].year > responseObject.events[top[2]].year) {
              top[2] = i;
          } else if (responseObject.events[i].year > responseObject.events[top[3]].year) {
              top[3] = i;
          } else if (responseObject.events[i].year > responseObject.events[top[4]].year) {
              top[4] = i;
          } else if (responseObject.events[i].year > responseObject.events[top[5]].year) {
              top[5] = i;
          } else if (responseObject.events[i].year > responseObject.events[top[6]].year) {
              top[6] = i;
          } else if (responseObject.events[i].year > responseObject.events[top[7]].year) {
              top[7] = i;
          } else if (responseObject.events[i].year > responseObject.events[top[8]].year) {
              top[8] = i;
          } else if (responseObject.events[i].year > responseObject.events[top[9]].year) {
              top[9] = i;
          }
      }

      var newContent = "";
      newContent = "movies";
      for (var i = 0; i < 10; i++) { // Loop through object
          newContent += '<div class="event">';
          newContent += '<p><b>' + (i + 1) + '. ' + responseObject.events[top[i]].title + '</b><br>';
          newContent += 'Released: ' + responseObject.events[top[i]].year + '</p>';
          newContent += 'Cast: ' + responseObject.events[top[i]].cast + '</p>';
          newContent += 'Genre: ' + responseObject.events[top[i]].genres + '</p>';
          newContent += '</div>';
      }*/
      // Update the page with the new content
      document.getElementById("display").innerHTML = newContent;
}
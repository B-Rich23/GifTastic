// Global variables
var slamDunks = ["kobe bryant", "shawn kemp", "vince carter"];
console.log(slamDunks);


// Function for displaying topics data
      function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#dunker").empty();

        // Create a button for each index of the array
		for(i = 0; i < slamDunks.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var newButton = $("<button>");
          // Adding a class
          newButton.addClass("baller");
          // Adding a data-attribute with a value of the movie at index i
          newButton.attr("data-person", slamDunks[i]);
          // Providing the button's text with a value of the movie at index i
          newButton.text(slamDunks[i]);
          // Adding the button to the HTML
          $("#dunker").append(newButton);
        }
      }

      renderButtons();

      // // This function handles events where one button is clicked
      // $("#add-movie").on("click", function(event) {
      //   // event.preventDefault() prevents the form from trying to submit itself.
      //   // We're using a form so that the user can hit enter instead of clicking the button if they want
      //   event.preventDefault();

      //   // This line will grab the text from the input box
      //   var movie = $("#movie-input").val().trim();
      //   // The movie from the textbox is then added to our array
      //   movies.push(movie);
      //   $("#movie-input").val('');

      //   // calling renderButtons which handles the processing of our movie array
      //   renderButtons();
      // });

      // // Calling the renderButtons function at least once to display the initial list of movies
      // renderButtons();



 // Event listener for all button elements
    $("#button").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var dunker = $(this).attr("data-person");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        dunker + "slam+dunks" + "&api_key=D9qYKN8gzFg59ImLbNl2v4OW611JJq7e&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })

        // After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-please").prepend(gifDiv);
            }
          }
        });
    });
var str = 'a b c';
var replaced = str.split(' ').join('+');
console.log(replaced);


// Global variables
var slamDunks = ["kobe bryant", "michael jordan"];

// // For loop that removes white space between player names and replaces it with a plus operator
// for(i = 0; i < slamDunks.length; i++) {
// var hangTime = [];

// var spaceJam = slamDunks[i].split(' ').join('+')];
// console.log(spaceJam[i]);
// hangTime.push(spaceJam[]);
// console.log(hangTime);
// }


// Function for displaying topics data
      function renderButtons() {

        // Deleting the player buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#dunker").empty();

        // Create a button for each index of the array
		for(i = 0; i < slamDunks.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
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

      // renderButtons();

      // This function handles events where one button is clicked
      $("#button").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var player = $("#userinput").val().trim();
        // The player from the textbox is then added to our array
        slamDunks.push(player);
        $("#userinput").val('');

        // calling renderButtons which handles the processing of our slamDunks array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of players
      renderButtons();



 // Event listener for all button elements
    $(".baller").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var dunker = $(this).attr("data-person");
      console.log(this);

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dunker + "+best+slam+dunks" + "&api_key=D9qYKN8gzFg59ImLbNl2v4OW611JJq7e&limit=10";
        console.log(queryURL);

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })

        // After the data comes back from the API
        .then(function(response) {
        	console.log(response);
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);


              // Creating an image tag
              var personImage = $("<img>");
              // boosties = results[i].images.fixed_height_still.url;
              personImage.addClass("gif");
              var still = results[i].images.fixed_height_still.url;
              var animate = results[i].images.fixed_height.url;

              // Giving the image tag an src attribute of a property pulled off the
              // result item
              personImage.attr("src", still);
              personImage.attr("data-state", "still");
              personImage.attr("data-still", still);
              personImage.attr("data-state", "animate");
              personImage.attr("src", animate);
              console.log(personImage);

               // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-please" div in the HTML
           $("#gifs-please").prepend(gifDiv);
            }
		};
      }) 
    });
		     // On click function to intialize gif state changes
		     $(document).on("click",".gif", function clickGif() {
		     	// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
			      var state = $(this).attr("data-state");
			      console.log(this);
	         
			      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
			      // Then, set the image's data-state to animate
			      // Else set src to the data-still value
			      if (state === "still") {
			        $(this).attr("src", $(this).attr("data-animate"));
			        $(this).attr("data-state", "animate");
			      } else {
			        $(this).attr("src", $(this).attr("data-still"));
			        $(this).attr("data-state", "still");
			      }

			  }); 


             

    



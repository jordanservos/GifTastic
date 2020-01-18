$(document).ready(function() {

    //create GIF selection array

    var gifOptions = [
        "Hiking", "Fishing", "Hunting", "Snow Sports", "Water Sports", "Wildlife Viewing", "Trail Sports", "Off-roading", "Camping"
    ]

    console.log(gifOptions)

    // Build API call function

    function displayGif() {
        $("#gif-collection").empty();
        var name = $(this).attr("data-name");
        var gifLimit = 15;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"

        //build ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            //loop through gif results
            $("#gif-collection").empty();
            var results = response.data
            for (var j = 0; j < results.length; j++) {
                var gifsDiv = $("<div class='gif'>");
                var rating = results[j].rating;
                var ratingP = $("<p>").text("Rating: " + rating);
                var gifImage = $("<img class='gif'>");
                gifImage.attr({
                    src: results[j].images.fixed_height_still.url,
                    "data-state": "still",
                    "data-still": results[j].images.fixed_height_still.url,
                    "data-animate": results[j].images.fixed_height.url,
                });

                gifsDiv.append(gifImage);
                gifsDiv.append(ratingP);
                $("#gif-collection").append(gifsDiv);
                console.log(response);
            };



        });
    }

    //render initial buttons on screen

    function renderButtons() {
        $("#searchButtons").empty();
        for (var i = 0; i < gifOptions.length; i++) {

            var arrayButton = $("<button>");
            arrayButton.addClass("btn btn-primary");
            arrayButton.attr("id", "input")
            arrayButton.attr("data-name", gifOptions[i]);
            arrayButton.text(gifOptions[i]);
            $("#searchButtons").append(arrayButton);


        }
    }

    // animate gifs

    function playGif() {
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }


    // add new gif buttons on click
    $("#add-gif").on("click", function() {
        var newGif = $("#user-input").val().trim();
        gifOptions.push(newGif);
        $("#user-input").val("").focus();
        console.log(newGif)

        renderButtons();

        return false;

    })

    renderButtons();

    //build click listeners 
    $(document).on("click", ".gif", playGif);
    $(document).on("click", "#input", displayGif);






});
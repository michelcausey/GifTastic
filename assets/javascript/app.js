var initialGifs = ["dogs", "cats", "fish", "birds", "goats"]

console.log("----- Start -----")

function displayInfo() {
    var gif = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hWp3TpYzgIVaOxnkZPkEADI4gW51mrXV&q=" + gif + "&limit=10&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET",
        q: gif
    }).then(function (response) {
        console.log(response)

        // add a new div for each search, display the rating of the gif (G)
        var newGif = $("<div class ='gif'>")
        var rating = response.data.rating
        var ratingP = $("<p>").text("Gif Rating: " + rating)
        newGif.append(ratingP)

        // using data.url (the gif url from the API) to create a new image div
        var gifURL = response.data.url
        var gifDiv = $("<img>")
        gifDiv.attr("src", gifURL)
        $("#gif-view").html(gifDiv)

        console.log(gifURL)

        // puts the new gif in front of the old ones

        $("#gif-view").prepend(newGif)
    })
}

function createButtons() {

    // so we do not have duplicate initialGifs buttons each time we search
    $("#buttons-view").empty();

    for (var i = 0; i < initialGifs.length; i++) {

        var newButton = $("<button>")
        newButton.addClass("gif")
        newButton.attr("data-name", initialGifs[i])
        newButton.text(initialGifs[i].toLowerCase())
        $("#buttons-view").append(newButton)
    }
}

$("#add-gif").on("click", function(event){
    //to keep the HTML from refreshing automatically
    event.preventDefault()

    var gif = $("#gif-input").val().trim()

    initialGifs.push(gif)

    createButtons();
})

$(document).on("click", ".gif", displayInfo)

createButtons()
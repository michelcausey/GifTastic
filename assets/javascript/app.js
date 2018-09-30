var topics = ["wtf", "bruh", "y tho", "yas queen", "srsly"]

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

        var results = response.data

        for (var i = 0; i < results.length; i++) {

            var newGif = $("<div class ='gif'>")
            var rating = response.data[i].rating
            var ratingP = $("<p>").text("This GIF is rated: " + rating)

            // using data.url (the gif url from the API) to create a new image div
            var gifDiv = $("<img>")
            gifDiv.attr("src", response.data[i].images.fixed_height.url)
            $("#gif-view").html(gifDiv)

            newGif.append(ratingP)
            newGif.append(gifDiv)
            
            // puts the new gif in front of the old ones
            $("#gif-view").prepend(newGif)
        }
    })
}

function createButtons() {

    // so we do not have duplicate topics buttons each time we search
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {

        var newButton = $("<button>")
        newButton.addClass("gif")
        newButton.attr("data-name", topics[i])
        newButton.text(topics[i].toLowerCase())
        $("#buttons-view").append(newButton)
    }
}

$("#add-gif").on("click", function (event) {
    //to keep the HTML from refreshing automatically
    event.preventDefault()
    var gif = $("#gif-input").val().trim()
    topics.push(gif)

    console.log(topics)

    createButtons();
    displayInfo()
    stillMotion()
})

function stillMotion() {
    var state = $(this).attr("data-state")

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
}

$(document).on("click", ".gif", displayInfo)

createButtons()

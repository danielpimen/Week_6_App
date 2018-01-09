//App Instructions: User inputs data, data is turned into a button. When the button is clicked, API is called and 10 images are displayed.

//Button List
var buttonList = ['dog', 'cats', 'hedgehog', 'pig']
var input;

// Create Button From Array List 
function createButton() {
    $('.buttonHolder').empty();
    for (var i = 0; i < buttonList.length; i++) {
        var newButton = $('<button>');
        newButton.addClass('searchWord');
        newButton.attr('data-name', buttonList[i]);
        newButton.text(buttonList[i]);

        $('.buttonHolder').append(newButton);
    }
}

//Push User Input Into Button Array
$('#add-word').on('click', function(event) {
    event.preventDefault();
    var input = $('#user-input').val().trim();
    buttonList.push(input);
    console.log(buttonList);
    createButton()
})
createButton();

//Fetch GIFs From GIPHY API 
function displayInfo() {
    var userSearch = $(this).attr('data-name');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=8R7qN3TiJmJOpkLz628uGBYZ8aMsXgkV&q=' + userSearch + '&limit=10&offset=0&rating=G&lang=en';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response)
        $('.resultsDiv').empty();
        var results = response.data;
        console.log(results)
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr('data-still', results[i].images.fixed_height_still.url)
            personImage.attr('data-animate', results[i].images.fixed_height.url)
            personImage.attr('data-state', 'still')
            personImage.addClass('gifClass')
            gifDiv.prepend(personImage);
            $(".resultsDiv").prepend(gifDiv);

//Give GIFs CSS styling 
            $('.gifClass').css({'margin-left': 'auto', 'margin-right': 'auto', 'display': 'block'});
            $('.item').css({'float': 'left', 'background-color':  'black'});


        }

})

}
//On click of image, turn still GIF to moving GIF
$(document).on('click', '.gifClass', function moveGif() {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');

    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

//Execute on click of button 
$(document).on("click", ".searchWord", displayInfo);
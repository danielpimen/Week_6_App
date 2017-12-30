var buttonList = ['dog', 'cats', 'hedgehog', 'pig']
var input;


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
$('#add-word').on('click', function(event) {
    event.preventDefault();
    var input = $('#user-input').val().trim();
    buttonList.push(input);
    console.log(buttonList);
    createButton()
})
createButton();
function displayInfo(){
	var userSearch=$(this).attr('data-name');
	var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=8R7qN3TiJmJOpkLz628uGBYZ8aMsXgkV&q=' + userSearch + '&limit=25&offset=0&rating=G&lang=en';

$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response)



$('.resultsDiv').text('Sup Hoe')
})}


$(document).on("click", ".searchWord", displayInfo);

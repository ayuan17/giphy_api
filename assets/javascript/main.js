var buttons = ['Antonio Brown', 'Rob Gronkowski', 'OBJ', 'Tom Brady', 'Malcom Mitchell', 'Travis Kelce', 'Salt Bae'];
var still = [];

var addButtons = function() {

    buttons.map(function(e){
        //console.log(e);
        var button = $("<button>");
            button.html(e);
            button.attr('data-name', e);

    $('.buttonContainer').append(button);
    });
}

addButtons();
//================================================================

//Making call to server
var runAjax = function(link){
     $('.images').empty();
    $.ajax({
        url: link,
        method:"GET"
    }).done(function(response){

        //logging data retrieved (object)
        // console.log(response);
        // console.log(response.data[0].images.fixed_height.url);
        // console.log(response.data[0].images.fixed_height_still.url);

        for (var i = 0; i < response.data.length; i++) {
            var image = $("<img>");
            image.attr({
                src: response.data[i].images.fixed_height.url,
                "data-animate": response.data[i].images.fixed_height.url,
                "data-still": response.data[i].images.fixed_height_still.url,
                "data-name": 'still'
            });
            $('.images').append(image);

        }
    });
};

//Grabs the user input and adds buttons to the DOM

$('#search').on('click', function(){

    //deletes the existing arrays in the DOM
    $('.buttonContainer').empty();

    var userVal = $("#animal-value").val().replace(' ', '+');
    //console.log("Hello World");

    //only adds to the buttons, when input not empty
    if(userVal !== ''){
        buttons.push(userVal);
        var link = "http://api.giphy.com/v1/gifs/search?q=" + userVal + "&api_key=dc6zaTOxFJmzC&limit=10";
        runAjax(link);
    }

    $('#animal-value').val('');

    addButtons();
    //console.log(buttons);
});
//=======================================================================

//this pulls the images for the buttons already loaded on the page
$('.buttonContainer').on('click', 'button', function(){

        var buttonVal = $(this).attr('data-name');
        var link = "http://api.giphy.com/v1/gifs/search?q=" + buttonVal + "&api_key=dc6zaTOxFJmzC&limit=10";

    runAjax(link);
});

//========================================================================

$('.images').on('click', 'img', function(){

    if($(this).attr('data-name') === 'still'){
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-name', 'animate');
    }

    else{
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-name', 'still');
    }

});





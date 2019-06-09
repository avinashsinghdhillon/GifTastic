//global variables

const preloadedGifs = ["dog", "cat", "cow", "kookaburra", "monkey", "horse", "lion", "bear", "zebra", "kangaroo"];



//on page-load preload the gifs and buttons
preloadedGifs.forEach(animal => {
displayButton(animal);
});

//pick a random item from the preload list to display gifs for
let selectedItem = preloadedGifs[Math.floor(Math.random() * (preloadedGifs.length + 1))];
console.log(selectedItem);
getGifs(selectedItem);

function displayButton(item){
     //add a button to the button-Holder div/column
     $("#button-Holder").append('<button type="button" class="btn btn-success btn-sm">' + item + '</button>');
}

function displayGifs(itemList){
    debugger;
    console.log(itemList);
    gifList.forEach(listItem, indx => {
        //first 
        $("#gif-Section").append();
    });
 }

//on form submit event
$("#searchGif").on("submit", function(event){
    event.preventDefault();
    displayButton($("#searchGif").find("input").val().trim());
    displayGifs($("#searchGif").find("input").val().trim());
});



//create the AJAX query and submit to Giphy's API
function getGifs(item, numResults){

    //get the val of the text from the user input
    let searchString = $("#searchGif").find("input").val();

    let queryText = "https://api.giphy.com/v1/gifs/search?q=" + item + "&limit=" + numResults + "&api_key=FOO5h0InFQt1zsGU1Qi1QrBsY3UPiOKk";
    $.ajax({
        url: queryText,
        method: "GET"
    }).then(function (response){
        debugger;
        displayGifs(response.data);
    })
}


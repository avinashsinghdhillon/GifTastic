//global variables

//list of buttons preloaded on the page
const preloadedGifs = ["snoopy", "garfield", "popeye", "mickey mouse", "spongebob", "homer simpson", "donald duck", "tintin", "scooby-doo", "tom and jerry"];
//Array of objects that holds the data 
let gifData = new Array({});

//on page-load preload the gifs and buttons
preloadedGifs.forEach(animal => {
displayButton(animal);
});

//pick a random item from the preload list to display gifs for
let selectedItem = preloadedGifs[Math.floor(Math.random() * (preloadedGifs.length + 1))];
console.log(selectedItem);
getGifs(selectedItem, 10);/////////////just get 1 gif data for now


function displayButton(item){
     //add a button to the button-Holder div/column
     $("#button-Holder").append('<button type="button" class="btn btn-success btn-sm">' + item + '</button>');
}

function displayGifStills(){
    $("#gif-Section").empty();
    for( var i = 0; i < gifData.length; i++){
        var htmlText =
            '<div class="card border-success" style="max-width: 18rem;">' +
                    '<img id=' + i + '" class="card-img-top" src="' + gifData[i].fixedHeightStill +' alt="Card image cap" state="still">' +
                    '<p class="card-title"> Title: ' + gifData[i].title + '</p>' +
                    '<p class="list-group-item">Rating: ' + gifData[i].rating +'</p>'
                    //'<a href="#">OMDB</a>' +///////////////////////can add this polish later to connect the item to OMDB's API///////////////
            '</div>';
    
        $("#gif-Section").append(htmlText);
    }
 }

//on form submit event 1. display new button 2.display new gifs
$("#searchGif").on("submit", function(event){
    event.preventDefault();
    selectedItem = $("#searchGif").find("input").val().trim();
    //if the button/item already exists do nothing
    if(preloadedGifs.indexOf(selectedItem) > -1){
        return;
    }
    $("#searchGif").find("input").val("");
    displayButton(selectedItem.trim());
    preloadedGifs.push(selectedItem);
    getGifs(selectedItem, 10);
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
        fillGifDataArray(response.data);
    })
}

//this data fills the gifData array with object elements
function fillGifDataArray(rawDataArray){
    //clear the gif data object to refresh the list
    gifData.length = 0;
    let newObj;
    for(var i = 0; i < rawDataArray.length; i++){
        newObj = {
            id: i,
            title: rawDataArray[i].title.toUpperCase(),
            rating: rawDataArray[i].rating.toUpperCase(),
            trendingOn: rawDataArray[i].trending_datetime,
            fixedWidth: rawDataArray[i].images.fixed_width.url,
            fixedWidthStill: rawDataArray[i].images.fixed_width_still.url,
            fixedWidthSize: parseInt(rawDataArray[i].images.fixed_width_still.width),
            fixedHeight: rawDataArray[i].images.fixed_height.url,
            fixedHeightStill: rawDataArray[i].images.fixed_height_still.url,
            fixedHeightSize: parseInt(rawDataArray[i].images.fixed_height_still.height)
        };
        gifData.push(newObj);
    }
    //display the GIF stills for all the gifs in the gifDataArray
    displayGifStills();
}

//when you click on a gif/image...
$("#gif-Section").on("click", function (event) {
    //do nothing if the click was not on an img tag
    if(event.target.nodeName.toUpperCase() != "IMG"){
        return;
    }
    //get the value of this image's ID which correspondes to the index of the array of items
    var indx = parseInt(event.target.id);

    // change the src attribute of this item based on its "state" value
    if(event.target.attributes["state"].value === "still"){
        event.target.attributes["src"].value = gifData[indx].fixedHeight;
        event.target.attributes["state"].value = "playing";
    }else{
        event.target.attributes["src"].value = gifData[indx].fixedHeightStill;
        event.target.attributes["state"].value = "still";
    }
});

$("#button-Holder").on("click", function (event){
    selectedItem = event.target.textContent;
    getGifs(selectedItem, 10);
});
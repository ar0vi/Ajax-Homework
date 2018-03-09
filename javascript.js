
//variable for button topics
var topicsArray= ["cats", "bunnies","prozac", "xanax", "wine", "almodovar", "mescaline", "fellini"]


//doc ready to wrap all functions//
$(document).ready(

    //generate buttons//
function buttonDisplay() {

  $("#buttonDump").empty();

  for(var i=0;i < topicsArray.length; i++) {
      var tbtn= $("<button>").addClass(".topicbtn").attr("topicData",topicsArray[i]).text(topicsArray[i]);
    $("#buttonDump").append(tbtn);
  }

  //Begin the GIF madness

  
  $("button").on("click", function() {
    var topic = $(this).attr("topicData");

//my giphy url//

      var queryURL= "http://api.giphy.com/v1/gifs/search?api_key=uo5is1Pfl35KJwYRclK8WeIgUzWBnc9v&q"+ topic +"=&limit=10&offset=0&rating=PG-13&lang=en" 
   
      //AJAX magic
    $.ajax({
      url: queryURL,
      method: "GET"
    })
        .then(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            //source url for animated gifs
            var animated = results[i].fixed_height.url;
            //stills url
            var still= results[i].fixed_height_still.url;
            //gif rating
            var rating = results[i].rating;

            var GIFbox= $("<div>");

            // paragraph for the rating
            var pGIF = $("<p>").text("Rating: " + rating);

            //image element for GIF
            var GIFimg = $("<img>");

            //adding giphy still link to image
            GIFimg.attr("src", still).attr("state", "dead");

            //appendectomy
            GIFbox.append(pGIF);
            GIFbox.append(GIFimg);
        
            //putting it on the page
            $("#GIFmadness").prepend(GIFbox);
      

            $(".gif").on("click", function() {

              var state = $(this).attr("state");
      
              if (state === "dead") {
                $(this).attr("src", animated);
                $(this).attr("state", "alive");
              } else {
                $(this).attr("src", still);
                $(this).attr("state", "alive");
              }
              })
            }
          })
        })
      });
  

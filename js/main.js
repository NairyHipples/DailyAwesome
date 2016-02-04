/*CODE WRITTEN BY JONATAN ÖSTLING - 2016-02-04*/

//variable that should be stored for later
var videoResults = 1;

//DOM ready function open
$(document).ready(function() {
  //Grab form, and att clickhandler on submit
  //the video request
  $('form').on('submit', function(e){
    //Prevent form from reloading page
    e.preventDefault();
    //this is 2 lines of code that bugged out my search. what it did was
    //it disabled the search field and the submit button until the content had loaded
    // $('#submit').prop("disabled", true);
    // $('#search').attr("disabled", true).val("Searching...");

    //Open request with various params for the google youtube data v3 api
    $.get(
      "https://www.googleapis.com/youtube/v3/search",{
        part: 'snippet',
        type: 'video',
        q: encodeURIComponent($('#search').val()).replace(/%20/g, "+"),
        maxResults: videoResults,
        order: 'viewCount',
        key: 'AIzaSyAEWYyHq1Tf8XR1sTJtC1Skgv8xAWzvF9s'},
        //success callback
        function(data){
          //storing data in output variable to use this to send data to the page
          var output;
          console.log(data);
          //empty the vidResults ul before appending new videos
          $('#vidResults').html("");
          $.each(data.items, function(i, item) {
            console.log(item);
            var videoTitle = item.snippet.title;
            var videoId = item.id.videoId;
            console.log(videoId);
            //adding the li and all other tags needed for the data to show up on the page
            output = '<li><p><strong>Title: </strong>'+videoTitle+'</p><div class="iframebox"><iframe class="videoBox" src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></div></li>';

            //Append to the results list
            $('#vidResults').append(output);
            //hiding picResults ul content because for every search, i automatically show the vidResults ul first
            $('#picResults').hide();
            //hiding the small filler text that tells the user what to do
            $('.backgroundText').hide();
            //showing the div that the video is going to be sent to
            $('.videosTab').show();
            //in here is the ul that the data was sent to. here we're showing it to the user
            $('#vidResults').show();
            //removing class active from the pictures menu tab, in case it is active when we do the search.
            //if we don't do this, both the picture tab AND the video tab will have the class of 'active'
            $('.picturesClick').removeClass('active');
            //finally adding the active class to the video tab
            $('.videosClick').addClass('active');
          });
          //this is the 2 last lines of code that was opened up top - that bugged out my search. what it did up there was
          //it disabled the search field and the submit button until the content had loaded, here it made them usable again since
          //the data has loaded
          // $('#search').prop("disabled", false).val("");
          // $('#submit').attr("disabled", false);
        }
      );
    }); //end video request

    //the picture request
    $('form').on('submit', function(e) {
      e.preventDefault();

      //ajax request to flickr with various params
      var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      var flickrOptions = {
        tags: $('#search').val(),
        format: "json"
      };
      //ajax callback
      function displayPhotos(data) {
        //creating variable to store the data and use it to send to the page later
        var photoHTML;
        //empty the UL named picResults before we get the image so that we only have 1 picture at a time.
        $('#picResults').html("");
        $.each(data.items, function(i, photo) {
          photoHTML = '<li><div class="iframebox">'
          photoHTML += '<a href="'+photo.link+'">';
          photoHTML += '<img src="'+photo.media.m+'"/></a></div></li>';
        });
        //finally append the variable to the page
        $('#picResults').append(photoHTML);
      }
      //the ajax main ajax call
      $.getJSON(flickrAPI, flickrOptions, displayPhotos);
    });//end picture request

    /*THIS LAST PART IS ONLY FOR THE MENU TABS*/
    $('.videosClick').on('click', function() {
      //when clicking on videos, see if pictures tab is active
      if ($('.picturesClick').hasClass('active')) {
        //if it is active, remove the class
        $('.picturesClick').removeClass('active');
      }
      //and add the class to (this) = video tab
      $(this).addClass('active');

      //when video tab is active, hide picResults UL so no photos
      //show where there should only be videos
      $('#picResults').hide();
      //hide the filler text from the beginning
      $('.backgroundText').hide();
      //show the video results UL
      $('#vidResults').show();
      //show the div that the vidResults UL are in
      $('.videosTab').show();

    });
    $('.picturesClick').on('click', function() {
      //when clicking on pictures, see if video tab is active
      if ($('.videosClick').hasClass('active')) {
        //if it is active, remove the class
        $('.videosClick').removeClass('active');
      }
      //and add the class to (this) = picture tab
      $(this).addClass('active');

      //when picture tab is active, hide vidResults UL so no videos
      //show where there should only be pictures
      $('#vidResults').hide();
      //hide the filler text from the beginning
      $('.backgroundText').hide();
      //show the picture results UL
      $('#picResults').show();
      //show the div that the picResults UL are in
      $('.picturesTab').show();
    });
}); // DOM ready close

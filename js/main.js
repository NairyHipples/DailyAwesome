var videoResults = 1;
var submitter = $('#submit');
var search = $('#search');

$(document).ready(function() {
  //Grab form, and att clickhandler on submit
  $('form').on('submit', function(e){
    //Prevent form from reloading page
    e.preventDefault();

    submitter.prop("disabled", true);
    search.attr("disabled", true).val("Searching...");
    //Open request
    $.get(
      "https://www.googleapis.com/youtube/v3/search",{
        part: 'snippet',
        type: 'video',
        q: encodeURIComponent(search.val()).replace(/%20/g, "+"),
        maxResults: videoResults,
        order: 'viewCount',
        key: 'AIzaSyAEWYyHq1Tf8XR1sTJtC1Skgv8xAWzvF9s'},
        //success
        function(data){
          var output;
          console.log(data);
          $('#vidResults').html("");
          $.each(data.items, function(i, item) {
            console.log(item);
            var videoTitle = item.snippet.title;
            var videoId = item.id.videoId;
            console.log(videoId);
            output = '<li><p><strong>Title: </strong>'+videoTitle+'</p><div class="iframebox"><iframe class="videoBox" src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></div></li>';

            //Append to the results list
            $('#vidResults').append(output);
            $('.backgroundText').hide();
            $('.videosTab').show();
            $('#vidResults').show();
            $('.videosClick').addClass('active');
            search.prop("disabled", false);
            submitter.attr("disabled", false).val("Search...");
          });
        }
      );
    }); //end video request

    $('form').on('submit', function(e) {
      e.preventDefault();

      //ajax
      var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      var flickrOptions = {
        tags: search.val(),
        format: "json"
      };
      //ajax callback
      function displayPhotos(data) {
        var photoHTML;
        $('#picResults').html("");
        $.each(data.items, function(i, photo) {
          console.log(photo.media.m);
          photoHTML = '<li><div class="iframebox">'
          photoHTML += '<a href="'+photo.link+'">';
          photoHTML += '<img src="'+photo.media.m+'"/></a></div></li>';
        });
        $('#picResults').append(photoHTML);
        search.prop("disabled", false);
        submitter.attr("disabled", false).val("Search...");
      }
      $.getJSON(flickrAPI, flickrOptions, displayPhotos);
    });//end picture request

    $('.videosClick').on('click', function() {
      if ($('.picturesClick').hasClass('active')) {
        $('.picturesClick').removeClass('active');
      }
      $(this).addClass('active');

      $('#picResults').hide();
      $('.backgroundText').hide();
      $('#vidResults').show();
      $('.videosTab').show();

    });
    $('.picturesClick').on('click', function() {
      if ($('.videosClick').hasClass('active')) {
        $('.videosClick').removeClass('active');
      }
      $(this).addClass('active');

      $('#vidResults').hide();
      $('.backgroundText').hide();
      $('#picResults').show();
      $('.picturesTab').show();
    });


  }); // DOM ready

  // //First function
  // $.get(
  //   "https://www.googleapis.com/youtube/v3/channels",{
  //     part: 'contentDetails',
  //     forUsername: channelName,
  //     key: 'AIzaSyAEWYyHq1Tf8XR1sTJtC1Skgv8xAWzvF9s'},
  //     function(data){
  //       console.log(data);
  //       $.each(data.items, function(i, item) {
  //         console.log(item);
  //         var pid = item.contentDetails.relatedPlaylists.uploads;
  //         getVids(pid);
  //       });
  //     }
  // );

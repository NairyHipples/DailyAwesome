var videoResults = 1;


$(document).ready(function() {
  //Grab form, and att clickhandler on submit
  $('form').on('submit', function(e){
    //Prevent form from reloading page
    e.preventDefault();

    //Open request
    $.get(
      "https://www.googleapis.com/youtube/v3/search",{
        part: 'snippet',
        type: 'video',
        q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
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
            output = '<li><p>'+videoTitle+'</p><iframe class="videoBox" src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>';

            //Append to the results list
            $('#vidResults').append(output);
          });
        }
      );

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

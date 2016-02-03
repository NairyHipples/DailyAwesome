var videoResults = 3;


$(document).ready(function() {
  $('form').on('submit', function(e){

    e.preventDefault();
    $.get(
      "https://www.googleapis.com/youtube/v3/search",{
        part: 'snippet',
        type: 'video',
        q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
        maxResults: videoResults,
        order: 'viewCount',
        publishedAfter: '2000-01-01T00:00:00Z',
        key: 'AIzaSyAEWYyHq1Tf8XR1sTJtC1Skgv8xAWzvF9s'},
        function(data){
          
          var output;
          console.log(data);
          $.each(data.items, function(i, item) {
            console.log(item);
            var videoTitle = item.snippet.title;
            var videoId = item.id.videoId;
            console.log(videoId);
            output = '<li>'+videoTitle+'<iframe class="videoBox" src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>';

            //Append to the results list
            $('#results').append(output);
          });
        }
      );

    });
  });
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

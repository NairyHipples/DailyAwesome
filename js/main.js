var channelName = 'TechGuyWeb';
var videoResults = 10;
$(document).ready(function() {
  $.get(
    "https://www.googleapis.com/youtube/v3/channels",{
      part: 'contentDetails',
      forUsername: channelName,
      key: 'AIzaSyAEWYyHq1Tf8XR1sTJtC1Skgv8xAWzvF9s'},
      function(data){
        console.log(data);
        $.each(data.items, function(i, item) {
          console.log(item);
          var pid = item.contentDetails.relatedPlaylists.uploads;
          getVids(pid);
        });
      }
  );

  function getVids(pid) {
    console.log('Inside getVids function');
    $.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",{
        part: 'snippet',
        maxResults: videoResults,
        playlistId: pid,
        key: 'AIzaSyAEWYyHq1Tf8XR1sTJtC1Skgv8xAWzvF9s'},
        function(data){
          var output;
          console.log(data);
          $.each(data.items, function(i, item) {
            console.log(item);
            var videoTitle = item.snippet.title;

            output = '<li>'+videoTitle+'</li>';

            //Append to the results list
            $('#results').append(output);
          });
        }
    );
  
  }
});


var playlist_id="";

function tplawesome(e,t){
	res=e;
	for(var n=0;n<t.length;n++){
		console.log(t.length);
		res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
			return t[n][r]}
			)}
		return res
	}


	function handleClientLoad() {
        // Load the API client and auth2 library
        gapi.load('client:auth2', initClient);
     }

     function initClient() {
        gapi.client.init({
            'apiKey': 'AIzaSyBvgDURzyjNXXvZGv6y9950P5kWJLuTWTM',
            'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
            'clientId': '540776227486-nlv1uh6np49395022eft3t1e41msi1ru.apps.googleusercontent.com',
            'scope': 'https://www.googleapis.com/auth/youtube.force-ssl'
        }).then(function () {
        	gapi.auth2.getAuthInstance()
      	    .signIn()
        	.then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
        }).then(function(){
        	execCreatePlaylist()
        });
      }


// function authenticate() {
    // return 
/*    gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "145089069766-5vp3ftrk98ne5h9qogshjouhvj072d7g.apps.googleusercontent.com"});
	});

    gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });*/
// }


$(function(){
	$("form").on("submit", function(e){
		e.preventDefault();
		var request=gapi.client.youtube.search.list({
			part:"snippet",
			type: "video",
			q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
			maxResults: 9,
			order: "relevance",
		});
		request.execute(function(response){
			var results=response.result;
			console.log(results);
			// $("#results").append("<script type=\"text/javascript\">$(\"button\").click(function() {var fired_button = $(this).val();console.log(fired_button);});</script>");
            $.each(results.items, function(index, item){
//                $("#results").append(item.snippet.title+ " " + item.id.videoId + "<br>");
                $.get("tpl/item.html", function(data){
                	// $("#results").append("<script type=\"text/javascript\">$(\"button\").click(function() {var fired_button = $(this).val();console.log(fired_button);});</script>");
                    $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                });
            });
		});
	});
});





function execVideoAdd(buttonValue) {
    return gapi.client.youtube.playlistItems.insert({
      "part": [
        "snippet"
      ],
      "resource": {
        "snippet": {
        	// "PLYdc5Hf4OFHgoYj36r-yQsQsm3XAaxO5c"
          "playlistId": "PLYdc5Hf4OFHgoYj36r-yQsQsm3XAaxO5c",
          "position": 0,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": buttonValue
          }
        }
      }
    })
        .then(function(response) {
                console.log("Response", playlist_id);
                console.log("Response", response);

              },
              function(err) { console.error("Execute error", err); });
  }





/*  function execCreatePlaylist() {
    return gapi.client.youtube.playlists.list({
      "part": [
        "snippet,contentDetails"
      ],
      "maxResults": 25,
      "mine": true
    })
        .then(function(response) {
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }*/



  function createPlaylist() {
    gapi.client.youtube.playlists.insert({
      "part": [
        "snippet,status"
      ],
      "resource": {
        "snippet": {
          "title": "Nostalgia Therapy",
          "description": "This is a sample playlist description.",
          "tags": [
            "sample playlist",
            "API call"
          ],
          "defaultLanguage": "en"
        },
        "status": {
          "privacyStatus": "private"
        }
      }
    })
        .then(function(response) {
        		playlist_id= response.result.id;
                console.log("Response", playlist_id);
              },
              function(err) { console.error("Execute error", err); });
  }




    function execCreatePlaylist() {
    var request=gapi.client.youtube.playlists.list({
      "part": [
        "snippet,contentDetails"
      ],
      "maxResults": 25,
      "mine": true
    })
    	var counter=0;
        request.execute(function(response){
			var results=response.result;
			console.log(results);
			results.items.forEach(function(item){
				console.log(item.snippet.title)
				if (item.snippet.title == "Nostalgia Therapy") {
					counter= 1;
					playlist_id= item.id;
					console.log(item.id)
				}
			})
			console.log(counter);
			if (counter==0){
				createPlaylist();
			}
              },
              function(err) { console.error("Execute error", err); });
  }






/*function init(){
	gapi.client.setApiKey("AIzaSyD-DNpjOdTfgYXH5id4wamQOrbPs0V07XA");
	gapi.client.load("youtube", "v3", function(){});
}*/



function tplawesome(e,t){
	res=e;
	for(var n=0;n<t.length;n++){
		console.log(t.length);
		res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
			return t[n][r]}
			)}
		return res}


function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
}



function exec() {
    return gapi.client.youtube.playlistItems.insert({
      "part": [
        "snippet"
      ],
      "resource": {
        "snippet": {
          "playlistId": "PLYdc5Hf4OFHgoYj36r-yQsQsm3XAaxO5c",
          "position": 0,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": "D1vcT1cDcEc"
          }
        }
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }



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

gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "540776227486-nlv1uh6np49395022eft3t1e41msi1ru.apps.googleusercontent.com"});
});


function init(){
	gapi.client.setApiKey("AIzaSyBSp6Q1MToyh1AdYw-CQUGWiUDeQK6TZv8");
	gapi.client.load("youtube", "v3", function(){});
}



  /**
   * Sample JavaScript code for youtube.search.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyBvgDURzyjNXXvZGv6y9950P5kWJLuTWTM");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": 9,
      "order": "relevance",
      "q": "gone with the wind",
      "type": [
        "video"
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                var results=response.result;
                $.each(results.items, function(index, item){
    //                $("#results").append(item.snippet.title+ " " + item.id.videoId + "<br>");
                    $.get("tpl/item.html", function(data){
                        $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                    });
                });
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "540776227486-nlv1uh6np49395022eft3t1e41msi1ru.apps.googleusercontent.com"});
  });


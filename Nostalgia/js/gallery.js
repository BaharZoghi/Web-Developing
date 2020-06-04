function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function(){
	$("form").on("submit", function(e){
		e.preventDefault();
		var request=gapi.client.youtube.search.list({
			part:"snippet",
			type: "video",
			q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
			maxResults: 9,
			order: "relevance",
			h1:"en_US"
		});
		request.execute(function(response){
			var results=response.result;
            $.each(results.items, function(index, item){
//                $("#results").append(item.snippet.title+ " " + item.id.videoId + "<br>");
                $.get("tpl/item.html", function(data){
                    $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                });
            });
		});
		
		var players = [];
        $("iframe").filter(function(){return src.indexOf('http://www.youtube.com/') == 0}).each( function (k, v) {
            if (!id) { id='embeddedvideoiframe' + k }
            players.push(new YT.Player(id, {
                events: {
                    'onStateChange': function(event) {
                        if (event.data == YT.PlayerState.PLAYING) {
                            $.each(players, function(k, v) {
                                if (getIframe().id != event.target.getIframe().id) {
                                    pauseVideo();
                                }
                            });
                        }
                    }
                }
            }))
        });
	});
});


function init(){
	gapi.client.setApiKey("AIzaSyBvgDURzyjNXXvZGv6y9950P5kWJLuTWTM");
	gapi.client.load("youtube", "v3", function(){});
}
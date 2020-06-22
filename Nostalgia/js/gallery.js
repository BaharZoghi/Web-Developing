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
	});
});

var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(function onYouTubeIframeAPIReady() {
    var players = [];
    $('iframe').filter(function(){return this.src.indexOf('http://www.youtube.com/') == 0}).each( function (k, v) {
        if (!this.id) { this.id='embeddedvideoiframe' + k }
        players.push(new YT.Player(this.id, {
            events: {
                'onStateChange': function(event) {
                    if (event.data == YT.PlayerState.PLAYING) {
                        $.each(players, function(k, v) {
                            if (this.getIframe().id != event.target.getIframe().id) {
                                this.pauseVideo();
                            }
                        });
                    }
                }
            }
        }));
    });
});


function init(){
	gapi.client.setApiKey("AIzaSyD-DNpjOdTfgYXH5id4wamQOrbPs0V07XA");
	gapi.client.load("youtube", "v3", function(){});
}
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


function init(){
	gapi.client.setApiKey("AIzaSyCrz04Ul5JT099Uz8f_5Djagj_sbUH-FRU");
	gapi.client.load("youtube", "v3", function(){});
}
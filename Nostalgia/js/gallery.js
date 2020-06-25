function tplawesome(e,t){
	res=e;
	for(var n=0;n<t.length;n++){
		console.log(t.length);
		res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
			return t[n][r]}
			)}
		return res}

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
                	$("#results").append("<script type=\"text/javascript\">$(\"button\").click(function() {var fired_button = $(this).val();console.log(fired_button);});</script>");
                    $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                });
            });
		});
	});
});


function init(){
	gapi.client.setApiKey("AIzaSyBSp6Q1MToyh1AdYw-CQUGWiUDeQK6TZv8");
	gapi.client.load("youtube", "v3", function(){});
}
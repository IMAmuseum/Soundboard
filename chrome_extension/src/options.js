$(document).ready(function(){

	$("#soundboard_endpoint").val(localStorage["soundboard_endpoint"]);

	$("#save").click(function(e) {
		e.preventDefault();

		var endpoint = $("#soundboard_endpoint").val();

		localStorage["soundboard_endpoint"] = endpoint;

		$("#status").text("Options Saved!").slideDown();

		setTimeout(function(){
			$("#status").text("Options Saved!").slideUp();
		}, 3000);
	});

});
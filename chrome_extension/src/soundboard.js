$(document).ready(function(){
	$("#sounds").on("click", "a.play", function(e) {
		e.preventDefault();

		var $this = $(this);

		$.ajax({
			url: $this.attr("href")
		});
	});

	$.ajax({
		url: localStorage["soundboard_endpoint"],
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			var container = $("#sounds");
			var numSounds = data.commands.length;
			for (var i = 0; i < numSounds; i++) {
				var sound = data.commands[i];
				var classes = "sound";
				var listItem = $("<li>", {
					"class": classes,
					"data-command": sound.command
				}).appendTo(container);

				var linkText = "";
				if (sound.title) {
					linkText = sound.title + " <span class=\"command\">(" + sound.command + ")</span>";
				} else {
					linkText = sound.field_command_value;
				}

				var soundLink = $("<a>", {
					href: localStorage["soundboard_endpoint"] + "/" + sound.command,
					html: linkText,
					"class": "play"
				}).appendTo(listItem);

				if (sound.file_uri) {
					var preview = $("<a>", {
						href: "#",
						"class": "preview",
						"data-src": sound.file_uri.join(","),
						"text": "Preview"
					}).appendTo(listItem);
				}
			}

			container.find("li").tsort('a');
		}
	});

	$("a.sort").click(function(e){
		e.preventDefault();
		var order = 'asc';

		var sort = $(this).data("sort");
		switch(sort) {
			case 'alpha-a':
				order = 'asc';
				break;
			case 'alpha-z':
				order = 'desc';
				break;
		}

		$("a.sort").removeClass("active");
		$(this).addClass("active");

		$("#sounds").find("li").tsort('a', {order:order});
	});

	$("#filter").keyup(function () {
		var filter = $(this).val();
		var count = 0;

		$("#sounds").find("li").each(function () {
			var $this = $(this);
			if ($this.text().search(new RegExp(filter, "i")) < 0) {
				$this.addClass("hidden");
			} else {
				$this.removeClass("hidden");
				count++;
			}
		});
	});
});
function throwErr($elem) {
	$elem.css({
		"background": "#FAFBFF"
	}).addClass('shake').promise().done(function () {
		setTimeout(function () {
			$('input, textarea').removeClass('shake');
		}, 400);
	});
}

function check() {
	var allGood = true;
	$("input[type='text'], textarea").each(function() {
		if (!$(this).val()) {
			throwErr($(this));
			allGood = false;
		} else {
			$(this).css({
				"background": "#fff"
			});
		}
	});
	if (allGood) {
		send();
	}
}

function send() {
	var name	= $("input[name='name']").val(),
		email	= $("input[name='email']").val(),
		message = $("textarea").val(),
		params	= "name=" + name + "&email=" + email + "&message=" + message;
	$.post('mail.php', params, function(data) {
		if (data !== "true") {
			throwErr($("input[name='email']"));
			console.log(data);
		}
	});
}

function resize() {
	$(".link").height($(".link").width()).css("line-height", $(".link").width() + "px");
}

$(document).ready(resize);
$(window).resize(resize);
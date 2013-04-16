function throwErrs() {
	$("[error='true']")
	.css("background", "#FAFBFF")
	.addClass('shake')
	.promise().done(function () {
		setTimeout(function () {
			$('input, textarea').removeClass('shake');
		}, 400);
	});
	$("[error='false']").css("background", "#fff");
}

function check() {
	$("input[type='text'], textarea").each(function() {
		if (!$(this).val()) {
			$(this).attr('error', 'true');
		} else {
			$(this).attr('error', 'false');
		}
	});
	if (!send()) {
		$('.email').attr('error', 'true');
	}
	throwErrs();
}

/**
 * Sends POST request to mail.php
 * @return {Boolean} Whether any errors were thrown
 */
function send() {
	var name	= $("input[name='name']").val(),
		email	= $(".email").val(),
		message = $("textarea").val(),
		params	= "name=" + name + "&email=" + email + "&message=" + message;
	$.post('mail.php', params, function(data) {
		if (data !== "true") {
			return false;
		} else {
			return true;
		}
	});
}

function resize() {
	$(".link").height($(".link").width()).css("line-height", $(".link").width() + "px");
}

$(document).ready(resize);
$(window).resize(resize);
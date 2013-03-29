$(window).scroll(function () {
	var top = $(window).scrollTop();
	if (top > 50 && top < $(document).height() - $(window).height() - 100) {
		$('nav').addClass('hidden');
	} else {
		$('nav').removeClass('hidden');
	}
});

$(document).ready(function () {
	$('html').css('opacity', '1');
});

var strip = $('.strip'),
	slide = 0,
	num = $('.strip').children().length;

function nextSlide() {
	strip.css('left', -1 * slide * 700 + 'px');
	slide++;
	if (slide >= num)
	   slide = 0;
}
var slider = setInterval(nextSlide, 3000);
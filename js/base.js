$(window).scroll(function () {
    var top = $(window).scrollTop();
    if (top > 50 && top < $(document).height() - $(window).height() - 50) {
        $('header').addClass('hidden');
    } else {
        $('header').removeClass('hidden');
    }
});

$(window).on('load', function () {
    $('html').addClass('loaded');
});
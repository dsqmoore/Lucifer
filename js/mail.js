function throwErrs() {
    $("[error='true']")
    .css("background", "#FAFBFF")
    .addClass("shake")
    .promise().done(function () {
        setTimeout(function () {
            $("input, textarea").removeClass("shake");
        }, 400);
    });
    $("[error='false']").css("background", "#fff");
}

function check() {
    $("input[type='text'], textarea").each(function() {
        if (!$(this).val()) {
            $(this).attr("error", "true");
        } else {
            $(this).attr("error", "false");
        }
    });
    send();
}

function send() {
    var name    = $("input[name='name']").val(),
        email   = $(".email").val(),
        message = $("textarea").val(),
        params  = "name=" + name + "&email=" + email + "&message=" + message,
        result;

    // Disable the inputs while loading
    $("input, textarea").attr("disabled", "true");

    $.ajax({
        type: "POST",
        url: "mail.php",
        data: params,
        success: function(data) {
            if (data !== "true" && data !== "sent") {
                var index = data.indexOf("Message was not sent");
                if (index !== -1) {
                    $(".sent").html("<h3>Oh no! An error occurred</h3>Please try later, or if the problem persists, let us know by emailing us directly.").show();
                    $("form").css({
                        "top": -$(".form").height() + $(".sent").height(),
                        "margin-bottom": -$(".form").height() + $(".sent").height(),
                        "opacity": 0
                    });
                    $(".sent").css("opacity", 1);
                    $(".mailto").addClass("strobe").promise().done(function () {
                        setTimeout(function () {
                            $(".mailto").removeClass("strobe");
                        }, 6000);
                    });
                    console.log(data);
                    result = true;
                } else {
                    result = false;
                }
            } else if (data === "true") {
                result = true;
            } else if (data === "sent") {
                result = true;
                $(".sent").show();
                $("form").css({
                    "top": -$(".form").height() + $(".sent").height(),
                    "margin-bottom": -$(".form").height() + $(".sent").height(),
                    "opacity": 0
                });
                $(".sent").css("opacity", 1);
            }

            if (result) {
                $(".email").attr("error", "false");
            } else {
                $(".email").attr("error", "true");
            }

            $("input, textarea").removeAttr("disabled");
            throwErrs();
        },
        error: function(err) {
            $("input, textarea").removeAttr("disabled");
            alert("An error occurred.");
            console.log(err);
        }
    });
}

function popup() {
    $(".pop").show();
}

function resize() {
    $(".link").height($(".link").width()).css("line-height", $(".link").width() + "px");
}

$(document).ready(resize);
$(window).resize(resize);

$(".mailto").on("mouseover", function () {
    $(this).attr("href", window.atob("bWFpbHRvOmluZm9AY29kZXEuY2E="));
});

$(".overlay").on("click", function () {
    $(".pop").hide();
});
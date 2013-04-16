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
    send();
}

function send() {
    var name    = $("input[name='name']").val(),
        email   = $(".email").val(),
        message = $("textarea").val(),
        params  = "name=" + name + "&email=" + email + "&message=" + message,
        result;

    // Disable the inputs while loading
    $('input, textarea').attr('disabled', 'true');

    $.ajax({
        type: "POST",
        url: "mail.php",
        data: params,
        success: function(data) {
            if (data !== "true") {
                var index = data.indexOf("Message was not sent");
                if (index !== -1) {
                    alert("An error occurred, and the message was not sent");
                    result = true;
                } else {
                    console.log("returned false");
                    result = false;
                }
            } else {
                result = true;
            }

            if (result) {
                $('.email').attr('error', 'false');
            } else {
                $('.email').attr('error', 'true');
            }

            $('input, textarea').removeAttr('disabled');
            throwErrs();
        },
        error: function(err) {
            $('input, textarea').removeAttr('disabled');
            alert("An error occurred.");
            console.log(err);
        }
    });
}

function resize() {
    $(".link").height($(".link").width()).css("line-height", $(".link").width() + "px");
}

$(document).ready(resize);
$(window).resize(resize);
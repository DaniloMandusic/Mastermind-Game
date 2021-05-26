$(function () {

    window.sessionStorage.clear();

    var player1_consent = false;
    var player2_consent = false;

    // razumeli su pravila
    $('#p1, #p2').on('click', function (e) {

        e.preventDefault();

        var value = $(this).val();

        if (value == 1) {
            player1_consent = true;
            $(this).removeClass('btn-primary')
            $(this).addClass('btn-primary-invert')
        } else if (value == 2) {
            player2_consent = true;
            $(this).removeClass('btn-primary')
            $(this).addClass('btn-primary-invert')
        }

        if (player1_consent && player2_consent) {
            window.sessionStorage.setItem('player1_consent', 1);
            window.sessionStorage.setItem('player2_consent', 1);
            window.location = "skocko-podesavanja.html";
        }
    });

});


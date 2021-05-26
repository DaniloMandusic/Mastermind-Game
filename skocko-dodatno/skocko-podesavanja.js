var player1 = {'no': 1, 'set': []};
var player2 = {'no': 2, 'set': []};

var player1_consent = window.sessionStorage.getItem('player1_consent');
var player2_consent = window.sessionStorage.getItem('player2_consent');

if (player1_consent != 1 || player2_consent != 1) {
    alert('Nije potvrđena saglasnost sa pravilima');
    window.location = "skocko-uputstvo.html";
}

$(function () {

    // postavljanje kombinacije igrac 1
    $('.fnc-player1-set').on('click', 'span', function () {

        var me = $(this);

        if (player1.set.length < MAX_LENGTH) {
            player1.set.push(me.data('value'));
            drawTable('.fnc-cnt-' + player1.no, player1.set, false);
        }

    });

    // postavljanje kombinacije igrac 2
    $('.fnc-player2-set').on('click', 'span', function () {

        var me = $(this);

        if (player2.set.length < MAX_LENGTH) {

            player2.set.push(me.data('value'));

            drawTable('.fnc-cnt-' + player2.no, player2.set, false);
        }
    });

    // startovanje igre
    $('#btn-start').on('click', function (e) {

        e.preventDefault();

        if (player1.set.length != MAX_LENGTH || player1.set.length != MAX_LENGTH) {
            alert('Nisu postavljene kombinacije za igrače');
            return;
        }

        window.sessionStorage.setItem('player1_set', JSON.stringify(player1));
        window.sessionStorage.setItem('player2_set', JSON.stringify(player2));

        window.location = "skocko-igra.html";

    });
});

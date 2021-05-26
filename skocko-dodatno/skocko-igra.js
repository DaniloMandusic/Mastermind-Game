// provera setovanja
var player1_set = window.sessionStorage.getItem('player1_set');
var player2_set = window.sessionStorage.getItem('player2_set');

if (!player1_set || !player2_set) {
    alert('Nisu setovane kombinacije');
    window.location = "skocko-podesavanja.html";
}

player1_data = JSON.parse(player1_set);
player2_data = JSON.parse(player2_set);

var player1 = {};
player1.no = 1;
player1.understandRules = false;
player1.set = player1_data.set;
player1.draw = [];
player1.score = [];
player1.current_draw = 0;
player1.timer = null;
player1.time_counter = 0;

var player2 = {};
player2.no = 2;
player2.set = player2_data.set;
player2.draw = [];
player2.score = [];
player2.current_draw = 0;
player2.timer = null;
player2.time_counter = 0;

var board1 = $('.fnc-player1-board .fnc-items');
var board2 = $('.fnc-player2-board .fnc-items');

// akcija
$(function () {

    player1.timer = window.setInterval(ticktock, 1000, player1);
    showItems(player1, true);

    // igrac 1 pogadja
    board1.on('click', 'span', function () {
        play(player1, player2, $(this).data('value'));
    });

    // igrac 2 pogadja
    board2.on('click', 'span', function () {
        play(player2, player1, $(this).data('value'));
    });

});


const MAX_LENGTH = 4; // broj polja
const MAX_DRAWS = 7; // max broj pokusaja
const IN_PLACE = 1; // znak je na mestu
const PRESENT = 0; // znak je prisutan ali nije na mestu
const HIT = 4; // svi pogodjeni
const TIMEOUT = 60 // vreme za unosenje kombinacija

// mapa ikona
var draw_map = [
    'icon-star-empty',
    'icon-spades',
    'icon-clubs',
    'icon-diamonds',
    'icon-heart',
    'icon-reddit',
    'icon-star-full',
];

// mapa pogodaka
var score_map = [
    'yellow', // nije na poziciji
    'red',    // na poziciji
];

/**
 *
 * Iscrtava unetu kombinaciju
 *
 * @param container
 * @param items
 * @param showSign  ako je true prikazuje znake, inace prikazuje zvezdicu
 */
function drawTable(container, items, showSign) {
    $(container).html('');

    items.forEach((item) => {

        let div = $('<div />').addClass('col-3');

        let span = $('<span />').addClass('icon-size border border-secondary');

        span.addClass(showSign ? draw_map[item] : draw_map[0]);

        $(container).append(div.html(span));
    });
}

/**
 *
 * Iscrtava pogotke
 *
 * @param container
 * @param items
 */
function drawScore(container, items) {

    $(container).html('');

    items.forEach((item) => {

        let span = $('<span />').addClass('icon-stop2 icon-size border border-secondary');

        span.css('color', score_map[item]);

        let div = $('<div />').addClass('col-3');

        $(container).append(div.html(span));
    });
}

/**
 *
 * Obradjuje unos kombinacije
 *
 * @param active
 * @param passive
 * @param value
 */
function play(active, passive, value) {

    var score = 0;
    var current_draw = active.current_draw;

    if (active.draw[current_draw] == undefined || active.draw[current_draw].length < MAX_LENGTH) {

        if (current_draw < MAX_DRAWS && active.draw[current_draw] == undefined) {
            active.draw.push([]);
        }

        active.draw[current_draw].push(value);

        let draw_container = '.fnc-player' + active.no + '-board .fnc-draw-' + current_draw + ' .fnc-guess-' + current_draw + ' .row';

        drawTable(draw_container, active.draw[current_draw], true);

        if (active.draw[current_draw].length != MAX_LENGTH) {
            return;
        }

        showItems(active, false);

        resetTimerData(active);

        score = calculateScore(active, current_draw);

        let score_container = '.fnc-player' + active.no + '-board .fnc-draw-' + current_draw + ' .fnc-score-' + current_draw + ' .row';

        drawScore(score_container, active.score[current_draw]);

        if (score == HIT) {

            alert('Pogodak');

            return;
        }

        active.current_draw = ++current_draw;

        if (current_draw == MAX_DRAWS && score != HIT) {

            showSolution(active);

            alert('Kraj');

            if (passive.current_draw == MAX_DRAWS) {
                return;
            }
        }

        passive.timer = window.setInterval(ticktock, 1000, passive);
        showItems(passive, true);

    }
}


/**
 *
 * Izracunava broj pogodjenih itema
 *
 * @param current_player
 * @param current_draw
 * @returns {*}
 */
function calculateScore(current_player, current_draw) {

    var temp_guess = current_player.draw[current_draw].slice();
    var temp_set = current_player.set.slice();
    var remove = [];

    current_player.score.push([]);

    temp_set.forEach((item, index) => {

        if (item == temp_guess[index]) {
            current_player.score[current_draw].push(IN_PLACE);
            remove.push(index);
        }

    });

    // oznaci za izbacivanje
    remove.forEach((index) => {
        temp_guess[index] = 0;
        temp_set[index] = 0;
    });


    // izbaci sve koji su setovani na 0
    temp_guess = temp_guess.filter(value => value != 0);
    temp_set = temp_set.filter(value => value != 0);

    // ako se nalazi u nizu
    temp_set.forEach((item) => {

        var is_present = temp_guess.filter(value => value == item);

        if (is_present.length > 0) {
            current_player.score[current_draw].push(PRESENT);
        }

    });

    // izracunaj skor
    // ako su svi na pozicijama suma niza je 4
    return current_player.score[current_draw].reduce(function (acc, val) {
        return acc + val;
    }, 0);

}

/**
 * Tajmerska funkcija
 * @param current_player
 */
function ticktock(current_player) {

    if (current_player.time_counter >= TIMEOUT) {

        resetTimerData(current_player);

        alert('Vreme je isteklo');

        showSolution(current_player);

        return;
    }

    current_player.time_counter++;

    var percent = current_player.time_counter * 100 / TIMEOUT;

    $('.fnc-player' + current_player.no + '-board .progress-bar').css('width', percent + '%');
}

/**
 * Prikazi resenje
 * @param current_player
 */
function showSolution(current_player) {
    let solution_container = '.fnc-solution-' + current_player.no;

    $(solution_container).removeClass('hidden');

    drawTable(solution_container, current_player.set, true);
}

/**
 * Zaustavi tajmersku funkciju
 * @param current_player
 */
function resetTimerData(current_player) {

    window.clearInterval(current_player.timer);

}

/**
 * Prikazi polje za unos kombinacije
 * @param current_player
 * @param status
 */
function showItems(current_player, status) {
    let container = '.fnc-player' + current_player.no + '-board .fnc-items';

    status ? $(container).removeClass('hidden') : $(container).addClass('hidden');
}

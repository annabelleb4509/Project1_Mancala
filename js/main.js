
/*
const menuLinks = [
    {text: 'Manual', href: /manual},
    {text: 'Play again', href: /play }
]


document.getElementById("menu").addEventListener('click', navBar);
var i;

function navBar(event) {
    console.log('click detected');
}

*/


/* -----  constants ------ */

const players = {
    1: 'player1',                   //define players as 1 and 2?? 
    2: 'player2'
}

const seedsInStore = {
    store1: [],
    store2: [],
}

// two players
// seeds


/* -----  state varibles ------ */

states = {                                          // how do I define the board row1+row2 or include stores?
    board:  [
            [4, 4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4, 4]
    ],
    store1: null,
    store2: null,
    turn: null,
    winner: null,
}

/* -----  cached elements ------ */


const elements = {
    whosTurn: document.querySelectorAll('.turn > div'),
    board: document.querySelectorAll('.board > div')            // how do I select the elements here? individually?
 //   playAgain: document.
// 
}



/* ----- event listeners ------ */

document.querySelector('#midrowTop').addEventListener('click', handleMove);
document.querySelector('.midrowBottom').addEventListener('click', handleMove);


// eventlistener menubar click
// eventlistener play again
// eventlistener manual 


/* ----- functions ------ */

init();

function init() {
    state.board = [
        [4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4],
    ];
    state.turn = 1;
    state.winner = null;
    render();
}

function handleMove(event) {
    console.log('click detected')
}

// Initialise game - player one SVGTransformList

// handleAction function when player plays -> means when player clicks pot in own row
// determine which position, empty the pot
// loop to distribute all seeds anticlockwise including all mid-row pots + own store until all gone <arr.length

//when all seeds dropped, determine position of last seed
// is it an empty pot in own row + is it own store? --> if true, same player plays again : otherwise other players turn
// show which player's turn by lighting up 'Player' next to board


// renderBoard
// = render rows (pots)
// = render Store

/*

end of game:
if row 1 or row 2 don't have any seeds left === game over;
winner === player that has collected more seeds in their store;

renderMessage Who is the winner?
if equal amount of seeds === tie



*/






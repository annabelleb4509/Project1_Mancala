

/* -----  constants ------ */

const players = {
    1: 'player1',                   
    2: 'player2'
}

const beads = {

}

// seeds


/* -----  state varibles ------ */

let state = {                                          // how do I define the board row1+row2 or include stores?
    board: [
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
    message: document.querySelectorAll('.turn > div'),
    board: document.querySelectorAll('.board > div'),
    beads: document.querySelectorAll('.beads > div'),            // how do I select the elements here? individually?
 //   playAgain: document.
// 
}



/* ----- event listeners ------ */

document.getElementById('bottom').addEventListener('click', handleAction);
document.getElementById('top').addEventListener('click', handleAction);


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
    state.store1 = null;
    state.store2 = null;
    state.turn = 1;
    state.winner = null;
  //  render();
}

function handleAction(event) {
    console.log('click detected')
let currentPot = event.target.id;
let numBeadsCurrentPot = state.board[currentPot];
if (state.winner !== null) {
    return;
}
for ( let i = numBeadsCurrentPot; i > -1; i-- ) {
    let beadsInPot = state.board[indexIndividualPot];
  if (state.turn === 1 && currentPot <= 5 || state.turn === 2 && currentPot >= 7 && currentPot <= 12) {
    state.board[currentPot + 1] = beadsInPot + 1;
  };
  console.log(state.board[currentPot+1]);
// captureBeads();
checkGameOver();
render()
};
}

//missing: put actual seeds in pots
/*
function captureBeads() {
    if (numBeads in pot of last dropped bead === 0) {
        if (state.board[Index] + numBeadsofPotPlayed) === 0) {
            are there 
        } 
        check if there are beads in pot on opposite site and put bead from current + opposite in store of current player;
        state.turn = state.turn;
    } else {
        state.turn !== state.turn;
    };
}

*/



// is it an empty pot in own row + is it own store? --> if true, same player plays again : otherwise other players turn
// show which player's turn by lighting up 'Player' next to board




function checkGameOver() {
    if (state.board[i] === 0) {
        determineWinner();
    } else {
    return;
}
};

function determineWinner() {
    if (state.store1 === state.store2){
        return 'Tie';
    }
    if (state.store1 > state.store2) {
        state.winner = 1;
    } else {
        state.winner = 2;
    };
    render()
};


function render() {
    renderBoard();
    renderStore();
    renderMessage();
}


function renderBoard() {
    state.board.forEach(function() {
        elements.board[index].appendChild = bead;
    });
};

function renderStore() {
//take count of beads in each store AND add number to player1/player2 in score section on screen
};


// include TIE in function renderMessage() {
    

function renderMessage() {    
    if (state.winner === 'Tie') {
        elements.message.innerHTML = `It's a draw`;
    }      // show winner
    else if (state.winner) {
        elements.message.innerHTML = `<span>${ players[state.winner] }</span> wins!`; 
    } else {
        elements.message.innerHTML = `<span ${ players[state.turn] }</span>'s turn`;   
    }
}









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

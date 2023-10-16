

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
    board: [],
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
    state.board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    state.store1 = null;
    state.store2 = null;
    state.turn = 1;
    state.winner = null;
  //  render();
}

function handleAction(event) {
    console.log('click detected')
let currentPot = event.target.id;
console.log("currentPot " + currentPot)
console.log('state.turn ' + state.turn)
let numBeadsCurrentPot = state.board[currentPot];
// let numBeadsCurrentPot = state.board[state.turn][currentPot];
console.log('numBeadsCurrentPot ' + numBeadsCurrentPot)
if (state.winner !== null) {
    return;
}

//  Add one bean to pot
nextPot = Number(currentPot)
// Skip to next if nextPot is 6 or 13
console.log('numBeadsCurrentPot ' + numBeadsCurrentPot)
if (state.turn === 1 && currentPot <= 5 || state.turn === 2 && currentPot >= 7 && currentPot <= 12) {
    for ( let i = numBeadsCurrentPot; i > 0; i-- ) {
        console.log('i ' + i)
        nextPot += 1;
        if (state.turn === 1 && nextPot !== 13 || state.turn === 2 && nextPot !== 6) {
        console.log('nextPot ' + nextPot)
        nextPotBeanCount = state.board[nextPot];
        console.log('nextPotBeanCount ' + nextPotBeanCount)
        state.board[nextPot] = nextPotBeanCount + 1;
        } else if ( nextPot === 14) {
            nextPotBeanCount = state.board[0];
            state.board[0] = nextPotBeanCount + 1;
        } else {                                                            //else: means if next pot is store of the other player (ie for player 1 = pot13, for player 2 = pot6), skip this pot and move to next
            nextPot += 1;
        nextPotBeanCount = state.board[nextPot];
        state.board[nextPot] = nextPotBeanCount + 1;
        }
        // state.board[currentPot] = Number(i) - 1
        console.log('nextPot' + nextPot)
        // console.log('state.board ' + state.board)
        captureBeads();
        checkGameOver();
        render()
    };
    state.board[currentPot] = 0
}
console.log('end state.board ' + state.board)


//missing: put actual seeds in pots

function captureBeads() {
   let lastPotBeanCount = Number(state.board[currentPot] + numBeadsCurrentPot)    // re-write this? otherwise could cause issues if pot was skipped
        if (lastPotBeanCount === 1 && state.player === 1 && state.board[0]) {
            state.store1 = state.store1 + 1 + state.board[12];
        } else if (lastPotBeanCount === 1 && state.player === 1 && state.board[1]) {
            state.store1 = state.store1 + 1 + state.board[11];
        } else if (lastPotBeanCount === 1 && state.player === 1 && state.board[2]) {
            state.store1 = state.store1 + 1 + state.board[10];
        } else if (lastPotBeanCount === 1 && state.player === 1 && state.board[3]) {
            state.store1 = state.store1 + 1 + state.board[9];
        } else if (lastPotBeanCount === 1 && state.player === 1 && state.board[4]) {
            state.store1 = state.store1 + 1 + state.board[8];
        } else if (lastPotBeanCount === 1 && state.player === 1 && state.board[5]) {
            state.store1 = state.store1 + 1 + state.board[7];
        } else if (lastPotBeanCount === 1 && state.player === 2 && state.board[7]) {
            state.store2 = state.store2 + 1 + state.board[5];
        } else if (lastPotBeanCount === 1 && state.player === 2 && state.board[8]) {
            state.store2 = state.store2 + 1 + state.board[4];
        } else if (lastPotBeanCount === 1 && state.player === 2 && state.board[9]) {
            state.store2 = state.store2 + 1 + state.board[3];
        } else if (lastPotBeanCount === 1 && state.player === 2 && state.board[10]) {
            state.store2 = state.store2 + 1 + state.board[2];
        } else if (lastPotBeanCount === 1 && state.player === 2 && state.board[11]) {
            state.store2 = state.store2 + 1 + state.board[1];
        } else if (lastPotBeanCount === 1 && state.player === 2 && state.board[12]) {
            state.store2 = state.store2 + 1 + state.board[0];
        };
            state.turn = state.turn;                            // is this syntax correct?
        } else {
            state.turn !== state.turn;
        };
};



function checkGameOver() {
    player1Sum = state.board[0] + state.board[1] + state.board[2] + state.board[3] + state.board[4] + state.board[5]
    player2Sum = state.board[7] + state.board[1] + state.board[2] + state.board[3] + state.board[4] + state.board[6]
    if (player1Sum == 0 || player2Sum == 0) {
     determineWinner();        
    };
//     if (state.board[i] === 0) {
//         determineWinner();
//     } else {
//     return;
// }
};

function determineWinner() {
    if (state.store1 === state.store2){
        state.winner = 0;
    }
    else if (state.store1 > state.store2) {
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
    // state.board.forEach(function() {
    //     elements.board[index].appendChild = bead;
    // });
};

function renderStore() {
    state.store1 = ''
    state.store2 = ''
//take count of beads in each store AND add number to player1/player2 in score section on screen
};


// include TIE in function renderMessage() {
    

function renderMessage() {    
    if (state.winner === 0) {
        elements.message.innerHTML = `It's a draw`;
    }      // show winner
    else if (state.winner) {
        elements.message.innerHTML = `<span>${ players[state.winner] }</span> wins!`; 
    } else {
        elements.message.innerHTML = `<span ${ players[state.turn] }</span>'s turn`;   
    }
}

// show which player's turn by lighting up 'Player' next to board






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
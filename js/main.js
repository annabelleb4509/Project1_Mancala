

/* -----  constants ------ */

const players = {
    1: 'player1',                   
    2: 'player2'
}




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
    beads: document.querySelectorAll('.beads'),
    pots: document.querySelectorAll('.pot')
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
    render();
}

elements.beads.forEach(function (element) {
    element.style.top = 2 + (Math.random() * 4) + 'vw';  
    element.style.left = 2 + (Math.random() * 3) + 'vw';
});  



function handleAction(event) {
    console.log('click detected')

    elements.beads = event.target.querySelectorAll('.beads')
    
    const pots = elements.pots;
    const beads = elements.beads;
    let currentPot = event.target.id;
    console.log("currentPot " + currentPot)
    console.log('state.turn ' + state.turn)
    // Alternative to not rely on array rather then use the HTML store and retrieve the seed count
    let numBeadsCurrentPot = beads.length;
    // let numBeadsCurrentPot = state.board[currentPot];
    console.log('numBeadsCurrentPot ' + numBeadsCurrentPot)
    if (state.winner !== null) {
        return;
    }

    //  Add one bean to pot

    // Skip to next if nextPot is 6 or 13
    console.log('numBeadsCurrentPot ' + numBeadsCurrentPot)

    if (state.turn === 1 && currentPot <= 5 || state.turn === 2 && currentPot >= 7 && currentPot <= 12) {
        let nextPot = Number(currentPot);
        for ( let i = numBeadsCurrentPot; i > 0; i-- ) {
            console.log('i ' + i)

            // Identify next pot & if we are at the end of the pots
            nextPot = (nextPot + 1) % pots.length;
            if (state.turn === 1 && nextPot !== 13 || state.turn === 2 && nextPot !== 6) {
                console.log('nextPot ' + nextPot);
                nextPotBeanCount = state.board[nextPot];
                console.log('nextPotBeanCount ' + nextPotBeanCount);
                state.board[nextPot] = nextPotBeanCount + 1;

                // Move bead to next Pot but first
                // we need to identify our pot
                pots.forEach(element => {
                    if (element.id == nextPot) {
                        // Set bean element from query
                        let bead = beads[(i-1)]
                        element.appendChild(bead);
                    }
                });
                
                // } else if ( nextPot === 14) {
                // nextPotBeanCount = state.board[0];
                // state.board[0] = nextPotBeanCount + 1;
            } else {                                              //else: means if next pot is store of the other player (ie for player 1 = pot13, for player 2 = pot6), skip this pot and move to next
                nextPot += 1;
                nextPotBeanCount = state.board[nextPot];
                state.board[nextPot] = nextPotBeanCount + 1;
            }  
            console.log('state.board ' + state.board)
        }
        console.log('pots' + pots)
        console.log(pots)
        captureBeads(pots, nextPot)
        state.board[currentPot] = 0
        console.log('end state.board ' + state.board)
    }
    
}

function captureBeads(pots, lastPot) {
        let lastPotBeanCount = state.board[lastPot];
        let beads = []
        if (lastPotBeanCount === 1 && state.player === 1 && lastPot === 0) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[12];
            state.board[lastPot] = 0;                                                           // resets value of last pot to 0, as all beads taken out
            state.board[12] = 0;                                                                // same here, for opposite pot
            store = 6                                   

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 12) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);
        
        } else if (lastPotBeanCount === 1 && state.player === 1 && lastPot === 1) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[11];
            state.board[lastPot] = 0;
            state.board[11] = 0;                                                                
            store = 6       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 11) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);

        } else if (lastPotBeanCount === 1 && state.player === 1 && lastPot === 2) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[10];
            state.board[lastPot] = 0;
            state.board[10] = 0;                                                                
            store = 6       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 10) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);

        } else if (lastPotBeanCount === 1 && state.player === 1 && lastPot === 3) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[9];
            state.board[lastPot] = 0;
            state.board[9] = 0;                                                                
            store = 6       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 9) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);

        } else if (lastPotBeanCount === 1 && state.player === 1 && lastPot === 4) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[8];
            state.board[lastPot] = 0;
            state.board[8] = 0;                                                                
            store = 6       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 8) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);


        } else if (lastPotBeanCount === 1 && state.player === 1 && lastPot === 5) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[7];
            state.board[lastPot] = 0;
            state.board[7] = 0;                                                                
            store = 6       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 7) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);

        } else if (lastPotBeanCount === 1 && state.player === 2 && lastPot === 7) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[5];
            state.board[lastPot] = 0;
            state.board[5] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 5) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);

        } else if (lastPotBeanCount === 1 && state.player === 2 && lastPot === 8) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[4];
            state.board[lastPot] = 0;
            state.board[4] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 4) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);

        } else if (lastPotBeanCount === 1 && state.player === 2 && lastPot === 9) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[3];
            state.board[lastPot] = 0;
            state.board[3] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 3) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);

        } else if (lastPotBeanCount === 1 && state.player === 2 && lastPot === 10) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[2];
            state.board[lastPot] = 0;
            state.board[2] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 2) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);

        } else if (lastPotBeanCount === 1 && state.player === 2 && lastPot === 11) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[1];
            state.board[lastPot] = 0;
            state.board[1] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 1) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);

        } else if (lastPotBeanCount === 1 && state.player === 2 && state.board[12]) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[0];
            state.board[lastPot] = 0;
            state.board[0] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id === lastPot) {
                    beads.push(element.children);
                } else if (element.id === 0) {
                    beads.push(element.children);
                }
            });
            moveBeadsToStore(pots, beads, store);
        } else {
            state.turn !== state.turn;
        }
  //      console.log('captured beads' + captureBeads())
        checkGameOver();
        render()
        console.log('pots' + pots)
        console.log('check if working')
    };
     


    
    
   /* 
function moveBeadsToStore(pots, beads, store) {
    pots.forEach(element => {
        if (element.id === store) {
            // Set bean element from query
            // let bead = beads[(i-1)]
            element.appendChild(beads);
        };
    });
}
*/




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
    //     elements.beads[index].splice(currentPot, 1, 0);
    //     elements.beads
    // });
};

function renderStore() {
    state.store1 = ''
    state.store2 = ''
//take count of beads in each store AND add number to player1/player2 in score section on screen
};
    

function renderMessage() {    
    if (state.winner === 0) {
        elements.message.innerHTML = `It's a draw`;
    }      // show winner
    else if (state.winner) {
        elements.message.innerHTML = `<span>${ players[state.winner] }</span> wins!`; 
    } else {
        elements.message.innerHTML = `<span ${ players[state.turn] }</span>'s turn`;   
    };
};

// show which player's turn by lighting up 'Player' next to board


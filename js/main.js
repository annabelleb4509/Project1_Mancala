
/* -----  constants ------ */

const players = {
    1: 'player1',                   
    2: 'player2'
}


/* -----  state varibles ------ */

let state = {                                          
    board: [],
    turn: null,
    winner: null,
    score1: null,
    score2: null,
}

/* -----  cached elements ------ */


const elements = {
    message: document.querySelectorAll('.turn > div'),
    board: document.querySelectorAll('.board > div'),
    player1: document.querySelector('.player1'),
    player2: document.querySelector('.player2'),
    beads: document.querySelectorAll('.beads'),
    originalbeads: document.querySelectorAll('.beads'),
    pots: document.querySelectorAll('.pot'),
    scorePlayer1: document.querySelector('.score-player1'),
    scorePlayer2: document.querySelector('.score-player2'),
    score1: document.querySelector('.score1'),
    score2: document.querySelector('.score2')
};



/* ----- event listeners ------ */

document.getElementById('bottom').addEventListener('click', handleAction);
document.getElementById('top').addEventListener('click', handleAction);
document.querySelector('button').addEventListener('click', init)


/* ----- functions ------ */


function resetBeads() {                                             // Reset Beads in Pots function
    elements.beads.forEach((element) => {                           // first remove all beads from pots
        element.remove();
    });

    beadsToAdd = [...elements.originalbeads]                        // create array that contains all beads
    elements.pots.forEach(element => {                              // loop through pots - 6 & 13 are Mancalas, so don't receive any beads
        if (element.id === '6' || element.id === '13') {
            return;
        } else {                                                    // any other pots if bead no in pot is less than 4 add beads
            for (let i = 0; i < 4; i++) {
                element.appendChild(beadsToAdd[i]);
            }
            beadsToAdd.splice(0, 4)                                 // Remove the four added beads from array
        }
    });
};


init();

function init() {
    state.board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    state.turn = 1;
    elements.player1.innerText = `Player 1's turn`;
    elements.player1.style.color = 'rgb(250, 154, 10)';
    elements.player2.innerText = `Player 2`;
    elements.player2.style.color = 'grey';
    state.winner = null;
    score1 = null;
    score2 = null;
    elements.score1.innerHTML = `<span> ${0} </span>`;
    elements.score2.innerHTML = `<span> ${0} </span>`;
    renderScore();
    resetBeads()
}

elements.beads.forEach(function (element) {                             // distribute beads randomly in their pots
    element.style.top = 3 + (Math.random() * 3) + 'vw';  
    element.style.left = 1 + (Math.random() * 2) + 'vw';
});  


function handleAction(event) {
    elements.beads = event.target.querySelectorAll('.beads');           //this only gets beads in clicked pot (event target)
    const pots = elements.pots;
    const beads = elements.beads;                                       // hence refers to beads in current pot only
    let currentPot = event.target.id;                                   //defines which pot has been clicked
    let numBeadsCurrentPot = beads.length;                              // array = beads in clicked pot  (  let numBeadsCurrentPot = state.board[currentPot];)
  
    if (state.winner !== null) {
        return;
    }
  
    if (state.turn === 1 && currentPot <= 5 || state.turn === 2 && currentPot >= 7 && currentPot <= 12) {           //beads can only be taken from own small pots       
        let nextPot = Number(currentPot);
        for ( let i = numBeadsCurrentPot; i > 0; i-- ) {
            
            nextPot = (nextPot + 1) % pots.length;                                                           // Identify next pot & if we are at the end of the pots
           
            if (state.turn === 1 && nextPot !== 13 || state.turn === 2 && nextPot !== 6) {                  //to exclude opposite player's store - 
                nextPotBeadCount = state.board[nextPot];
                state.board[nextPot] = nextPotBeadCount + 1;
            } 
            else {                                                          //else: means if next pot is store of the other player (ie for player 1 = pot13, for player 2 = pot6), skip this pot and move to next
                nextPot = (nextPot + 1) % pots.length;
                nextPotBeadCount = state.board[nextPot];
                state.board[nextPot] = nextPotBeadCount + 1;
            }  
                                                                            // To move beans visually (on the board)
            pots.forEach(element => {                                           // identify next pot
                if (element.id == nextPot) {
                    let bead = beads[(i-1)]                                         // Set bead element 
             
                    element.appendChild(bead);                                          // Move bead to next Pot
                     if (element.id === 6) {                                        // animation to move beads slowly to their destination
                        bead.style.transform = 'translateX(-10vw)';
                    }
                    else if (element.id === 13) {
                        bead.style.transform = 'translateX(10vw)';
                    }
                    else if (element.id < 6) {
                        bead.style.transform = 'translateX(-10vw)';

                    } else if (element.id > 6 && element.id < 13) {
                        bead.style.transform = 'translateX(10vw)';
                    }
                    setTimeout(() => {
                       bead.style.transform = 'translate(0vw)';
                    }, 0); 
                } 
            });

        }

    if (state.board[nextPot] !== 1) {                                               // to check whether capturing beads applies
        switchPlayer();
    } else if(state.board[nextPot] === 6 || state.board[nextPot] === 13) {
        state.turn = (state.turn === 1) ? 1 : 2;
    } else {
        captureBeads(pots, nextPot);
    }
    state.board[currentPot] = 0
    }
    checkGameOver();
    renderScore();   
};


function switchPlayer() {
    state.turn = (state.turn === 1) ? 2 : 1;
    if (state.turn === 1) {
        elements.player1.innerText = `Player 1's turn`;
        elements.player1.style.color = 'rgb(250, 154, 10)';
        elements.player2.innerText = `Player 2`;
        elements.player2.style.color = 'grey';
    } else {
        elements.player2.innerText = `Player 2's turn`;
        elements.player2.style.color = 'rgb(250, 154, 10)';
        elements.player1.innerText = `Player 1`;
        elements.player1.style.color = 'grey';

    }
};


function captureBeads(pots, lastPot) {                                              // this function runs only if last bead dropped into an empty pot
        let lastPotBeadCount = state.board[lastPot];                                // then check which pot no is this last pot, determine opposite pot and move all beads from both pots into player's own store
        let beads = []
        let store = null
        if (state.turn === 1 && lastPot === 0) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[12];
            state.board[lastPot] = 0;                                                           // resets value of last pot to 0, as all beads taken out
            state.board[12] = 0;                                                                // same here, for opposite pot
            store = 6                                   

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 12) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 1 && lastPot === 1) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[11];
            state.board[lastPot] = 0;
            state.board[11] = 0;                                                                
            store = 6       

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 11) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 1 && lastPot === 2) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[10];
            state.board[lastPot] = 0;
            state.board[10] = 0;                                                                
            store = 6       

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 10) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 1 && lastPot === 3) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[9];
            state.board[lastPot] = 0;
            state.board[9] = 0;                                                                
            store = 6       

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 9) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 1 && lastPot === 4) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[8];
            state.board[lastPot] = 0;
            state.board[8] = 0;                                                                
            store = 6       

            pots.forEach(element => {            
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 8) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 1 && lastPot === 5) {
            state.board[6] = state.board[6] + state.board[lastPot] + state.board[7];
            state.board[lastPot] = 0;
            state.board[7] = 0;                                                                
            store = 6       

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 7) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 2 && lastPot === 7) {
            state.board[13] = state.board[13] + state.board[lastPot] + state.board[5];
            state.board[lastPot] = 0;
            state.board[5] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 5) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 2 && lastPot === 8) {
            state.board[13] = state.board[13] + state.board[lastPot] + state.board[4];
            state.board[lastPot] = 0;
            state.board[4] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 4) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 2 && lastPot === 9) {
            state.board[13] = state.board[13] + state.board[lastPot] + state.board[3];
            state.board[lastPot] = 0;
            state.board[3] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 3) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 2 && lastPot === 10) {
            state.board[13] = state.board[13] + state.board[lastPot] + state.board[2];
            state.board[lastPot] = 0;
            state.board[2] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 2) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 2 && lastPot === 11) {
            state.board[13] = state.board[13] + state.board[lastPot] + state.board[1];
            state.board[lastPot] = 0;
            state.board[1] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 1) {
                    beads.push(...element.childNodes);
                }
            });
        } else if (state.turn === 2 && lastPot === 12) {
            state.board[13] = state.board[13] + state.board[lastPot] + state.board[0];
            state.board[lastPot] = 0;
            state.board[0] = 0;                                                                
            store = 13       

            pots.forEach(element => {
                if (element.id == lastPot) {
                    beads.push(...element.childNodes);
                } else if (element.id == 0) {
                    beads.push(...element.childNodes);
                }
            });
        };
        setTimeout(() => {
            moveBeadsToStore(pots, beads, store);
        }, 500);
        ;
        checkGameOver();
        renderScore();
};


function moveBeadsToStore(pots, beads, store) {
    pots.forEach(element => {
        if (element.id == store) {
            for ( let i = beads.length; i > 0; i-- ) {
                let beadsIndex = (i-1)
                element.appendChild(beads[beadsIndex]);
            }
        };
    });
}


function checkGameOver() {
    player1Sum = (state.board[0] + state.board[1] + state.board[2] + state.board[3] + state.board[4] + state.board[5]);
    player2Sum = state.board[7] + state.board[8] + state.board[9] + state.board[10] + state.board[11] + state.board[12];
    if (player1Sum === 0 || player2Sum === 0) {
     determineWinner();   
    } else {
        return;
    }   
};   


function determineWinner() {
    if (state.board[6] === state.board[13]){
        state.winner = 0;
        elements.player1.innerText = `It's a draw!`;
        elements.player2.innerText = `It's a draw!`;
    }
    else if (state.board[6] > state.board[13]) {
        state.winner = 1;
        elements.player1.innerText = `Player 1 wins!`;
    } else {
        state.winner = 2;
        elements.player2.innerText = `Player 2 wins!`;
    };
    renderScore()
};


function renderScore() {
    elements.score1.innerHTML = `<span> ${[state.board[6]]} </span>` ; 
    elements.score2.innerHTML = `<span> ${[state.board[13]]} </span>` ;
};

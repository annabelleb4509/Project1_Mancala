
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
   // scorePlayer1: null,
   // scorePlayer2: null,
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


// eventlistener menubar click
// eventlistener play again
// eventlistener manual 


/* ----- functions ------ */

// Reset Beads in Pots function
function resetBeads() {
    elements.beads.forEach((element) => {
        element.remove();
    });

    beadsToAdd = [...elements.originalbeads]
    elements.pots.forEach(element => {
        if (element.id === '6' || element.id === '13') {
            return;
        } else {
            for (let i = 0; i < 4; i++) {
                element.appendChild(beadsToAdd[i]);
            }
            beadsToAdd.splice(0, 4)
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
    render();

    resetBeads()
//     elements.pots.forEach((element, bead) => {
//         if (element.id === 6 || element.id === 13) {
//             return;
//         } else {    
//             let bead = elements.beads[i];
//             element.appendChild(bead);
//         }
 
//  //       beads.push(...element.childNodes);
//    //     } else if (element.id === 12) {
//      //       beads.push(...element.childNodes);
//       //  }
//     });
 //   moveBeadsToStore(pots, beads, store);
}

elements.beads.forEach(function (element) {
    element.style.top = 3 + (Math.random() * 3) + 'vw';  
    element.style.left = 1 + (Math.random() * 2) + 'vw';
});  



function handleAction(event) {
    elements.beads = event.target.querySelectorAll('.beads');           //this only gets beads in clicked pot (event target)
    const pots = elements.pots;
    const beads = elements.beads;       // hence refers to beads in current pot only
    let currentPot = event.target.id;           //defines which pot has been clicked
    let numBeadsCurrentPot = beads.length;              // array = beads in clicked pot  (  let numBeadsCurrentPot = state.board[currentPot];)
  
    if (state.winner !== null) {
        return;
    }

    // Skip to next if nextPot is 6 or 13      

    if (state.turn === 1 && currentPot <= 5 || state.turn === 2 && currentPot >= 7 && currentPot <= 12) {           //beads can only be taken from own store
        let nextPot = Number(currentPot);
        for ( let i = numBeadsCurrentPot; i > 0; i-- ) {
            
            nextPot = (nextPot + 1) % pots.length;                      // Identify next pot & if we are at the end of the pots
           
            if (state.turn === 1 && nextPot !== 13 || state.turn === 2 && nextPot !== 6) {                  //to exclude opposite player's store - 
                nextPotBeadCount = state.board[nextPot];
                state.board[nextPot] = nextPotBeadCount + 1;
                console.log('asdfasdf')
                console.log(state.board)
                
                // } else if ( nextPot === 14) {
                // nextPotBeadCount = state.board[0];
                // state.board[0] = nextPotBeadCount + 1;
            } 
            else {                                              //else: means if next pot is store of the other player (ie for player 1 = pot13, for player 2 = pot6), skip this pot and move to next
                nextPot = (nextPot + 1) % pots.length;
                console.log(' nextPot asdf2 ' + nextPot)
                nextPotBeadCount = state.board[nextPot];
                state.board[nextPot] = nextPotBeadCount + 1;
            }  
            // Move bead to next Pot but first
            // we need to identify our pot
            pots.forEach(element => {
                if (element.id == nextPot) {
                    // Set bead element from query
                    let bead = beads[(i-1)]
                    console.log('bead length' + bead.length)
             
                    element.appendChild(bead);
                     if (element.id === 6) {
                        bead.style.transform = 'translateX(-10vw)';
                    }
                    else if (element.id === 13) {
                        bead.style.transform = 'translateX(10vw)';
                    }
                    else if (element.id < 6) {
                        bead.style.transform = 'translateX(-10vw)';
                        // bead.style.transform = 'translateY(-10vw)';
                    } else if (element.id > 6 && element.id < 13) {
                        bead.style.transform = 'translateX(10vw)';
                        // bead.style.transform = 'translateY(10vw)';
                    }
                    // bead.classList.add('fake-right-position'); 
                    setTimeout(() => {
                        //bead.classList.remove('fake-right-position');
                        bead.style.transform = 'translate(0vw)';
                    }, 0); 
                } 
            });

            console.log('state.board ' + state.board)
        }
        console.log('pots' + pots)
        console.log(pots);
        console.log('whos turn'+ state.turn)
    if (state.board[nextPot] !== 1) {
        switchPlayer();
    } else if(state.board[nextPot] === 6 || state.board[nextPot] === 13) {
        state.turn = (state.turn === 1) ? 1 : 2;

    } else {
        captureBeads(pots, nextPot);
    }
    state.board[currentPot] = 0
    console.log('end state.board ' + state.board)
    }
    checkGameOver();
    render();   
}


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
    console.log(`${players[state.turn]}'s turn.`);
};


function captureBeads(pots, lastPot) {
        let lastPotBeadCount = state.board[lastPot];
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
                console.log('pot 4')
                
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
            //bead.classList.remove('fake-right-position');
            moveBeadsToStore(pots, beads, store);
        }, 500);
        ;
   //     } else {
     //       state.turn !== state.turn;
       // }
  //      console.log('captured beads' + captureBeads())
        checkGameOver();
        render()
        console.log('pots ' + pots)
        console.log('check if working')
};


function moveBeadsToStore(pots, beads, store) {
    pots.forEach(element => {
        if (element.id == store) {
            for ( let i = beads.length; i > 0; i-- ) {
                let beadsIndex = (i-1)
                element.appendChild(beads[beadsIndex]);
                if (element.id < 6) {
                    beads.style.transform = 'translateX(-10vw)';
                } else if (element.id > 6 && element.id < 13) {
                    beads.style.transform = 'translateX(10vw)';
                }

            }
        };
    });
}








function checkGameOver() {
    console.log('accessing function?') 
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
    render()
};

function render() {
    renderMessage();
 //   renderScore();
}

function renderMessage() {
    elements.score1.innerHTML = `<span> ${[state.board[6]]} </span>` ; 
    elements.score2.innerHTML = `<span> ${[state.board[13]]} </span>` ;
};
  /*  
function renderScore() {
    if (state.score1 == null && state.score2 == null) {
    elements.score1.innerHTML = `Player 1  <br>  <span> ${0} </span>`;
    elements.score2.innerHTML = `Player 2  <br>  <span> ${0} </span>`;
    };
};

*/
'use strict'
function Players(firstPlayer, secondPlayer) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
}

const game = (() => {
    // PRIVATE VARIABLES
    let players;
    let drawCount = 0;
    let winCount = 0;
    let gameTurn = 1;
    const gameValues = ['X', 'O'];
    let gameBoard;

    // GAME FUNCTIONS
    const getGameValues = () => {return gameValues};
    const getThisTurn = () => {return gameTurn};
    const incrementTurn = () => {gameTurn++};
    
    // DISPLAY PLAYER'S TURN
    const displayTurn = () => {
        const displayParagraph = document.querySelector('.turn');
        if (gameTurn === 1) {
            displayParagraph.textContent = `${players.firstPlayer} is to play`
            return;
        }
        if (gameTurn % 2 === 0) {
            displayParagraph.textContent = `It's ${players.secondPlayer}'s turn`
            return;
        }
        displayParagraph.textContent = `It's ${players.firstPlayer}'s turn`
        return;
    }

    // SET PLAYERS IN THE GAME
    const setPlayer = (object) => {
        players = object;
    }

    // CHECK FOR A DRAW
    const checkDraw = () => {
        if (gameTurn === 9) {
            drawGame();
            drawCount++;
            return true;
        }
    }

    // CHECK FOR A WIN
    const checkWin = () => {
        if ((gameBoard[0][0] === gameBoard[0][1]) && 
            (gameBoard[0][1] === gameBoard[0][2])) {
               if (gameBoard[0][0] === gameValues[0]) {
                    winGame(players.firstPlayer);
                    winCount++
                    return true;
                }
                winGame(players.secondPlayer);
                winCount++;
                return true;
            }
        if ((gameBoard[1][0] === gameBoard[1][1]) && 
            (gameBoard[1][1] === gameBoard[1][2])) {
                if (gameBoard[1][0] === gameValues[0]) {
                    winGame(players.firstPlayer);
                    winCount++
                    return true;
                }
                winGame(players.secondPlayer);
                winCount++;
                return true;
            }
        if ((gameBoard[2][0] === gameBoard[2][1]) && 
            (gameBoard[2][1] === gameBoard[2][2])) {
                if (gameBoard[2][0] === gameValues[0]) {
                    winGame(players.firstPlayer);
                    winCount++
                    return true;
                }
                winGame(players.secondPlayer);
                winCount++;
                return true;
            }
        if ((gameBoard[0][0] === gameBoard[1][0]) && 
            (gameBoard[1][0] === gameBoard[2][0])) {
                if (gameBoard[0][0] === gameValues[0]) {
                    winGame(players.firstPlayer);
                    winCount++
                    return true;
                }
                winGame(players.secondPlayer);
                winCount++;
                return true;
            }
        if ((gameBoard[0][1] === gameBoard[1][1]) && 
            (gameBoard[1][1] === gameBoard[2][1])) {
                if (gameBoard[0][1] === gameValues[0]) {
                    winGame(players.firstPlayer);
                    winCount++
                    return true;
                }
                winGame(players.secondPlayer);
                winCount++;
                return true;
            }
        if ((gameBoard[0][2] === gameBoard[1][2]) && 
            (gameBoard[1][2] === gameBoard[2][2])) {
                if (gameBoard[0][2] === gameValues[0]) {
                    winGame(players.firstPlayer);
                    winCount++
                    return true;
                }
                winGame(players.secondPlayer);
                winCount++;
                return true;
            }
        if ((gameBoard[0][0] === gameBoard[1][1]) && 
            (gameBoard[1][1] === gameBoard[2][2])) {
                if (gameBoard[0][0] === gameValues[0]) {
                    winGame(players.firstPlayer);
                    winCount++
                    return true;
                }
                winGame(players.secondPlayer);
                winCount++;
                return true;
            }
        if ((gameBoard[0][2] === gameBoard[1][1]) && 
            (gameBoard[1][1] === gameBoard[2][0])) {
                if (gameBoard[0][2] === gameValues[0]) {
                    winGame(players.firstPlayer);
                    winCount++
                    return true;
                }
                winGame(players.secondPlayer);
                winCount++;
                return true;
            }
    }

    const checkAvailability = (row, column) => {
        if (typeof gameBoard[row][column] === 'string') {
            return 'occupied';
        }
    }
    const alterGameBoard = (row, column) => {
        if (winCount !== 0) {
            return true;
        }
        if (drawCount !== 0) {
            return true;
        }
        if (checkAvailability(row, column) === 'occupied') {
            return false;
        }
        if (gameTurn % 2 === 0) {
            gameBoard[row][column] = gameValues[1];
            if (checkWin()) {
                return true;
            }
            if (checkDraw()) {
                return true;
            }
            return;
        }
        gameBoard[row][column] = gameValues[0];

        if (checkWin()) {
            return true;
        }
        if (checkDraw()) {
            return true;
        }
        return;
    }
    const newGame = () => {
        winCount = 0;
        drawCount = 0;
        gameTurn = 1;
    // THERE IS A REASON FOR THIS PARTICULAR ARRAY STRUCTURE, UNDERSTAND THE CHECKWIN() AND ALTERGAMEBOARD() CODE PROPERLY
        gameBoard = [[1, 1, 2], 
                     [2, 2, 1], 
                     [1, 2, 1]];
        return;
    }
    return {alterGameBoard, getGameValues, getThisTurn, incrementTurn, newGame, setPlayer, displayTurn, checkAvailability};
})();

function checkAccurately(element) {
    if (element === undefined || element === null || element === '') {
        const error = document.querySelector('.error');
        error.textContent = 'Fill the form correctly';
        return true;
    }  
    return false;
}

function checkString(string) {
    if (typeof string !== 'string') {
        console.log('ERROR');
        return false;
    } 
    return true;
}

function addTextContent(element, textContent) {
    if (checkString(textContent)) {
        element.textContent = textContent;
    } 
}

function append(parent, child) {
    parent.appendChild(child);
}

function addClassName(element, className) {
    if (checkString(className)) {
        element.classList.add(className);
    } 
}
function getGameInput(event) {
    if (game.getThisTurn() === 2) {
        getRestartGameButton();
    }
    function findCurrentPlayer() {
        if (game.getThisTurn() % 2 === 0) {
            return game.getGameValues()[1];
        }
        return game.getGameValues()[0];
    }

    function initiateClickSequence(target, callback) {
        addTextContent(target, callback);
        game.incrementTurn();
        game.displayTurn();
    }

    if (event.target.classList[1] === 'one') {
        if (game.checkAvailability(0, 0) === 'occupied') {
            return;
        }
        if (game.alterGameBoard(0, 0)) {
            addTextContent(event.target, findCurrentPlayer());
            return;
        }
        initiateClickSequence(event.target, findCurrentPlayer());
        return;
    }
    if (event.target.classList[1] === 'two') {
        if (game.checkAvailability(0, 1) === 'occupied') {
            return;
        }
        if (game.alterGameBoard(0, 1)) {
            addTextContent(event.target, findCurrentPlayer());
            return;
        }
        initiateClickSequence(event.target, findCurrentPlayer());
        return;    
    }
    if (event.target.classList[1] === 'three') {
        if (game.checkAvailability(0, 2) === 'occupied') {
            return;
        }
        if (game.alterGameBoard(0, 2)) {
            addTextContent(event.target, findCurrentPlayer());
            return;
        }
        initiateClickSequence(event.target, findCurrentPlayer());
        return;
    }
    if (event.target.classList[1] === 'four') {
        if (game.checkAvailability(1, 0) === 'occupied') {
            return;
        }
        if (game.alterGameBoard(1, 0)) {
            addTextContent(event.target, findCurrentPlayer());
            return;
        }
        initiateClickSequence(event.target, findCurrentPlayer());
        return;
    }
    if (event.target.classList[1] === 'five') {
        if (game.checkAvailability(1, 1) === 'occupied') {
            return;
        }
        if (game.alterGameBoard(1, 1)) {
            addTextContent(event.target, findCurrentPlayer());
            return;
        }
        initiateClickSequence(event.target, findCurrentPlayer());
        return;
    }
    if (event.target.classList[1] === 'six') {
        if (game.checkAvailability(1, 2) === 'occupied') {
            return;
        }
        if (game.alterGameBoard(1, 2)) {
            addTextContent(event.target, findCurrentPlayer());
            return;
        }
        initiateClickSequence(event.target, findCurrentPlayer());
        return;
    }
    if (event.target.classList[1] === 'seven') {
        if (game.checkAvailability(2, 0) === 'occupied') {
            return;
        }
        if (game.alterGameBoard(2, 0)) {
            addTextContent(event.target, findCurrentPlayer());
            return;
        }
        initiateClickSequence(event.target, findCurrentPlayer());
        return;
    }
    if (event.target.classList[1] === 'eight') {
        if (game.checkAvailability(2, 1) === 'occupied') {
            return;
        }
        if (game.alterGameBoard(2, 1)) {
            addTextContent(event.target, findCurrentPlayer());
            return;
        }
        initiateClickSequence(event.target, findCurrentPlayer());
        return;
    }
    if (event.target.classList[1] === 'nine') {
        if (game.checkAvailability(2, 2) === 'occupied') {
            return;
        }
        if (game.alterGameBoard(2, 2)) {
            addTextContent(event.target, findCurrentPlayer());
            return;
        }
        initiateClickSequence(event.target, findCurrentPlayer());
        return;
    }
}

function start() {
    const firstPlayer = document.querySelector('.first-player');
    const secondPlayer = document.querySelector('.second-player');

    if (checkAccurately(firstPlayer.value)) {
        return;
    }
    if (checkAccurately(secondPlayer.value)) {
        return;
    }

    // GET A GAME 
    game.newGame();

    // SET PLAYERS
    game.setPlayer(new Players(firstPlayer.value, secondPlayer.value));

    game.displayTurn();
    
    // CLOSE MODAL
    const dialog = document.querySelector('dialog');
    dialog.close();

    // RECEIVE GRID INPUT
    const gameGrid = document.querySelector('.game-grid');
    gameGrid.addEventListener('click', getGameInput);
}
function getRestartGameButton() {
    const start = document.querySelector('header button');
    start.removeEventListener('click', openModal);
    addClassName(start, 'new-start');
    start.classList.remove('start');
    addTextContent(start, 'Restart Game');

    start.addEventListener('click', () => {
        deleteGameContent();
        game.newGame();
        game.displayTurn();

        const gameGrid = document.querySelector('.game-grid');
        gameGrid.removeEventListener('click', getGameInput);
        gameGrid.addEventListener('click', getGameInput);

    })
}
function openModal() {
    const dialog = document.querySelector('dialog');
    dialog.innerHTML = ` 
        <form action="">
            <h2>Input the following to get started</h2>
            <p class="note"><span class="bold">Note</span>: X always starts first</p>

            <label for="first-player">First player:
                <input type="text" class="first-player" name='first-player' placeholder="Peter" required>
            </label>

            <label for="second-player">Second player:
                <input type="text" class="second-player" name='second-player' placeholder="Orsted" required>
            </label>
            <p class="error"></p>
            <button type="button" class="begin">Start game</button>
        </form>`;
    dialog.showModal();

    // PlACE FOCUS ON THE FIRST PLAYER INPUT FIELD
    const firstPlayerInput = document.querySelector('.first-player');
    firstPlayerInput.focus();
    
    // COLLECT PLAYER'S NAME AND INITIALISE GAME
    const beginButton = document.querySelector('.begin');
    beginButton.addEventListener('click', start);
}
function deleteGameContent() {
    const gridItems = document.querySelectorAll('.grid-item');
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].textContent = '';
    }
    return;
}

function drawGame() {
    const dialog = document.querySelector('dialog');
    dialog.innerHTML = `
        <p class="win">It is a draw</p>
        <p class="question">New Game?</p>
        <div class="button-container">
            <button class="yes">YES</button>
            <button class="no">NO</button>
        </div>`;
    
     // SHOW MODAL
    dialog.showModal();

    // DELETE PLAYER TURN DISPLAY
    const turn = document.querySelector('.turn');
    addTextContent(turn, '');

    const yesButton = document.querySelector('.yes');
    yesButton.addEventListener('click', (event) => {
        deleteGameContent();
        game.newGame();
        dialog.close();
        game.displayTurn();

        // RECEIVE GRID INPUT
        const gameGrid = document.querySelector('.game-grid');
        gameGrid.addEventListener('click', getGameInput);
    })

    const noButton = document.querySelector('.no');
    noButton.addEventListener('click', () => {
        const gameGrid = document.querySelector('.game-grid');
        gameGrid.removeEventListener('click', getGameInput);

        // CLOSE MODAL
        deleteGameContent();
        dialog.close();
    });
}
function winGame(player) {
    const dialog = document.querySelector('dialog');
    dialog.innerHTML = `
        <p class="win"></p>
        <p class="question">New Game?</p>
        <div class="button-container">
            <button class="yes">YES</button>
            <button class="no">NO</button>
        </div>`;

    const gameWinner = document.querySelector('.win');
    addTextContent(gameWinner, `${player} wins!!`)
    
    // SHOW MODAL
    dialog.showModal();

    // DELETE PLAYER TURN DISPLAY
    const turn = document.querySelector('.turn');
    addTextContent(turn, '');

    const yesButton = document.querySelector('.yes');
    yesButton.addEventListener('click', (event) => {
        deleteGameContent();
        game.newGame();
        dialog.close();
        game.displayTurn();

        // RECEIVE GRID INPUT
        const gameGrid = document.querySelector('.game-grid');
        gameGrid.addEventListener('click', getGameInput);
    })

    const noButton = document.querySelector('.no');
    noButton.addEventListener('click', () => {
        const gameGrid = document.querySelector('.game-grid');
        gameGrid.removeEventListener('click', getGameInput);

        // CLOSE MODAL
        deleteGameContent();
        dialog.close();
    })
}
// OPEN MODAL   
const startButton = document.querySelector('.start');
startButton.addEventListener('click', openModal);

'use strict'
const game = (() => {
    // PRIVATE VARIABLES
    let drawCount = 0;
    let winCount = 0;
    let gameTurn = 1;
    const gameValues = ['X', 'O'];
    let gameBoard = [[1, 1, 2], 
                     [2, 2, 1], 
                     [1, 2, 1]];

    // GAME FUNCTIONS
    const getGameValues = () => {return gameValues};
    const getGameBoard = () => {return gameBoard};
    const getThisTurn = () => {return gameTurn};
    const incrementTurn = () => {gameTurn++};

    // CHECK FOR A DRAW
    const checkDraw = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                if (typeof gameBoard[i][j] !== 'string') {
                    return;
                }
            }
        }
        console.log(`It's a draw`);
        drawCount++;
        return;
    }

    // CHECK FOR A WIN
    const checkWin = () => {
        if ((gameBoard[0][0] === gameBoard[0][1]) && 
            (gameBoard[0][1] === gameBoard[0][2])) {
                console.log(`${gameBoard[0][0]} wins !!`);
                winCount++;
            }
        if ((gameBoard[1][0] === gameBoard[1][1]) && 
            (gameBoard[1][1] === gameBoard[1][2])) {
                console.log(`${gameBoard[1][0]} wins !!`);
                winCount++;
            }
        if ((gameBoard[2][0] === gameBoard[2][1]) && 
            (gameBoard[2][1] === gameBoard[2][2])) {
                console.log(`${gameBoard[2][0]} wins !!`);
                winCount++;
            }
        if ((gameBoard[0][0] === gameBoard[1][0]) && 
            (gameBoard[1][0] === gameBoard[2][0])) {
                console.log(`${gameBoard[0][0]} wins !!`);
                winCount++;
            }
        if ((gameBoard[0][1] === gameBoard[1][1]) && 
            (gameBoard[1][1] === gameBoard[2][1])) {
                console.log(`${gameBoard[0][1]} wins !!`);
                winCount++;
            }
        if ((gameBoard[0][2] === gameBoard[1][2]) && 
            (gameBoard[1][2] === gameBoard[2][2])) {
                console.log(`${gameBoard[0][2]} wins !!`);
                winCount++;
            }
        if ((gameBoard[0][0] === gameBoard[1][1]) && 
            (gameBoard[1][1] === gameBoard[2][2])) {
                console.log(`${gameBoard[0][2]} wins !!`);
                winCount++;
            }
        if ((gameBoard[0][2] === gameBoard[1][1]) && 
            (gameBoard[1][1] === gameBoard[2][0])) {
                console.log(`${gameBoard[0][2]} wins !!`);
                winCount++;
            }
    }
    const alterGameBoard = (row, column) => {
        if (winCount !== 0) {
            return;
        }
        if (drawCount !== 0) {
            return;
        }
        if (typeof gameBoard[row][column] === 'string') {
            return;
        }
        if (gameTurn % 2 == 0) {
            gameBoard[row][column] = gameValues[1];
            incrementTurn();
            return;
        }
        gameBoard[row][column] = gameValues[0];
        console.log(gameTurn);
        incrementTurn();
        checkWin();
        checkDraw();
        return;
    }
    const newGame = () => {
        winCount = 0;
        drawCount = 0;
        gameTurn = 1;
        gameBoard = [[1, 1, 1], 
                     [1, 1, 1], 
                     [1, 1, 1]];
        return;
    }
    return {getGameBoard, alterGameBoard, getGameValues, getThisTurn, incrementTurn, newGame};
})();

const gameControls = (() => {
    const renderGameBoard = () => {
        console.log(game.getGameBoard());
    }
    return {renderGameBoard};
})();

// LET'S PLAY A LITTLE GAME HERE AND SEE HOW IT GOES
function playGame(row, column) {
    game.alterGameBoard(row, column);   
    gameControls.renderGameBoard();
}
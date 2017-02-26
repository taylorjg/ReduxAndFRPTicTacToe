import * as A from './actionTypes';

export const startNewGame = () => ({
    type: A.START_NEW_GAME,
});

export const gameOver = outcome => ({
    type: A.GAME_OVER,
    outcome
});

export const makeHumanMove = cellIndex => ({
    type: A.MAKE_HUMAN_MOVE,
    cellIndex
});

export const computerMoveRequest = board => ({
    type: A.COMPUTER_MOVE_REQUEST,
    board
});

export const computerMoveSuccess = response => ({
    type: A.COMPUTER_MOVE_SUCCESS,
    response
});

export const computerMoveFailure = () => ({
    type: A.COMPUTER_MOVE_FAILURE
});

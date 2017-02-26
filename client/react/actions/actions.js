import * as A from './actionTypes';

export const becomeGameState = gameState => ({
    type: A.BECOME_GAME_STATE,
    gameState
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

export const computerMoveFailure = error => ({
    type: A.COMPUTER_MOVE_FAILURE,
    error
});

export const addResult = outcome => ({
    type: A.ADD_RESULT,
    outcome
});

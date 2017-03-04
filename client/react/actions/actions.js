import * as A from './actionTypes';
import * as C from '../constants';

export const startNewGame = () => ({
    type: A.START_NEW_GAME,
});

export const gameOver = (outcome, winningLine) => ({
    type: A.GAME_OVER,
    outcome,
    winningLine
});

export const makeHumanMove = cellIndex => ({
    type: A.MAKE_HUMAN_MOVE,
    cellIndex
});

export const makeComputerMoveRequest = () => ({
    type: A.MAKE_COMPUTER_MOVE_REQUEST
});

export const makeComputerMoveSuccess = response => ({
    type: A.MAKE_COMPUTER_MOVE_SUCCESS,
    response
});

export const makeComputerMoveFailure = () => ({
    type: A.MAKE_COMPUTER_MOVE_FAILURE
});

export const startNewGameAsync = () =>
    (dispatch, getState) => {
        dispatch(startNewGame());
        if (Math.random() < 0.5) {
            return dispatch(makeComputerMoveAsync(getState().board));
        }
        else {
            return Promise.resolve();
        }
    };

export const makeHumanMoveAsync = cellIndex =>
    (dispatch, getState) => {
        const oldState = getState();
        if (oldState.gameState !== C.STATE_HUMAN_MOVE) return Promise.resolve();
        if (oldState.board[cellIndex] !== C.CELL_EMPTY) return Promise.resolve();
        dispatch(makeHumanMove(cellIndex));
        const newState = getState();
        if (newState.board !== oldState.board)
            return dispatch(makeComputerMoveAsync(newState.board));
        else
            return Promise.resolve();
    };

export const makeComputerMoveAsync = board =>
    dispatch => {

        dispatch(makeComputerMoveRequest());

        const requestData = {
            board,
            player1Piece: C.CELL_HUMAN_PIECE,
            player2Piece: C.CELL_COMPUTER_PIECE
        };

        const request = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(requestData)
        };

        return fetch('/api/computerMove', request)
            .then(response => response.json())
            .then(response => {
                dispatch(makeComputerMoveSuccess(response));
                dispatch(gameOverAsync(response));
            })
            .catch(() => dispatch(makeComputerMoveFailure()));
    };

const gameOverAsync = response =>
    dispatch => {
        if (response.outcome) {
            dispatch(gameOver(response.outcome, response.winningLine));
        }
        else {
            return Promise.resolve();
        }
    };

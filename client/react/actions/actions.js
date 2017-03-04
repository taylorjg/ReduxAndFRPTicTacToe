import * as A from './actionTypes';
import * as C from '../constants';

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
        const oldBoard = getState().board;
        dispatch(makeHumanMove(cellIndex));
        const newBoard = getState().board;
        if (newBoard !== oldBoard)
            return dispatch(makeComputerMoveAsync(getState().board));
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
            .then(response => dispatch(makeComputerMoveSuccess(response)))
            .catch(() => dispatch(makeComputerMoveFailure()));
    };

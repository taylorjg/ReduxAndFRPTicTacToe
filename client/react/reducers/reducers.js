import * as A from '../actions/actionTypes';
import * as C from '../constants';

const initialState = {
    gameState: C.STATE_NO_GAME_IN_PROGRESS,
    board: C.CELL_EMPTY.repeat(9),
    outcome: undefined,
    winningLine: undefined,
    showSpinner: false,
    resultHistory: [
        [0, 0, 0]
    ]
};

export default (state = initialState, action) => {
    console.log(`action: ${JSON.stringify(action)}`);
    switch (action.type) {

        case A.START_NEW_GAME:
            return {
                ...state,
                gameState: C.STATE_HUMAN_MOVE,
                board: initialState.board,
                outcome: initialState.outcome,
                winningLine: initialState.winningLine
            };

        case A.GAME_OVER:
            return {
                ...state,
                gameState: C.STATE_NO_GAME_IN_PROGRESS,
                outcome: action.outcome,
                winningLine: action.winningLine,
                resultHistory: addResultHistoryEntry(state.resultHistory, action.outcome)
            };

        case A.MAKE_HUMAN_MOVE:
            return {
                ...state,
                board: setCharAt(state.board, C.CELL_HUMAN_PIECE, action.cellIndex)
            };

        case A.MAKE_COMPUTER_MOVE_REQUEST:
            return {
                ...state,
                gameState: C.STATE_COMPUTER_MOVE,
                showSpinner: true,
            };

        case A.MAKE_COMPUTER_MOVE_SUCCESS:
            return {
                ...state,
                gameState: C.STATE_HUMAN_MOVE,
                board: action.response.board,
                showSpinner: false,
            };

        case A.MAKE_COMPUTER_MOVE_FAILURE:
            return {
                ...state,
                gameState: C.STATE_WEB_SERVICE_ERROR,
                showSpinner: false,
            };

        default:
            return state;
    }
};

const OUTCOMES_TO_INDEX = {
    [C.OUTCOME_HUMAN_WIN]: 2,
    [C.OUTCOME_COMPUTER_WIN]: 0,
    [C.OUTCOME_DRAW]: 1
};

const addResultHistoryEntry = (resultHistory, outcome) => {
    const newEntry = [0, 0, 0];
    newEntry[OUTCOMES_TO_INDEX[outcome]]++;
    return [...resultHistory, newEntry];
};

const setCharAt = (s, ch, index) => {
    let chs = Array.from(s);
    chs[index] = ch;
    return chs.join('');
};

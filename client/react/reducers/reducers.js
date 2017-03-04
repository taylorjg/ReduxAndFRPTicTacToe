import * as A from '../actions/actionTypes';
import * as C from '../constants';

const initialState = {
  gameState: C.STATE_NO_GAME_IN_PROGRESS,
  board: C.CELL_EMPTY.repeat(9),
  outcome: undefined,
  winningLine: undefined,
  infoMessage: C.START_GAME_MESSAGE,
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
        board: C.CELL_EMPTY.repeat(9),
        outcome: undefined,
        winningLine: undefined,
        infoMessage: C.HUMAN_TURN_MESSAGE
      };

    case A.GAME_OVER:
      return {
        ...state,
        gameState: C.STATE_NO_GAME_IN_PROGRESS,
        infoMessage: C.START_GAME_MESSAGE,
        resultHistory: addResultHistoryEntry(state.resultHistory, action.outcome)
      };

    case A.MAKE_HUMAN_MOVE:
      if (state.gameState !== C.STATE_HUMAN_MOVE) return state;
      if (state.board[action.cellIndex] !== C.CELL_EMPTY) return state;
      return {
        ...state,
        board: setCharAt(state.board, C.CELL_HUMAN_PIECE, action.cellIndex)
      };

    case A.MAKE_COMPUTER_MOVE_REQUEST:
      return {
        ...state,
        gameState: C.STATE_COMPUTER_MOVE,
        infoMessage: C.COMPUTER_TURN_MESSAGE,
        showSpinner: true,
      };

    case A.MAKE_COMPUTER_MOVE_SUCCESS:
      {
        const newState = {
          ...state,
          gameState: C.STATE_HUMAN_MOVE,
          board: action.response.board,
          showSpinner: false,
        };
        if (action.response.outcome) {
          newState.gameState = C.STATE_NO_GAME_IN_PROGRESS;
          newState.infoMessage = C.START_GAME_MESSAGE;
          newState.outcome = action.response.outcome;
          newState.winningLine = action.response.winningLine;
        }
        return newState;
      }

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

const OUTCOMES_TO_INDEX = {};
OUTCOMES_TO_INDEX[C.OUTCOME_HUMAN_WIN] = 2;
OUTCOMES_TO_INDEX[C.OUTCOME_COMPUTER_WIN] = 0;
OUTCOMES_TO_INDEX[C.OUTCOME_DRAW] = 1;

const addResultHistoryEntry = (resultHistory, outcome) => {
  const newEntry = [0, 0, 0];
  newEntry[OUTCOMES_TO_INDEX[outcome] || 0]++;
  return [...resultHistory, newEntry];
};

const setCharAt = (s, ch, index) => {
  let chs = Array.from(s);
  chs[index] = ch;
  return chs.join('');
};

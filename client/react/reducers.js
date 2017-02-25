import * as A from './actionTypes';
import * as C from './constants';

const initialState = {
  gameState: C.STATE_NO_GAME_IN_PROGRESS,
  board: "---------",
  resultHistory: [
    [0, 0, 0]
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case A.BECOME_GAME_STATE:
      return { ...state, gameState: action.gameState };
    case A.MAKE_HUMAN_MOVE:
      return { ...state, board: setCharAt(state.board, C.HUMAN_PIECE, action.cellIndex) };
    case A.COMPUTER_MOVE_START:
      return { ...state };
    case A.COMPUTER_MOVE_SUCCESS:
      return { ...state };
    case A.COMPUTER_MOVE_FAILURE:
      return { ...state };
    case A.ADD_RESULT:
      return { ...state, resultHistory: addResultHistoryEntry(state.resultHistory, action.outcome) };
    default:
      return state;
  }
};

const OUTCOMES_TO_INDEX = {
  "C.OUTCOME_HUMAN_WIN": 2,
  "C.OUTCOME_COMPUTER_WIN": 0,
  "C.OUTCOME_DRAW": 1
};

const addResultHistoryEntry = (resultHistory, outcome) => {
  const newEntry = [0, 0, 0];
  newEntry[OUTCOMES_TO_INDEX[outcome] || 0]++;
  return [ ...resultHistory, newEntry ];
};

const setCharAt = (s, ch, index) => {
  let chs = Array.from(s);
  chs[index] = ch;
  return chs.join('');
};

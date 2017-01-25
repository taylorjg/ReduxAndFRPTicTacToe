'use strict';

const LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const OUTCOME_PLAYER1_WIN = 1;
const OUTCOME_PLAYER2_WIN = 2;
const OUTCOME_DRAW = 3;
const BOARD_UNCHANGED = undefined;

exports.computerMove = state =>
    checkForWinOrDraw(state) ||
    tryToWin(state) ||
    tryToBlock(state) ||
    makeRandomMove(state);

const checkForWinOrDraw = state => {
    const possibleWins = LINES.map(line => checkForWin(state, line));
    return possibleWins.find(identity) || checkForDraw(state);
};

const tryToWin = state =>
    makeMoveOnLineWithTwoSamePiecesAndOneEmpty(state, state.player2Piece, (newBoard, winningLine) =>
        makeNewState(state, newBoard, OUTCOME_PLAYER2_WIN, winningLine));

const tryToBlock = state => {
    const newState = makeMoveOnLineWithTwoSamePiecesAndOneEmpty(state, state.player1Piece, newBoard =>
        makeNewState(state, newBoard));
    return newState ? checkForWinOrDraw(newState) || newState : null;
};

const makeRandomMove = state => {
    const unoccupiedIndices = getUnoccupiedIndices(state);
    const randomChoice = getRandomIntInclusive(0, unoccupiedIndices.length - 1);
    const newBoard = setCharAt(state.board, state.player2Piece, unoccupiedIndices[randomChoice]);
    const newState = makeNewState(state, newBoard);
    return checkForWinOrDraw(newState) || newState;
};

const makeMoveOnLineWithTwoSamePiecesAndOneEmpty = (state, givenPiece, buildResponse) =>
    LINES
        .map(line => {
            const indicesWithGivenPiece = line.filter(boardIndex => state.board[boardIndex] === givenPiece);
            const indicesWithEmptyCells = line.filter(boardIndex => isUnoccupied(state, state.board[boardIndex]));
            return (indicesWithGivenPiece.length === 2 && indicesWithEmptyCells.length === 1)
                ? buildResponse(setCharAt(state.board, state.player2Piece, indicesWithEmptyCells[0]), line)
                : null;
        })
        .find(identity);

const checkForWin = (state, line) => {
    const pieces = line.map(boardIndex => state.board[boardIndex]).join('');
    switch (pieces) {
        case state.player1Piece.repeat(3):
            return makeNewState(state, BOARD_UNCHANGED, OUTCOME_PLAYER1_WIN, line);
        case state.player2Piece.repeat(3):
            return makeNewState(state, BOARD_UNCHANGED, OUTCOME_PLAYER2_WIN, line);
        default:
            return null;
    }
};

const checkForDraw = state =>
    (Array.from(state.board)).every(piece => isOccupied(state, piece))
        ? makeNewState(state, BOARD_UNCHANGED, OUTCOME_DRAW)
        : null;

const getUnoccupiedIndices = state =>
    Array.from(state.board).reduce((acc, piece, boardIndex) =>
        acc.concat(isUnoccupied(state, piece) ? [boardIndex] : []),
        []);

const isOccupied = (state, piece) =>
    piece === state.player1Piece || piece === state.player2Piece;

const isUnoccupied = (state, piece) =>
    piece !== state.player1Piece && piece !== state.player2Piece;

const setCharAt = (s, ch, index) => {
    let chs = Array.from(s);
    chs[index] = ch;
    return chs.join('');
};

const makeNewState = (oldState, newBoard, outcome, winningLine) => {
    let newState = {
        board: newBoard === BOARD_UNCHANGED ? oldState.board : newBoard,
        player1Piece: oldState.player1Piece,
        player2Piece: oldState.player2Piece
    };
    if (outcome) newState.outcome = outcome;
    if (winningLine) newState.winningLine = winningLine;
    return newState;
};

const getRandomIntInclusive = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const identity = x => x;

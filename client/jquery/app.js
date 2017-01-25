import $ from 'jquery';

const PLAYER1_TURN_MESSAGE = 'Your turn. Click an empty square to make your move.';
const PLAYER2_TURN_MESSAGE = 'The computer is thinking...';
const ARTIFICIAL_THINKING_TIME = 100;
const CROSS = 'X';
const NOUGHT = 'O';
const EMPTY = '-';

const player1Piece = CROSS;
const player2Piece = NOUGHT;

const HUMAN_PLAYER = 1;
const COMPUTER_PLAYER = 2;

const STATE_NO_GAME_IN_PROGRESS = 0;
const STATE_HUMAN_MOVE = 1;
const STATE_COMPUTER_MOVE = 2;
const STATE_WEB_SERVICE_ERROR = 3;

const HIGHLIGHT_WIN = 'win';
const HIGHLIGHT_LOSE = 'lose';
const HIGHLIGHT_DRAW = 'draw';
const ALL_HIGHLIGHTS = `${HIGHLIGHT_WIN} ${HIGHLIGHT_LOSE} ${HIGHLIGHT_DRAW}`;

let state = STATE_NO_GAME_IN_PROGRESS;
let $cellElements;
let $instructionPanel;
let $instructionMessage;
let $spinner;
let $errorPanel;
let $errorMessage;
let $startButton;

$(document).ready(() => {
    $cellElements = $('#board td').click(makeHumanMove);
    $instructionPanel = $('#instructionPanel');
    $instructionMessage = $('#instructionMessage');
    $spinner = $('#spinner');
    $errorPanel = $('#errorPanel');
    $errorMessage = $('#errorMessage');
    $startButton = $('#startButton').click(start);
    $('#retryButton').click(makeComputerMove);
    reset();
});

function reset() {
    clearBoard();
    clearInstructionMessage();
    clearErrorMessage();
}

function startHelper() {

    function whoGoesFirst() {
        return (Math.random() < 0.5) ? HUMAN_PLAYER : COMPUTER_PLAYER;
    }

    reset();
    hideStartButton();

    const playerToGoFirst = whoGoesFirst();

    if (playerToGoFirst === HUMAN_PLAYER) {
        setStateHumanMove();
    }
    else {
        makeComputerMove();
    }

    return playerToGoFirst;
}

function start() {
    startHelper();
}

function setStateHumanMove() {
    state = STATE_HUMAN_MOVE;
    setInstructionMessage(PLAYER1_TURN_MESSAGE);
}

function setStateComputerMove() {
    state = STATE_COMPUTER_MOVE;
    setInstructionMessageWithSpinner(PLAYER2_TURN_MESSAGE);
}

function setStateGameOver() {
    state = STATE_NO_GAME_IN_PROGRESS;
    clearInstructionMessage();
    showStartButton();
}

function setStateWebServiceError() {
    state = STATE_WEB_SERVICE_ERROR;
}

function makeHumanMove() {
    if (state === STATE_HUMAN_MOVE) {
        const $cellElement = $(this);
        if (getCell($cellElement) === EMPTY) {
            setCell($cellElement, player1Piece);
            makeComputerMove();
        }
    }
}

function makeComputerMove() {

    setStateComputerMove();

    setTimeout(() => {

        const requestData = {
            board: saveBoardToString(),
            player1Piece: player1Piece,
            player2Piece: player2Piece
        };

        $.post({
            url: '/api/computerMove',
            data: JSON.stringify(requestData),
            contentType: 'application/json'
        })
        .always(() => {
            state = STATE_HUMAN_MOVE;
            setInstructionMessage(PLAYER1_TURN_MESSAGE);
        })
        .then(handleComputerMoveResponse)
        .catch(handleComputerMoveError);
    }, ARTIFICIAL_THINKING_TIME);
}

function handleComputerMoveResponse(state) {
    clearErrorMessage();
    updateBoardFromString(state.board);
    if (state.outcome) {
        switch (state.outcome) {
            case HUMAN_PLAYER:
                highlightCells(state.winningLine, HIGHLIGHT_WIN);
                break;
            case COMPUTER_PLAYER:
                highlightCells(state.winningLine, HIGHLIGHT_LOSE);
                break;
            default:
                highlightCells([0,1,2,3,4,5,6,7,8], HIGHLIGHT_DRAW);
                break;
        }
        setStateGameOver();
    }
}

function handleComputerMoveError(xhr) {
    setStateWebServiceError();
    const statusText = xhr.statusText;
    const statusCode = xhr.status ? `(${xhr.status})` : '';
    if (statusText && statusText !== 'error') {
        setErrorMessage(`Error during computer move: ${statusText} ${statusCode}`);
    }
    else {
        setErrorMessage(`Error during computer move`);
    }
}

function getCell($cellElement) {
    var piece = $cellElement.html();
    return piece === CROSS || piece === NOUGHT ? piece : EMPTY;
}

function setCell($cellElement, piece) {
    $cellElement.html(piece === CROSS || piece === NOUGHT ? piece : '&nbsp;');
}

function highlightCells(cellIndices, cssClass) {
    $cellElements
        .filter(cellIndex => cellIndices.includes(cellIndex))
        .addClass(cssClass);
}

function saveBoardToString() {
    return $cellElements.map((cellIndex, cellElement) => getCell($(cellElement))).get().join('');
}

function clearBoard() {
    updateBoardFromString(EMPTY.repeat(9));
    $cellElements.removeClass(ALL_HIGHLIGHTS);
}

function updateBoardFromString(board) {
    $cellElements.each((cellIndex, cellElement) => {
        setCell($(cellElement), board.charAt(cellIndex));
    });
}

function setInstructionMessage(message) {
    $instructionMessage.html(message);
    $instructionPanel.show();
    hideSpinner();
}

function setInstructionMessageWithSpinner(message) {
    $instructionMessage.html(message);
    $instructionPanel.show();
    showSpinner();
}

function clearInstructionMessage() {
    $instructionPanel.hide();
}

function setErrorMessage(errorMessage) {
    $errorMessage.html(errorMessage);
    $errorPanel.removeClass('hidden');
    $errorPanel.show();
}

function clearErrorMessage() {
    $errorPanel.hide();
}

function showStartButton() {
    $startButton.show();
}

function hideStartButton() {
    $startButton.hide();
}

function showSpinner() {
    $spinner.show();
}

function hideSpinner() {
    $spinner.hide();
}

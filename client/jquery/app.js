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
let $startButton;

$(document).ready(() => {
    $cellElements = $('#board td div');
    $cellElements.keydown(handleKeydown);
    $cellElements.click(makeHumanMove);
    $instructionPanel = $('#instructionPanel');
    $instructionMessage = $('#instructionMessage');
    $spinner = $('#spinner');
    $errorPanel = $('#errorPanel');
    $startButton = $('#startButton').click(start);
    $('#retryButton').click(makeComputerMove);
    reset();
});

function reset() {
    clearBoard();
    clearInstructionMessage();
    hideErrorPanel();
    $startButton.focus();
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

function setStateNoGameInProgress() {
    state = STATE_NO_GAME_IN_PROGRESS;
    clearInstructionMessage();
    showStartButton();
}

function setStateWebServiceError() {
    state = STATE_WEB_SERVICE_ERROR;
    showErrorPanel();
}

function handleKeydown(e) {

    const SPACE_KEY = 32;
    const LEFT_ARROW_KEY = 37;
    const UP_ARROW_KEY = 38;
    const RIGHT_ARROW_KEY = 39;
    const DOWN_ARROW_KEY = 40;

    // Stop at the edges:
    // const up = index => index > 2 ? index - 3 : -1;
    // const down = index => index < 6 ? index + 3 : -1;
    // const left = index => index % 3 !== 0 ? index - 1 : -1;
    // const right = index => index % 3 !== 2 ? index + 1 : -1;

    // Wrap around the current row/col:
    const up = index => index > 2 ? index - 3 : index + 6;
    const down = index => index < 6 ? index + 3 : index - 6;
    const left = index => index % 3 !== 0 ? index - 1 : index + 2;
    const right = index => index % 3 !== 2 ? index + 1 : index - 2;

    // Always increment/decrement the index but wrap from 0 to 8 and vice versa:
    // const up = index => index > 2 ? index - 3 : 8 - ((3 - index) % 3);
    // const down = index => index < 6 ? index + 3 : (index - 5) % 3;
    // const left = index => index > 0 ? index - 1 : 8;
    // const right = index => index < 8 ? index + 1 : 0;

    const index = $cellElements.index(this);

    const navigate = fn => {
        const newIndex = fn(index);
        if (newIndex >= 0) $cellElements.eq(newIndex).focus();
    };
    
    switch (e.keyCode) {
        case SPACE_KEY:
            makeHumanMove.call(this);
            break;
        case UP_ARROW_KEY:
            navigate(up);
            break;
        case DOWN_ARROW_KEY:
            navigate(down);
            break;
        case LEFT_ARROW_KEY:
            navigate(left);
            break;
        case RIGHT_ARROW_KEY:
            navigate(right);
            break;
    }
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

        const request = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(requestData)
        };

        fetch('/api/computerMove', request)
            .then(response => {
                setStateHumanMove();
                return response;
            })
            .then(handleComputerMoveResponse)
            .catch(handleComputerMoveError);
    }, ARTIFICIAL_THINKING_TIME);
}

function handleComputerMoveResponse(response) {
    response.json().then(state => {
        hideErrorPanel();
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
                    highlightCells([0, 1, 2, 3, 4, 5, 6, 7, 8], HIGHLIGHT_DRAW);
                    break;
            }
            setStateNoGameInProgress();
        }
    });
}

function handleComputerMoveError() {
    setStateWebServiceError();
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

function showErrorPanel() {
    $errorPanel.removeClass('hidden');
    $errorPanel.show();
}

function hideErrorPanel() {
    $errorPanel.hide();
}

function showStartButton() {
    $startButton.show();
    $startButton.focus();
}

function hideStartButton() {
    $startButton.hide();
    $cellElements.eq(4).focus();
}

function showSpinner() {
    $spinner.show();
}

function hideSpinner() {
    $spinner.hide();
}

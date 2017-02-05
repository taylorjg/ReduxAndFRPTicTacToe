import $ from 'jquery';
import * as d3 from 'd3';

const START_GAME_MESSAGE = 'Use the Start button to begin a new game.';
const PLAYER1_TURN_MESSAGE = 'Your turn. Click an empty square to make your move.';
const PLAYER2_TURN_MESSAGE = 'The computer is thinking...';

const ARTIFICIAL_THINKING_TIME = 400;

const CROSS = 'X';
const NOUGHT = 'O';
const EMPTY = '-';

const HUMAN_PLAYER_PIECE = CROSS;
const COMPUTER_PLAYER_PIECE = NOUGHT;

const HUMAN_PLAYER = 1;
const COMPUTER_PLAYER = 2;

const STATE_NO_GAME_IN_PROGRESS = 0;
const STATE_HUMAN_MOVE = 1;
const STATE_COMPUTER_MOVE = 2;
const STATE_WEB_SERVICE_ERROR = 3;

const HIGHLIGHT_WIN = 'win';
const HIGHLIGHT_LOSS = 'lose';
const HIGHLIGHT_DRAW = 'draw';
const ALL_HIGHLIGHTS = `${HIGHLIGHT_WIN} ${HIGHLIGHT_LOSS} ${HIGHLIGHT_DRAW}`;

let state;
let $cellElements;
let $infoPanel;
let $infoMessage;
let $spinner;
let $errorPanel;
let $startButton;
let $retryButton;

$(document).ready(() => {
    $cellElements = $('#board td div');
    $cellElements.keydown(handleKeydown);
    $cellElements.click(makeHumanMove);
    $infoPanel = $('#infoPanel');
    $infoMessage = $('#infoMessage');
    $spinner = $('.spinner');
    $errorPanel = $('#errorPanel');
    $startButton = $('#startButton').click(start);
    $retryButton = $('#retryButton').click(makeComputerMove);
    reset();
    setStateNoGameInProgress();
    updateVisualisations();
});

function reset() {
    clearBoard();
    hideErrorPanel();
    hideStartButton();
}

function start() {
    reset();
    const playerToGoFirst = (Math.random() < 0.5) ? HUMAN_PLAYER : COMPUTER_PLAYER;
    playerToGoFirst === HUMAN_PLAYER ? setStateHumanMove() : makeComputerMove();
}

function setStateNoGameInProgress() {
    state = STATE_NO_GAME_IN_PROGRESS;
    setInfoMessage(START_GAME_MESSAGE);
    showStartButton();
}

function setStateHumanMove() {
    state = STATE_HUMAN_MOVE;
    setInfoMessage(PLAYER1_TURN_MESSAGE);
}

function setStateComputerMove() {
    if (state !== STATE_WEB_SERVICE_ERROR) {
        setInfoMessage(PLAYER2_TURN_MESSAGE);
    }
    state = STATE_COMPUTER_MOVE;
}

function setStateWebServiceError() {
    state = STATE_WEB_SERVICE_ERROR;
    showErrorPanel();
    hideInfoPanel();
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
            setCell($cellElement, HUMAN_PLAYER_PIECE);
            makeComputerMove();
        }
    }
}

function makeComputerMove() {

    showSpinner();
    setStateComputerMove();

    setTimeout(() => {

        const requestData = {
            board: saveBoardToString(),
            player1Piece: HUMAN_PLAYER_PIECE,
            player2Piece: COMPUTER_PLAYER_PIECE
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
                hideSpinner();
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
                    highlightCells(state.winningLine, HIGHLIGHT_LOSS);
                    break;
                default:
                    highlightCells(Array.from(Array(9).keys()), HIGHLIGHT_DRAW);
                    break;
            }
            setStateNoGameInProgress();
            addResultHistoryEntry(state.outcome);
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

function setInfoMessage(message) {
    $infoMessage.html(message);
    showInfoPanel(false);
}

function showInfoPanel() {
    $infoPanel.show();
}

function hideInfoPanel() {
    $infoPanel.hide();
}

function showErrorPanel() {
    $errorPanel.removeClass('hidden');
    $errorPanel.show();
    hideSpinner();
    $retryButton.focus();
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
    $spinner.removeClass('hidden');
    $spinner.show();
}

function hideSpinner() {
    $spinner.hide();
}

const resultHistory = [
    [0, 0, 0] // [L, D, W]    
];

const lastResultHistoryEntry = () => resultHistory[resultHistory.length - 1];

const BAR_COLOURS = [
    'red',     // L
    '#FFBF00', // D
    'green'    // W
];

const addResultHistoryEntry = outcome => {
    const newEntry = lastResultHistoryEntry().slice();
    let index;
    switch (outcome) {
        case HUMAN_PLAYER:
            index = 2;
            break;
        case COMPUTER_PLAYER:
            index = 0;
            break;
        default:
            index = 1;
            break;
    }
    newEntry[index] = newEntry[index] + 1;
    resultHistory.push(newEntry);
    updateVisualisations();
};

const updateVisualisations = () => {
    updateVisualisation1();
    updateVisualisation2();
};

const updateVisualisation1 = () => {
    const resultSummary = lastResultHistoryEntry();
    const vis1 = d3.select('#vis1');
    const width = vis1.node().scrollWidth;
    const height = vis1.node().scrollHeight;
    const maxValue = Math.max(d3.max(resultSummary), 10);
    const yScale = d3.scaleLinear().domain([0, 3]).range([0, height]);
    const widthScale = d3.scaleLinear().domain([0, maxValue]).range([0, width]);
    const update = selection =>
        selection
            .attr('x', 0)
            .attr('y', (d, i) => yScale(i))
            .attr('width', d => widthScale(d))
            .attr('height', height / 3)
            .style('fill', (d, i) => BAR_COLOURS[i]);
    const bars = vis1.selectAll('rect').data(resultSummary);
    update(bars);
    update(bars.enter().append('rect'));
};

const updateVisualisation2 = () => {
    const vis2 = d3.select('#vis2');
    vis2.selectAll('path').remove();
    const width = vis2.node().scrollWidth;
    const height = vis2.node().scrollHeight;
    const xScale = d3.scaleLinear().domain([0, resultHistory.length - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, resultHistory.length - 1]).range([height, 0]);
    const cols = [0, 1, 2];
    const simpleTracking = (d, index) => d.reduce((acc, n, i) => acc + (i >= index ? n : 0), 0);
    cols.forEach(col => {
        const makeArea = d3.area()
            .x((d, i) => xScale(i))
            .y0(d => yScale(simpleTracking(d, col) - d[col]))
            .y1(d => yScale(simpleTracking(d, col)))
            .curve(d3.curveBasis);
        vis2
            .append('path')
            .attr('d', makeArea(resultHistory))
            .attr('fill', BAR_COLOURS[col]);
    });
};

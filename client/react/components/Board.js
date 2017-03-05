import React, { PropTypes } from 'react';
import Cell from './Cell';
import * as C from '../constants';

const Board = ({
    board,
    outcome,
    winningLine,
    onSelectCell,
    onNavigateTo,
    active,
    setFocusTo
}) => {
    const highlights = outcomeToHighlights(outcome, winningLine);
    const cells = indices =>
        indices.map(index =>
            <td key={index}>
                <Cell
                    value={board[index]}
                    active={active}
                    setFocus={setFocusTo === C.SETFOCUSTO_BOARD_CELL_0 + index}
                    highlight={highlights[index]}
                    onSelect={() => onSelectCell(index)}
                    onNavigate={direction => onNavigateTo(nextCellIndex(direction, index))}
                />
            </td>
        );
    return (
        <div>
            <h1>Tic-Tac-Toe</h1>
            <table id="board">
                <tbody>
                    <tr>{cells([0, 1, 2])}</tr>
                    <tr>{cells([3, 4, 5])}</tr>
                    <tr>{cells([6, 7, 8])}</tr>
                </tbody>
            </table>
        </div>
    );
};

Board.propTypes = {
    board: PropTypes.string.isRequired,
    outcome: PropTypes.number,
    winningLine: PropTypes.arrayOf(PropTypes.number),
    onSelectCell: PropTypes.func.isRequired,
    onNavigateTo: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    setFocusTo: PropTypes.number.isRequired
};

const outcomeToHighlights = (outcome, winningLine) => {
    const cellIndices = Array.from(Array(9).keys());
    const applyHighlightToWinningLine = highlight => cellIndices.map((_, idx) => {
        return winningLine.includes(idx) ? highlight : C.HIGHLIGHT_NONE;
    });
    const applyHighlightToAll = highlight => cellIndices.map(() => highlight);
    switch (outcome) {
        case C.OUTCOME_HUMAN_WIN: return applyHighlightToWinningLine(C.HIGHLIGHT_HUMAN_WIN);
        case C.OUTCOME_COMPUTER_WIN: return applyHighlightToWinningLine(C.HIGHLIGHT_COMPUTER_WIN);
        case C.OUTCOME_DRAW: return applyHighlightToAll(C.HIGHLIGHT_DRAW);
        default: return applyHighlightToAll(C.HIGHLIGHT_NONE);
    }
};

const nextCellIndex = (direction, index) => {
    switch (direction) {
        case C.DIRECTION_UP: return index > 2 ? index - 3 : index + 6;
        case C.DIRECTION_DOWN: return index < 6 ? index + 3 : index - 6;
        case C.DIRECTION_LEFT: return index % 3 !== 0 ? index - 1 : index + 2;
        case C.DIRECTION_RIGHT: return index % 3 !== 2 ? index + 1 : index - 2;
    }
};

export default Board;

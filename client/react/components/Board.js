import React, { PropTypes } from 'react';
import Cell from './Cell';
import * as C from '../constants';

const Board = ({
    board,
    outcome,
    winningLine,
    onCellClick,
    active
}) => {
    const highlights = outcomeToHighlights(outcome, winningLine);
    const cells = indices =>
        indices.map(idx =>
            <td key={idx}>
                <Cell
                    value={board[idx]}
                    active={active}
                    highlight={highlights[idx]}
                    onClick={() => onCellClick(idx)}
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
    onCellClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
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

export default Board;

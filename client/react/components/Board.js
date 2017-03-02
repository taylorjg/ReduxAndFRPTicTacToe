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
    return (
        <div>
            <h1>Tic-Tac-Toe</h1>
            <table id="board">
                <tbody>
                    <tr>
                        <td><Cell value={board[0]} active={active} highlight={highlights[0]} onClick={() => onCellClick(0)} /></td>
                        <td><Cell value={board[1]} active={active} highlight={highlights[1]} onClick={() => onCellClick(1)} /></td>
                        <td><Cell value={board[2]} active={active} highlight={highlights[2]} onClick={() => onCellClick(2)} /></td>
                    </tr>
                    <tr>
                        <td><Cell value={board[3]} active={active} highlight={highlights[3]} onClick={() => onCellClick(3)} /></td>
                        <td><Cell value={board[4]} active={active} highlight={highlights[4]} onClick={() => onCellClick(4)} /></td>
                        <td><Cell value={board[5]} active={active} highlight={highlights[5]} onClick={() => onCellClick(5)} /></td>
                    </tr>
                    <tr>
                        <td><Cell value={board[6]} active={active} highlight={highlights[6]} onClick={() => onCellClick(6)} /></td>
                        <td><Cell value={board[7]} active={active} highlight={highlights[7]} onClick={() => onCellClick(7)} /></td>
                        <td><Cell value={board[8]} active={active} highlight={highlights[8]} onClick={() => onCellClick(8)} /></td>
                    </tr>
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

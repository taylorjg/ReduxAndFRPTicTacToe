import React, { PropTypes } from 'react';
import Cell from './Cell';

const Board = ({
    board,
    active,
    onCellClick
}) =>
    <div>
        <h1>Tic-Tac-Toe</h1>
        <table id="board">
            <tbody>
                <tr>
                    <td><Cell value={board[0]} active={active} onClick={() => onCellClick(0)} /></td>
                    <td><Cell value={board[1]} active={active} onClick={() => onCellClick(1)} /></td>
                    <td><Cell value={board[2]} active={active} onClick={() => onCellClick(2)} /></td>
                </tr>
                <tr>
                    <td><Cell value={board[3]} active={active} onClick={() => onCellClick(3)} /></td>
                    <td><Cell value={board[4]} active={active} onClick={() => onCellClick(4)} /></td>
                    <td><Cell value={board[5]} active={active} onClick={() => onCellClick(5)} /></td>
                </tr>
                <tr>
                    <td><Cell value={board[6]} active={active} onClick={() => onCellClick(6)} /></td>
                    <td><Cell value={board[7]} active={active} onClick={() => onCellClick(7)} /></td>
                    <td><Cell value={board[8]} active={active} onClick={() => onCellClick(8)} /></td>
                </tr>
            </tbody>
        </table>
    </div>;

Board.propTypes = {
    board: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onCellClick: PropTypes.func.isRequired
};

export default Board;

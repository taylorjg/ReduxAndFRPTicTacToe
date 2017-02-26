import React, { PropTypes } from 'react';
import Cell from './Cell';

const Board = ({
    board,
    onCellClick
}) =>
    <div>
        <h1>Tic-Tac-Toe</h1>
        <table id="board">
            <tbody>
                <tr>
                    <td><Cell value={board[0]} onClick={() => onCellClick(0)} /></td>
                    <td><Cell value={board[1]} onClick={() => onCellClick(1)} /></td>
                    <td><Cell value={board[2]} onClick={() => onCellClick(2)} /></td>
                </tr>
                <tr>
                    <td><Cell value={board[3]} onClick={() => onCellClick(3)} /></td>
                    <td><Cell value={board[4]} onClick={() => onCellClick(4)} /></td>
                    <td><Cell value={board[5]} onClick={() => onCellClick(5)} /></td>
                </tr>
                <tr>
                    <td><Cell value={board[6]} onClick={() => onCellClick(6)} /></td>
                    <td><Cell value={board[7]} onClick={() => onCellClick(7)} /></td>
                    <td><Cell value={board[8]} onClick={() => onCellClick(8)} /></td>
                </tr>
            </tbody>
        </table>
    </div>;

Board.propTypes = {
    board: PropTypes.string.isRequired,
    onCellClick: PropTypes.func.isRequired
};

export default Board;

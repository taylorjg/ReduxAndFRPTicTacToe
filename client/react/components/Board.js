import React, { PropTypes } from 'react';
import Cell from './Cell';

const Board = ({
    onCellClick
}) =>
    <div>
        <h1>Tic-Tac-Toe</h1>
        <table id="board">
            <tbody>
                <tr>
                    <td><Cell id={0} onClick={onCellClick} /></td>
                    <td><Cell id={1} onClick={onCellClick} /></td>
                    <td><Cell id={2} onClick={onCellClick} /></td>
                </tr>
                <tr>
                    <td><Cell id={3} onClick={onCellClick} /></td>
                    <td><Cell id={4} onClick={onCellClick} /></td>
                    <td><Cell id={5} onClick={onCellClick} /></td>
                </tr>
                <tr>
                    <td><Cell id={6} onClick={onCellClick} /></td>
                    <td><Cell id={7} onClick={onCellClick} /></td>
                    <td><Cell id={8} onClick={onCellClick} /></td>
                </tr>
            </tbody>
        </table>
    </div>;

Board.propTypes = {
    onCellClick: PropTypes.func.isRequired
};

export default Board;

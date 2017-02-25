import React from 'react';

const Board = () =>
    <div>
        <h1>Tic-Tac-Toe</h1>
        <table id="board">
            <tbody>
                <tr className="thickBottom">
                    <td className="thickRight"><div tabIndex="0"></div></td>
                    <td className="thickRight"><div tabIndex="0"></div></td>
                    <td><div tabIndex="0"></div></td>
                </tr>
                <tr className="thickBottom">
                    <td className="thickRight"><div tabIndex="0"></div></td>
                    <td className="thickRight"><div tabIndex="0"></div></td>
                    <td><div tabIndex="0"></div></td>
                </tr>
                <tr>
                    <td className="thickRight"><div tabIndex="0"></div></td>
                    <td className="thickRight"><div tabIndex="0"></div></td>
                    <td><div tabIndex="0"></div></td>
                </tr>
            </tbody>
        </table>
    </div>;

export default Board;

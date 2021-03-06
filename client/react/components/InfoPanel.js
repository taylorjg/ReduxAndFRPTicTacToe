import React, { PropTypes } from 'react';
import * as C from '../constants';

const InfoPanel = ({
    gameState,
    showSpinner,
    setFocus,
    onStart
}) =>
    <div>
        <div className="alert alert-info">
            <span>{MESSAGES[gameState]}</span>
            {showSpinner && <img className="spinner" src="../spinner.gif" alt="spinner" />}
            <div>
                {gameState === C.STATE_NO_GAME_IN_PROGRESS &&
                    <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        onClick={onStart}
                        ref={el => setFocus && el && el.focus()}
                    >
                        Start
                </button>}
            </div>
        </div>
    </div>;

InfoPanel.propTypes = {
    gameState: PropTypes.number.isRequired,
    showSpinner: PropTypes.bool.isRequired,
    setFocus: PropTypes.bool.isRequired,
    onStart: PropTypes.func.isRequired
};

const MESSAGES = {
    [C.STATE_NO_GAME_IN_PROGRESS]: C.MESSAGE_NO_GAME_IN_PROGRESS,
    [C.STATE_HUMAN_MOVE]: C.MESSAGE_HUMAN_MOVE,
    [C.STATE_COMPUTER_MOVE]: C.MESSAGE_COMPUTER_MOVE
};

export default InfoPanel;

import React, { PropTypes } from 'react';
import * as C from '../constants';

const Cell = ({
    value,
    active,
    highlight,
    onClick
}) => {
    const conditionalAttributes = {};
    if (active) {
        conditionalAttributes.tabIndex = '0';
    }
    const highlightClassName = HIGHLIGHT_CLASS_NAMES[highlight];
    if (highlightClassName) {
        conditionalAttributes.className = highlightClassName;
    }
    return (
        <div
            {...conditionalAttributes}
            onClick={onClick}
            onKeyDown={e => e.keyCode === C.KEYCODE_SPACE && onClick()}
        >
            {value}
        </div>
    );
};

Cell.propTypes = {
    value: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    highlight: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

const HIGHLIGHT_CLASS_NAMES = {
    [C.HIGHLIGHT_HUMAN_WIN]: 'win',
    [C.HIGHLIGHT_COMPUTER_WIN]: 'lose',
    [C.HIGHLIGHT_DRAW]: 'draw'
};

export default Cell;

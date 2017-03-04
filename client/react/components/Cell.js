import React, { PropTypes } from 'react';
import * as C from '../constants';

const Cell = ({
    value,
    active,
    setFocus,
    highlight,
    onClick,
    onNavigateTo
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
            onKeyDown={e => {
                switch (e.keyCode) {
                    case C.KEYCODE_SPACE: return onClick();
                    case C.KEYCODE_UP_ARROW: return onNavigateTo(C.DIRECTION_UP);
                    case C.KEYCODE_DOWN_ARROW: return onNavigateTo(C.DIRECTION_DOWN);
                    case C.KEYCODE_LEFT_ARROW: return onNavigateTo(C.DIRECTION_LEFT);
                    case C.KEYCODE_RIGHT_ARROW: return onNavigateTo(C.DIRECTION_RIGHT);
                }
            }}
            ref={el => setFocus && el && el.focus()}
        >
            {value}
        </div>
    );
};

Cell.propTypes = {
    value: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    setFocus: PropTypes.bool.isRequired,
    highlight: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    onNavigateTo: PropTypes.func.isRequired
};

const HIGHLIGHT_CLASS_NAMES = {
    [C.HIGHLIGHT_HUMAN_WIN]: 'win',
    [C.HIGHLIGHT_COMPUTER_WIN]: 'lose',
    [C.HIGHLIGHT_DRAW]: 'draw'
};

export default Cell;

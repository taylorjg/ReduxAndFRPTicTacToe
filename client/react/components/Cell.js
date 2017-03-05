import React, { PropTypes } from 'react';
import * as C from '../constants';

const Cell = ({
    value,
    active,
    setFocus,
    highlight,
    onSelect,
    onNavigate
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
            onClick={onSelect}
            onKeyDown={ev => {
                switch (ev.keyCode) {
                    case C.KEYCODE_SPACE: return onSelect();
                    case C.KEYCODE_UP_ARROW: return onNavigate(C.DIRECTION_UP);
                    case C.KEYCODE_DOWN_ARROW: return onNavigate(C.DIRECTION_DOWN);
                    case C.KEYCODE_LEFT_ARROW: return onNavigate(C.DIRECTION_LEFT);
                    case C.KEYCODE_RIGHT_ARROW: return onNavigate(C.DIRECTION_RIGHT);
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
    onSelect: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
};

const HIGHLIGHT_CLASS_NAMES = {
    [C.HIGHLIGHT_HUMAN_WIN]: 'won',
    [C.HIGHLIGHT_COMPUTER_WIN]: 'lost',
    [C.HIGHLIGHT_DRAW]: 'drawn'
};

export default Cell;

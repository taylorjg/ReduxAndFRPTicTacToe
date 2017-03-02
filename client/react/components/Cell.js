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
    const highlightClassName = highlightToClassName(highlight);
    if (highlightClassName) {
        conditionalAttributes.className = highlightClassName;
    }
    return <div {...conditionalAttributes} onClick={onClick}>{value}</div>;
};

Cell.propTypes = {
    value: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    highlight: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

const highlightToClassName = highlight => {
    switch (highlight) {
        case C.HIGHLIGHT_HUMAN_WIN: return 'win';
        case C.HIGHLIGHT_COMPUTER_WIN: return 'lose';
        case C.HIGHLIGHT_DRAW: return 'draw';
        default: return null;
    }
};

export default Cell;

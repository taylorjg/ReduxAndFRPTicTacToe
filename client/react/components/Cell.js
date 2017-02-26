import React, { PropTypes } from 'react';

const Cell = ({
    value,
    onClick
}) =>
    <div tabIndex="0" onClick={onClick}>{value}</div>;

Cell.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Cell;

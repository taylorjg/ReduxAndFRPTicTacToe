import React, { PropTypes } from 'react';

const Cell = ({
    id,
    onClick
}) =>
    <div tabIndex="0" onClick={() => onClick(id)}></div>;

Cell.propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Cell;

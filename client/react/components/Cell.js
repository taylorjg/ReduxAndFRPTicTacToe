import React, { PropTypes } from 'react';

const Cell = ({
    value,
    active,
    onClick
}) => {
    console.log(`active: ${active}`);
    // const tabIndexAttr = active ? 'tabIndex="0"' : '';
    return active
    ? <div tabIndex="0" onClick={onClick}>{value}</div>
    : <div onClick={onClick}>{value}</div>;
};

Cell.propTypes = {
    value: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Cell;

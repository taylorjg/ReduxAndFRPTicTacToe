import React, { PropTypes } from 'react';

const InfoPanel = ({
    message,
    onStart
}) =>
    <div>
        <div className="alert alert-info">
            <span>{message}</span>
            <img className="spinner hidden" src="../spinner.gif" alt="spinner" />
            <div>
                <button type="submit" className="btn btn-sm btn-primary" onClick={() => onStart()}>Start</button>
            </div>
        </div>
    </div>;

InfoPanel.propTypes = {
    message: PropTypes.string,
    onStart: PropTypes.func.isRequired
};

export default InfoPanel;

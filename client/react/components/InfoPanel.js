import React, { PropTypes } from 'react';

const InfoPanel = ({
    message,
    showSpinner,
    onStart
}) =>
    <div>
        <div className="alert alert-info">
            <span>{message}</span>
            {showSpinner && <img className="spinner" src="../spinner.gif" alt="spinner" />}
            <div>
                <button type="submit" className="btn btn-sm btn-primary" onClick={onStart}>Start</button>
            </div>
        </div>
    </div>;

InfoPanel.propTypes = {
    message: PropTypes.string,
    showSpinner: PropTypes.bool.isRequired,
    onStart: PropTypes.func.isRequired
};

export default InfoPanel;

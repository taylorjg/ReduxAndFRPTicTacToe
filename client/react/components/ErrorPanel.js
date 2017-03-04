import React, { PropTypes } from 'react';

const ErrorPanel = ({
    showSpinner,
    onRetry
}) =>
    <div className="row">
        <div className="alert alert-danger">
            <span>An error occurred whilst calculating the computer move.</span>
            <div>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={onRetry}
                    ref={el => el && el.focus()}
                >
                    Retry
                </button>
                {showSpinner && <img className="spinner" src="../spinner.gif" alt="spinner" />}
            </div>
        </div>
    </div>;

ErrorPanel.propTypes = {
    showSpinner: PropTypes.bool.isRequired,
    onRetry: PropTypes.func.isRequired
};

export default ErrorPanel;

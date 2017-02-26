import React, { PropTypes } from 'react';

const ErrorPanel = ({
    onRetry
}) =>
    <div className="row hidden">
        <div className="alert alert-danger">
            <span>An error occurred whilst calculating the computer move.</span>
            <div>
                <button className="btn btn-sm btn-danger" onClick={onRetry}>Retry</button>
                <img className="spinner hidden" src="../spinner.gif" alt="spinner" />
            </div>
        </div>
    </div>;

ErrorPanel.propTypes = {
    onRetry: PropTypes.func.isRequired
};

export default ErrorPanel;

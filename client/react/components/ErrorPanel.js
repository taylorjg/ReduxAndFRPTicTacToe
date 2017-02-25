import React from 'react';

const ErrorPanel = () =>
    <div id="errorPanel" className="row hidden">
        <div className="alert alert-danger">
            <span>An error occurred whilst calculating the computer move.</span>
            <div>
                <button id="retryButton" className="btn btn-sm btn-danger">Retry</button>
                <img className="spinner hidden" src="../spinner.gif" alt="spinner" />
            </div>
        </div>
    </div>;

export default ErrorPanel;

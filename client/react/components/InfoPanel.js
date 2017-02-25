import React from 'react';

const InfoPanel = () =>
    <div id="infoPanel">
        <div className="alert alert-info">
            <span id="infoMessage"></span>
            <img className="spinner hidden" src="../spinner.gif" alt="spinner" />
            <div>
                <button id="startButton" type="submit" className="btn btn-sm btn-primary">Start</button>
            </div>
        </div>
    </div>;

export default InfoPanel;
